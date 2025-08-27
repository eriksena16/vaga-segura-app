import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // expiration em timestamp (segundos)
  [key: string]: any;
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return false;

    const now = Date.now() / 1000; // segundos
    return decoded.exp > now;
  } catch (e) {
    return false;
  }
}
