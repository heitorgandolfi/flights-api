export enum UserRole {
  ADMIN = "ADMIN",
  PASSENGER = "PASSENGER"
}

export interface AddUsersDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
