// 'use server';
// import {parse} from 'cookie';
// import { cookies } from 'next/headers';

// export default async function login(prevState: any, formdata: FormData) {
//     const email = formdata.get('email');
//     const password = formdata.get('password');
//     // todo: do request data validation

//     // call auth service

//     try {
//         const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email,
//                 password,
//             }),
//         });

//         if (!response.ok) {
//             const error = await response.json();
//             console.log('error', error);
//             return {
//                 type: 'error',
//                 message: error.errors[0].msg,
//             };
//         }

//         const c = response.headers.getSetCookie();
//         const accessToken = c.find((cookie) => cookie.includes('accessToken'));
//         const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

//         if (!accessToken || !refreshToken) {
//             return {
//                 type: 'error',
//                 message: 'No cookies were found!',
//             };
//         }

//         const parsedAccessToken = parse(accessToken);
//         const parsedRefreshToken = parse(refreshToken);

//         console.log(parsedAccessToken, parsedRefreshToken);

//        await cookies().set({
//             name: 'accessToken',
//             value: parsedAccessToken.accessToken,
//             expires: new Date(parsedAccessToken.expires as string),
//             httpOnly: (parsedAccessToken.httpOnly),
//             path: parsedAccessToken.Path,
//             domain: parsedAccessToken.Domain,
//             sameSite: parsedAccessToken.SameSite as 'strict',
//         });

//        await cookies().set({
//             name: 'refreshToken',
//             value: parsedRefreshToken.refreshToken,
//             expires: new Date(parsedRefreshToken.expires as string),
//             httpOnly: (parsedRefreshToken.httpOnly),
//             path: parsedRefreshToken.Path,
//             domain: parsedRefreshToken.Domain,
//             sameSite: parsedRefreshToken.SameSite as 'strict',
//         });

//         return {
//             type: 'success',
//             message: 'Login successful!',
//         };
//     } catch (err: any) {
//         return {
//             type: 'error',
//             message: err.message,
//         };
//     }
// }


'use server';

import { parse } from 'cookie';

export default async function login(prevState: any, formdata: FormData) {
  const email = formdata.get('email');
  const password = formdata.get('password');

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        type: 'error',
        message: error.errors[0].message,
      };
    }

    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes('accessToken'));
    const refreshToken = c.find((cookie) => cookie.includes('refreshToken'));

    if (!accessToken || !refreshToken) {
      return {
        type: 'error',
        message: 'No cookies were found!',
      };
    }

    const parsedAccessToken = parse(accessToken);
    const parsedRefreshToken = parse(refreshToken);


    return {
      type: 'success',
      message: 'Login successful!',
      accessToken: parsedAccessToken,
      refreshToken: parsedRefreshToken,
    };
  } catch (err: any) {
    return {
      type: 'error',
      message: err.message,
    };
  }
}
