"use client";

import { getTeam } from "@/api/teams";
import { getUser } from "@/api/users";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Team, type User } from "@/schemas/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("id");
  const [userData, setUserData] = useState<User>();
  const [teamData, setTeamData] = useState<Team>();

  useEffect(() => {
    async function fetchData() {
      if (!email) return;
      const temp = await getUser(email);
      if (temp) setUserData(temp);
      if (!temp?.team_id) return;
      const temp2 = await getTeam(temp?.team_id);
      if (temp2) setTeamData(temp2);
      console.log(temp2);
    }
    void fetchData();
  }, [email]);

  return (
    <main className="ml-[70px] flex h-screen flex-col">
      <Link href="/teams" className="ml-4 mt-3 font-medium text-primary">
        {"< Back"}
      </Link>
      <Card className="mx-4 mt-5 h-1/3 overflow-auto">
        <CardHeader className="flex-row gap-5 text-xl font-semibold">
          <p>{userData?.first_name + " " + userData?.last_name}</p>
          <p className="space-y-0 text-base text-muted-foreground">
            {userData?.vit_email}
          </p>
        </CardHeader>
        <CardContent className="-mt-4 flex flex-col">
          <p className="text-muted-foreground">Personal Detais:</p>
          <div className="flex gap-10">
            <div className="flex">
              <p className="mr-1 font-medium">Reg No.:</p>
              <p>{userData?.reg_no}</p>
            </div>
            <div className="flex text-wrap">
              <p className="mr-1 font-medium">Email:</p>
              <p className="text-wrap">{userData?.email}</p>
            </div>
            <div className="flex">
              <p className="mr-1 font-medium">Phone:</p>
              <p>{userData?.phone_number}</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">College Detais:</p>
          <div className="flex gap-10">
            <div className="flex">
              <p className="mr-1 font-medium">College:</p>
              <p>{userData?.college}</p>
            </div>
            <div className="flex text-wrap">
              <p className="mr-1 font-medium">City:</p>
              <p className="text-wrap">{userData?.city}</p>
            </div>
            <div className="flex">
              <p className="mr-1 font-medium">State:</p>
              <p>{userData?.state}</p>
            </div>
            <div className="flex">
              <p className="mr-1 font-medium">Country:</p>
              <p>{userData?.country}</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">Hostel Detais:</p>
          <div className="flex gap-10">
            <div className="flex">
              <p className="mr-1 font-medium">Block:</p>
              <p>{userData?.block}</p>
            </div>
            <div className="flex">
              <p className="mr-1 font-medium">Room:</p>
              <p>{userData?.room}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex grow flex-col md:flex-row">
        <Card className="mx-4 mt-10 h-4/5 w-1/2 overflow-auto">
          <CardHeader className="text-xl font-semibold">
            Team Details
          </CardHeader>
          <CardContent className="-mt-4 flex flex-col">
            <div className="flex">
              <p className="text-muted-foreground">Team Name:</p>
              <p className="ml-1 font-medium">{teamData?.team_name}</p>
            </div>
            <div className="mt-4 flex">
              <p className="text-muted-foreground">Team Code:</p>
              <p className="ml-1 font-medium">{teamData?.team_code}</p>
            </div>
            <div className="mt-4 flex">
              <p className="text-muted-foreground">Leader:</p>
              <p className="ml-1 font-medium">
                {teamData?.users.find((user) => user.is_leader)?.name}
              </p>
            </div>
            <p className="mt-4 text-muted-foreground">Members:</p>
            <div className="flex flex-col gap-1">
              {teamData?.users.map((user) => (
                <Link
                  href={`./user?email=${user.email}`}
                  key={user.id}
                  className="font-medium transition-all duration-300 hover:text-primary"
                >
                  {user.name}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="mx-4 mt-10 h-4/5 w-1/2 overflow-auto">
          <Tabs defaultValue="idea" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-1/2" value="idea">
                Idea
              </TabsTrigger>
              <TabsTrigger className="w-1/2" value="project">
                Project
              </TabsTrigger>
            </TabsList>
            <TabsContent value="idea" className="p-2">
              <div className="flex">
                <p className="text-muted-foreground">Title:</p>
                <p className="ml-1 font-medium">{teamData?.idea.title}</p>
              </div>
              <div className="mt-4 flex flex-col">
                <p className="text-muted-foreground">Description:</p>
                <p className="font-medium">{teamData?.idea.description}</p>
              </div>
              <div className="mt-4 flex">
                <p className="text-muted-foreground">Track:</p>
                <p className="font-medium">{teamData?.idea.track}</p>
              </div>
              <p className="text-muted-foreground">GitHub Link:</p>
              <Link
                href={teamData?.idea.github_link ?? ""}
                className="ml-1 font-medium"
              >
                {teamData?.idea.github_link}
              </Link>
              <p className="text-muted-foreground">Figma Link:</p>
              <Link
                href={teamData?.idea.figma_link ?? ""}
                className="font-medium"
              >
                {teamData?.idea.figma_link}
              </Link>
              <div className="mt-4 flex">
                <p className="text-muted-foreground">Others:</p>
                <p className="ml-1 font-medium">{teamData?.idea.others}</p>
              </div>
            </TabsContent>
            <TabsContent value="project" className="p-2">
              {/* <div className="flex">
                <p className="text-muted-foreground">Title:</p>
                <p className="ml-1 font-medium">{teamData?.project.name}</p>
              </div>
              <div className="mt-4 flex flex-col">
                <p className="text-muted-foreground">Description:</p>
                <p className="font-medium">{teamData?.project.description}</p>
              </div>
              <div className="mt-4 flex">
                <p className="text-muted-foreground">Track:</p>
                <p className="font-medium">{teamData?.project.track}</p>
              </div>
              <p className="text-muted-foreground">GitHub Link:</p>
              <p className="ml-1 font-medium">{teamData?.project.github_link}</p>
              <p className="text-muted-foreground">Figma Link:</p>
              <p className="font-medium">{teamData?.project.figma_link}</p>
              <div className="mt-4 flex">
                <p className="text-muted-foreground">Others:</p>
                <p className="ml-1 font-medium">{teamData?.project.others}</p>
              </div> */}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}
