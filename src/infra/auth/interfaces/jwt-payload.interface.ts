export interface JwtPayload {
  user: {
    role: 'ADMIN' | 'MEMBER';
    sub: string;
  };
}
