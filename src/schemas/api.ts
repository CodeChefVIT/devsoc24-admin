export interface APIResponse {
  message: string;
  status: string;
  data?: unknown;
}

export interface LoginResponse {
  message: string;
  status: string;
  data?: {
    profile_complete: boolean;
  };
}

export interface UserResponse {
  message: string;
  status?: string;
  error?: string;
  users?: User[];
  user?: User;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  reg_no: string;
  email: string;
  phone_number: string;
  college: string;
  city: string;
  state: string;
  country: string;
  gender: string;
  role: string;
  is_leader: boolean;
  team_id: string;
  vit_email?: string;
  block?: string;
  room?: string;
}

export interface Team {
  id: string;
  team_name: string;
  team_code: string;
  leader_id: string;
  round: 0;
  users: {
    name: string;
    reg_no: string;
    id: string;
    is_leader: boolean;
    email: string;
  }[];
  idea: Idea;
  project: Project;
}

export interface Idea {
  title: string;
  description: string;
  track: string;
  github_link: string;
  figma_link: string;
  others: string;
  is_selected: boolean;
}

export interface Project {
  team_id: string;
  name: string;
  description: string;
  track: string;
  github_link: string;
  figma_link: string;
  others: string;
}
