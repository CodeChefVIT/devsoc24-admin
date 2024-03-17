import axios from "axios";
import { refresh } from "./auth";
import { type APIResponse, type Project } from "@/schemas/api";

export const getAllProjects = async () => {
  try {
    const { data } = await axios.get<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/projects/all`,
      {
        withCredentials: true,
      },
    );
    return data.data as Project[];
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
      `${process.env.NEXT_PUBLIC_API_URL}/admin/teams/project/${id}`,
      {
        withCredentials: true,
      },
    );
    return data.data as Project;
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
