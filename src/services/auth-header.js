/**
 * This function retrieves the JWT token from the current user session and returns it as an
 * authorization header.
 * @returns The `authHeader` function returns an object with a single property `Authorization` which
 * contains a string value representing the JWT token obtained from the current user session using the
 * AWS Amplify Auth library. This object can be used as an HTTP header to authenticate requests to a
 * server that requires JWT authentication.
 */
// import { getCurrentUser } from "aws-amplify/auth";

// export async function authHeader() {
//     const idToken = await getCurrentUser();
//     console.log(idToken, 'to')
//     // const headers = {
//     //     Authorization: `Bearer ${idToken.getIdToken().getJwtToken()}`,
//     // }
//     // return headers
// }