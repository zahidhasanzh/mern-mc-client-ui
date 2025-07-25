import { cookies } from "next/headers";
import { parse } from "cookie";

export async function POST() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/refresh`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    return Response.json({ success: false });
  }

  const c = response.headers.getSetCookie();
  const accessToken = c.find((cookie) => cookie.includes("accessToken"));
  const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

  if (!accessToken || !refreshToken) {
    return Response.json({ success: false });
  }

  const parsedAccessToken = parse(accessToken);
  const parsedRefreshToken = parse(refreshToken);

  if (!parsedAccessToken.Expires) {
    throw new Error("Missing 'expires' field in parsedAccessToken.");
  }
  if (!parsedRefreshToken.Expires) {
    throw new Error("Missing 'expires' field in parsedAccessToken.");
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: "accessToken",
    value: parsedAccessToken.accessToken ?? "",
    expires: new Date(parsedAccessToken.Expires),
    httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
    path: parsedAccessToken.Path,
    domain: parsedAccessToken.Domain,
    sameSite: parsedAccessToken.SameSite as "strict",
  });

  cookieStore.set({
   name: "refreshToken",
    value: parsedRefreshToken.refreshToken ?? "",
    expires: new Date(parsedRefreshToken.Expires),
    httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
    path: parsedRefreshToken.Path,
    domain: parsedRefreshToken.Domain,
    sameSite: parsedRefreshToken.SameSite as "strict",
  });

  return Response.json({success: true})
}
