export interface ILogin {
  user: string;
  password: string;
}

export interface IResponseLogin {
  access_token: string;
}

export interface IResponseErrorLogin {
  statusCode: number;
  message: string;
}