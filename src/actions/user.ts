import { HTTPPOST } from "../constant";
import { LoginPayload } from "../interfaces/user";
import request from "../lib/axios";

export const adminLoginHandler = ({
  email,
  password,
}: LoginPayload): Promise<string> =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("ok");
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
