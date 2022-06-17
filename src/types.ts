export type ArrayElement<T extends readonly unknown[]> = T extends readonly (infer E)[] ? E : never;
export type ValueOf<T extends object> = T[keyof T]; 

export interface IDB {
  users: Array<UserDTO>
}

export type TableName = keyof IDB;

export interface UserDTO {
  id: string,
  name: string,
  age: number,
  hobbies: Array<string>
}

export type CreateUserParams = Omit<UserDTO, 'id'>

