import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const body = await request.json();
  const { accessToken, refreshToken } = body;

  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    value: accessToken,
    expires: new Date(accessToken.expires),
    httpOnly: (accessToken.httpOnly as unknown as boolean) || true,
    path: accessToken.Path,
    domain: accessToken.Domain,
    sameSite: accessToken.SameSite as "strict",
  });

  cookieStore.set("refreshToken", refreshToken, {
    value: refreshToken,
    expires: new Date(refreshToken.expires),
    httpOnly: (refreshToken.httpOnly as unknown as boolean) || true,
    path: refreshToken.Path,
    domain: refreshToken.Domain,
    sameSite: refreshToken.SameSite as "strict",
  });

  return NextResponse.json({ success: true });
}
