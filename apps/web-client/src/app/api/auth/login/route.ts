// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { AppConfig } from '@/app/data/config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const response = await axios.post(
      `${AppConfig.API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const headers = new Headers();
    const setCookie = response.headers["set-cookie"];
    if (setCookie) {
      setCookie.forEach((cookie: string) => {
        headers.append("set-cookie", cookie);   // 👈 forward cookie
      });
    }

    return new NextResponse(JSON.stringify({}), {
      status: 200,
      headers,
    });

  } catch (err: any) {
    return NextResponse.json(
      { message: err.response?.data?.message || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
