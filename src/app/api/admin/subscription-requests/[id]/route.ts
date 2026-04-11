import { NextResponse } from 'next/server';
import { jsonError, requireRole } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';
import { buildSubscriptionNoteFromRequest, subscriptionRequestToDto } from '@/lib/subscription-request-dto';

export const runtime = 'nodejs';

type PatchBody = {
  action?: string;
  adminNote?: string;
};

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireRole('admin');
  if (!gate.ok) return gate.response;

  const { id } = await ctx.params;
  if (!id) return jsonError('Липсва идентификатор.', 400);

  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const action = body.action === 'accept' || body.action === 'decline' ? body.action : null;
  if (!action) {
    return jsonError('Очаква се action: accept или decline.', 400);
  }

  const adminNote =
    typeof body.adminNote === 'string' && body.adminNote.trim() !== '' ? body.adminNote.trim() : null;

  const existing = await prisma.subscriptionRequest.findUnique({
    where: { id },
    include: { studio: { select: { id: true } } },
  });

  if (!existing) {
    return jsonError('Заявката не е намерена.', 404);
  }
  if (existing.status !== 'PENDING') {
    return jsonError('Заявката вече е обработена.', 409);
  }

  if (action === 'decline') {
    const updated = await prisma.subscriptionRequest.update({
      where: { id },
      data: {
        status: 'DECLINED',
        adminNote,
      },
    });
    return NextResponse.json({ request: subscriptionRequestToDto(updated) });
  }

  const subscriptionNote = buildSubscriptionNoteFromRequest(existing.name, existing.includes);

  const updated = await prisma.$transaction(async tx => {
    await tx.studioSubscription.upsert({
      where: { studioId: existing.studioId },
      create: {
        studioId: existing.studioId,
        hasMonthlySubscription: true,
        monthlyPrice: existing.monthlyPrice,
        subscriptionNote,
      },
      update: {
        hasMonthlySubscription: true,
        monthlyPrice: existing.monthlyPrice,
        subscriptionNote,
      },
    });

    return tx.subscriptionRequest.update({
      where: { id },
      data: { status: 'ACCEPTED', adminNote: null },
    });
  });

  return NextResponse.json({ request: subscriptionRequestToDto(updated) });
}
