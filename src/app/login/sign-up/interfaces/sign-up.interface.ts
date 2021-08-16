export interface ISignUp {
  name: String;
  password: string;
  lastName: String;
  email: String;
  phone: Number;
  bornDate: Date;
  dni: String;
}

export interface IResponseSignUp {
  email: string, 
  name: string, 
  phone: number
}
