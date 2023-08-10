import { APIClient } from "../common/apiClient/apiClient";
import { UserModel } from "../models";

export const me = async () => {
  const meUrl = "/users/me";

  try {
    const response = await APIClient<undefined, UserModel>({
      method: "GET",
      url: meUrl,
      useAuthorization: true,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const getUserByToken = async (token: string) => {
  const meUrl = "/users/me";

  try {
    const response = await APIClient<undefined, UserModel>({
      method: "GET",
      url: meUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
