import { getServerSession } from "next-auth";
import { AuthSession, ObjectValues } from "../types";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const APIClientMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

type APIClientMethod = ObjectValues<typeof APIClientMethods>;

export type APIClientParams<Request> = {
  url: string;
  method?: APIClientMethod;
  body?: Request;
  search?: object;
  headers?: object;
  useAuthorization?: boolean;
};

const isClient = typeof window !== "undefined";

export const APIClient = async <Request, Response>({
  url,
  method = APIClientMethods.GET,
  body,
  search,
  headers,
  useAuthorization = true,
}: APIClientParams<Request>) => {
  const baseUrl = "http://localhost:4000/api/v1";

  return new Promise<Response>(async (resolve, reject) => {
    try {
      const trimmedSearch =
        search &&
        Object.entries(search).reduce((reduced, [key, value]) => {
          if (value !== undefined) {
            reduced[key] = value;
          }
          return reduced;
        }, {} as Record<string, string>);

      const session = isClient
        ? ((await getSession()) as AuthSession)
        : ((await getServerSession(authOptions)) as AuthSession);

      const token = session ? session.accessToken : "";

      const response = await fetch(
        `${baseUrl}${url}${
          trimmedSearch ? `?${new URLSearchParams(trimmedSearch)}` : ""
        }`,
        {
          method,
          headers: new Headers([
            ...Object.entries({
              ...(method.toUpperCase() !== APIClientMethods.GET && {
                "Content-Type": "application/json",
              }),
              ...(session &&
                useAuthorization && {
                  Authorization: `Bearer ${token}`,
                }),
              ...headers,
            }),
          ]),
          body: JSON.stringify(body),
          cache: "no-cache",
        }
      );

      if (response.ok) {
        const jsonData = (await response.json()) as Response;
        resolve(jsonData);
      } else {
        const jsonData = (await response.json()) as Response;
        reject(jsonData);
      }
    } catch (error) {
      reject(error);
    }
  });
};
