import { getServerSession } from "next-auth";
import { APIClient } from "../common/apiClient/apiClient";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthSession } from "../common/types";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const login = async (body: LoginRequest) => {
  const loginUrl = "/auth/login";

  try {
    const response = await APIClient<LoginRequest, LoginResponse>({
      method: "POST",
      url: loginUrl,
      body,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAuthState = async () => {
  const session = (await getServerSession(authOptions)) as Omit<
    AuthSession,
    "expires"
  >;

  return {
    isAuthenticated: !!session?.user,
    session,
  };
};
