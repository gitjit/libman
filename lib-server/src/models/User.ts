export interface IUser{
    userType : 'ADMIN' | 'EMPLOYEE' | 'PATRON',
    firstName : string,
    lastName : string,
    email : string,
    password: string
}