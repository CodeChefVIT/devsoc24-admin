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
      let temp = await getAllUsers();
      if (temp) {
        temp = temp.filter((user) => user.is_profile_complete === true);
        setData(temp);
      }
    }
    void fetchData();
  }, []);

  return (
    <main className="">
      <DataTable data={data} columns={columns} />
    </main>
  );
}
