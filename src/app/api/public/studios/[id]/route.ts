import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  instructorToDto,
  reviewToDto,
  scheduleEntryToDto,
  studioToDto,
  subscriptionToDto,
  yogaClassToDto,
} from '@/lib/public-studio-dto';
import { getSessionUser, jsonError } from '@/lib/api-auth';
export const runtime = 'nodejs';

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  const studio = await prisma.studio.findUnique({
    where: { id },
    include: {
      business: { select: { ownerUserId: true } },
      instructors: { orderBy: { name: 'asc' } },
      classes: { orderBy: { date: 'asc' } },
      schedule: { orderBy: [{ day: 'asc' }, { startTime: 'asc' }] },
      subscription: true,
    },
  });

  if (!studio) {
    return jsonError('Not found', 404);
  }

  const studioReviews = await prisma.review.findMany({
    where: { targetType: 'studio', targetId: studio.id },
    orderBy: { date: 'desc' },
    include: { author: { select: { image: true, name: true } } },
  });

  const sessionUser = await getSessionUser();
  let myBookings: { classIds: string[]; scheduleEntryIds: string[] } = { classIds: [], scheduleEntryIds: [] };
  if (sessionUser?.id) {
    const [classRows, scheduleRows] = await Promise.all([
      prisma.booking.findMany({
        where: { userId: sessionUser.id, yogaClass: { studioId: studio.id } },
        select: { yogaClassId: true },
      }),
      prisma.scheduleEntryBooking.findMany({
        where: { userId: sessionUser.id, scheduleEntry: { studioId: studio.id } },
        select: { scheduleEntryId: true },
      }),
    ]);
    myBookings = {
      classIds: classRows.map((r) => r.yogaClassId),
      scheduleEntryIds: scheduleRows.map((r) => r.scheduleEntryId),
    };
  }

  return NextResponse.json({
    studio: studioToDto(studio),
    instructors: studio.instructors.map(instructorToDto),
    classes: studio.classes.map(yogaClassToDto),
    schedule: studio.schedule.map(scheduleEntryToDto),
    subscription: studio.subscription ? subscriptionToDto(studio.subscription) : null,
    reviews: studioReviews.map(reviewToDto),
    myBookings,
  });
}
