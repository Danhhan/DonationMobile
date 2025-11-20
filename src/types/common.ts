export interface IDataResponse<T = any> {
  data: T;
  message: string;
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface IErrorForm {
  errors: Record<string, string>;
}

export interface IEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}
