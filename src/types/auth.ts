export interface IUser {
  id: number;
  email: string;
  provider: string;
  socialId: string | null;
  fullName: string;
  role: {
    id: number;
    name: string;
    __entity: string;
  };
  status: {
    id: number;
    name: string;
    __entity: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ITokens {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}
