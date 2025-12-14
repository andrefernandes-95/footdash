import { AppConfig } from '@/app/data/config';
import { proxyNest } from '@/app/libs/proxyNest';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ teamslug: string }> }
) {
  const { teamslug } = await params;

  return proxyNest(
    req,
    `${AppConfig.API_URL}/auth/me-team/${teamslug}`,
    { method: "GET" }
  );
}
