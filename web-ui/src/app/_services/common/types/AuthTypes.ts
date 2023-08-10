import { Session, User } from "next-auth";

export interface AuthUser extends User {
  accessToken?: string;
}

export interface AuthSession extends Session {
  accessToken?: string;
}
