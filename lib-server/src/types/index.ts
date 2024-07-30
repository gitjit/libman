// types.ts
export interface JWTPayload {
  _id: string;
  email: string;
  iat?: number;
  exp?: number;
}
