export default interface User {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}
