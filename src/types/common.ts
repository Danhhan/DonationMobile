export interface IDataResponse<T = any> {
  data: T;
  message: string;
}

export interface IErrorForm {
  errors: Record<string, string>;
}

export interface IEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}
