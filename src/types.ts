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

