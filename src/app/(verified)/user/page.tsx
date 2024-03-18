"use client";

import { getTeam } from "@/api/teams";
import { getUser } from "@/api/users";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Team, type User } from "@/schemas/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [userData, setUserData] = useState<User>();
  const [teamData, setTeamData] = useState<Team>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (!email) return;
      const temp = await getUser(email);
      if (temp) setUserData(temp);
      if (!temp?.team_id) return;
      const temp2 = await getTeam(temp?.team_id);
      if (temp2) setTeamData(temp2);
      console.log(temp2);
      setLoading(false);
    }
    void toast.promise(fetchData(), {
      loading: "Fetching Data...",
      success: "Fetched Data",
      error: "Something went wrong!",
    });

  }, [email]);

  return<>
  {
    loading ? (
      <>
        <div className="flex h-screen w-screen items-center justify-center">
          <svg
            aria-hidden="true"
            className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </>
    ) : (
      <>
        <main className="ml-[70px] flex h-screen flex-col">
          <Link href="/users" className="ml-4 mt-3 font-medium text-primary">
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
      </>
    )
  }</>
}
