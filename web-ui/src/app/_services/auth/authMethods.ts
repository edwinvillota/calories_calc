import { APIClient } from "../common/apiClient/apiClient";

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
