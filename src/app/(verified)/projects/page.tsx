"use client";

import { getAllProjects } from "@/api/project";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/data-table/data-table";
import { columns } from "./columns";
import { type Project } from "@/schemas/api";

export default function Page() {
  const [data, setData] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await getAllProjects();
      if (temp) setData(temp);
    }
    void fetchData();
  }, []);

  return (
    <main className="">
      <DataTable data={data} columns={columns} />
    </main>
  );
}
