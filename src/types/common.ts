export interface IDataResponse<T = any> {
  data: T;
  message: string;
}

export interface IErrorForm {
  errors: Record<string, string>;
}
