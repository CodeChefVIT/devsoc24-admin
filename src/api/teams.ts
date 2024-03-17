import axios from "axios";
import { refresh } from "./auth";
import { type Review, type APIResponse, type Team } from "@/schemas/api";

export const getAllTeams = async () => {
  try {
    const { data } = await axios.get<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/team/all`,
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

export const addReview = async (
  id: string,
  reviewer: string,
  innovationAndCreativity: number,
  functionalityAndCompleteness: number,
  uiAndDesign: number,
  technicalImplementation: number,
  presentationAndCommunication: number,
  comments: string,
) => {
  try {
    await axios.post<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/review`,
      {
        team_Id: id,
        reviewer,
        innovation_and_creativity: innovationAndCreativity,
        functionality_and_completeness: functionalityAndCompleteness,
        ui_and_design: uiAndDesign,
        techincal_implementation: technicalImplementation,
        presentation_and_communication: presentationAndCommunication,
        review_round: 1,
        comments,
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

export const getReview = async (id: string) => {
  try {
    const { data } = await axios.get<APIResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/reviews/team/${id}`,
      {
        withCredentials: true,
      },
    );
    return data.data as Review[];
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
