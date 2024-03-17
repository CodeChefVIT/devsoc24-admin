import axios from "axios";
import { refresh } from "./auth";
import { type APIResponse, type Idea } from "@/schemas/api";

export const getAllIdeas = async () => {
  try {
    const { data } = await axios.get<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/ideas/all`,
      {
        withCredentials: true,
      },
    );
    return data.data as Idea[];
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

export const getIdea = async (id: string) => {
  try {
    const { data } = await axios.get<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/team/idea/${id}`,
      {
        withCredentials: true,
      },
    );
    return data.data as Idea;
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
