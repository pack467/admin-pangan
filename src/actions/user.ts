import { HTTPPOST } from "../constant";
import type { LoginPayload, RegisterPayload } from "../interfaces/user";
import request from "../lib/axios";

export const adminLoginHandler = ({
  email,
  password,
}: LoginPayload): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { data, message },
        status,
      } = await request.Mutation<string>({
        method: HTTPPOST,
        url: "/auth/login",
        data: {
          email,
          password,
          as: "Admin",
        },
      });

      if (status !== 200) throw { message };

      resolve(data as string);
    } catch (err) {
      reject(err);
    }
  });

export const registerNewAdmin = (payload: RegisterPayload): Promise<void> =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { message },
        status,
      } = await request.Mutation({
        url: "/auth/register/admin",
        method: HTTPPOST,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });

      if (status !== 201) throw { message };

      resolve();
    } catch (err) {
      reject(err);
    }
  });
