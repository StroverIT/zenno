import type { SubscriptionRequest as PrismaSubscriptionRequest } from '@prisma/client';
import type { SubscriptionRequestDto, SubscriptionRequestStatus } from '@/data/mock-data';

export function subscriptionRequestToDto(r: PrismaSubscriptionRequest): SubscriptionRequestDto {
  return {
    id: r.id,
    studioId: r.studioId,
    status: r.status as SubscriptionRequestStatus,
    name: r.name,
    monthlyPrice: r.monthlyPrice,
    includes: r.includes,
    adminNote: r.adminNote ?? undefined,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

const MAX_SUBSCRIPTION_NOTE_LEN = 4000;

/** Persisted on StudioSubscription.subscriptionNote when admin accepts. */
export function buildSubscriptionNoteFromRequest(name: string, includes: string): string {
  const combined = `${name.trim()}\n\n${includes.trim()}`;
  return combined.length <= MAX_SUBSCRIPTION_NOTE_LEN
    ? combined
    : combined.slice(0, MAX_SUBSCRIPTION_NOTE_LEN);
}
