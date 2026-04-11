import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/api-auth';
import { getAdminRecentEnrollmentsForList } from '@/lib/admin-queries';

export const runtime = 'nodejs';

export async function GET() {
  const gate = await requireRole('admin');
  if (!gate.ok) return gate.response;

  const enrollments = await getAdminRecentEnrollmentsForList();
  return NextResponse.json({ enrollments });
}
