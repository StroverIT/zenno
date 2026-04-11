import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';
import { subscriptionRequestToDto } from '@/lib/subscription-request-dto';

export const runtime = 'nodejs';

const LIMIT = 5;

export async function GET() {
  const gate = await requireRole('admin');
  if (!gate.ok) return gate.response;

  const rows = await prisma.subscriptionRequest.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
    take: LIMIT,
    include: {
      studio: {
        select: {
          name: true,
          business: {
            select: {
              owner: { select: { name: true, email: true } },
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    requests: rows.map(r => ({
      ...subscriptionRequestToDto(r),
      studioName: r.studio.name,
      ownerName: r.studio.business.owner.name ?? '',
      ownerEmail: r.studio.business.owner.email ?? '',
    })),
  });
}
