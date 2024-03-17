import axios from "axios";
import { refresh } from "./auth";
import { type APIResponse, type Team } from "@/schemas/api";

export const getAllTeams = async () => {
  try {
    const { data } = await axios.get<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/teams`,
      {
        withCredentials: true,
      },
    );
    return data.data as Team[];
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

export const getTeam = async (id: string) => {
  try {
    const { data } = await axios.get<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/team/${id}`,
      {
        withCredentials: true,
      },
    );
    return data.data as Team;
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
