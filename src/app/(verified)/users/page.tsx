"use client";

import { getAllUsers } from "@/api/users";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../../components/data-table/data-table";
import { columns } from "./columns";
import { type User } from "@/schemas/api";

export default function Page() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await getAllUsers();
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
