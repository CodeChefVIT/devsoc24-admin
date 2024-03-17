import { type LoginResponse } from "@/schemas/api";
import axios from "axios";

export const refresh = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
      {
        nallaData: "",
      },
      {
        withCredentials: true,
      },
    );
  } catch (e) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          try {
            void logout();
          } catch (e) {
            // console.log("REFESH: ", e);
          }
        default:
        // console.log(e);
      }
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {
        nallaData: "",
      },
      {
        withCredentials: true,
      },
    );
    localStorage.clear();
  } catch (e) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          // await refresh();
          // console.log("401");
          break;
        default:
          // console.log(e);
          break;
      }
    }
  }
  const a = document.createElement("a");
  a.href = "./";
  a.click();
};

export const login = async (email: string, password: string) => {
  await axios.post<LoginResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    { email: email, password: password },
    {
      withCredentials: true,
    },
  );
};
