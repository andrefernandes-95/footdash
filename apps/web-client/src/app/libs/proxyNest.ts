// app/lib/proxyNest.ts
import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function proxyNest(
  req: NextRequest,
  nestUrl: string,
  config: AxiosRequestConfig = {}
) {
  // Convert NextRequest headers -> plain object
  const forwardHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    forwardHeaders[key] = value;
  });

  // Merge user config with forwarded headers
  config.headers = {
    ...(config.headers || {}),
    ...forwardHeaders,
  };

  // Required for cookies
  config.withCredentials = true;

  // Make request to NestJS
  const response = await axios.request({
    url: nestUrl,
    ...config,
  });

  // Prepare response headers (inc set-cookie)
  const resHeaders = new Headers();
  const setCookies = response.headers["set-cookie"];

  if (setCookies) {
    setCookies.forEach((cookie: string) => {
      resHeaders.append("set-cookie", cookie);
    });
  }

  return new NextResponse(JSON.stringify(response.data), {
    status: response.status,
    headers: resHeaders,
  });
}
