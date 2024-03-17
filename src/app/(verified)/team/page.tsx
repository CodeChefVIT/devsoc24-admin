"use client";

import { getTeam } from "@/api/teams";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Team } from "@/schemas/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [teamData, setTeamData] = useState<Team>();

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const temp = await getTeam(id);
      if (temp) setTeamData(temp);
    }
    void fetchData();
  }, [id]);

  return (
    <main className="ml-[70px] flex h-screen flex-col">
      <Link href="/teams" className="ml-4 mt-3 font-medium text-primary">
        {"< Back"}
      </Link>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {teamData?.users.map((userData, id) => (
            <CarouselItem
              key={id}
              className={`basis-[calc(100/${teamData.users.length})%]`}
            >
              <Card className="mx-4 mt-5 h-fit overflow-auto">
                <CardHeader className="flex-row gap-5 text-xl font-semibold">
                  <p>{userData?.name}</p>
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
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>

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
