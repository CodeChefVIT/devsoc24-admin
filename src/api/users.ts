import axios from "axios";
import { refresh } from "./auth";
import { type UserResponse } from "@/schemas/api";

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get<UserResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
      {
        withCredentials: true,
      },
    );
    return data.users;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          try {
            await refresh();
          } catch (e) {
            // console.log("REFESH: ", e);
          }
        default:
        // console.log(e);
      }
    }
  }
};

export const getUser = async (id: string) => {
  try {
    const { data } = await axios.get<UserResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/user/${id}`,
      {
        withCredentials: true,
      },
    );
    return data.user;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          try {
            await refresh();
          } catch (e) {
            // console.log("REFESH: ", e);
          }
        default:
        // console.log(e);
      }
    }
  }
};
