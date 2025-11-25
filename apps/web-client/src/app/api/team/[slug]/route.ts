// app/api/team/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AppConfig } from '@/app/data/config';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> } // params is a Promise
) {
  // unwrap the params promise
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const response = await axios.get(`${AppConfig.API_URL}/team/${slug}`);
    return NextResponse.json(response.data, { status: response.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
