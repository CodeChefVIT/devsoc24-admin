"use client";

import { getAllProjects } from "@/api/project";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/data-table/data-table";
import { columns } from "./columns";
import { type Project } from "@/schemas/api";
import toast from "react-hot-toast";

export default function Page() {
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await getAllProjects();
      if (temp) setData(temp);
    }
    void toast.promise(fetchData(), {
      loading: "Fetching Data...",
      success: "Fetched Data",
      error: "Something went wrong!",
    });
  }, []);

  return (
    <main className="">
      <DataTable data={data} columns={columns} />
    </main>
  );
}
