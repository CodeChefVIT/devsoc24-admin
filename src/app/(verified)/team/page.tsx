"use client";

import { addReview, getReview, getTeam } from "@/api/teams";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Review, type Team } from "@/schemas/api";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [teamData, setTeamData] = useState<Team>();
  const [reviews, setReviews] = useState<Review[]>();
  const [innovation, setInnovation] = useState<number>();
  const [functionality, setFunctionality] = useState<number>();
  const [design, setDesign] = useState<number>();
  const [tech, setTeach] = useState<number>();
  const [presentation, setPresentation] = useState<number>();
  const [author, setAuthor] = useState<string>();
  const [comments, setComments] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const temp = await getTeam(id);
      if (temp) setTeamData(temp);
      const temp2 = await getReview(id);
      if (temp2) setReviews(temp2);
    }
    void fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (
      !id ||
      !author ||
      !innovation ||
      !functionality ||
      !design ||
      !tech ||
      !presentation
    ) {
      toast.error("All fields are required!");
      return;
    }
    void toast.promise(
      addReview(
        id,
        author,
        innovation,
        functionality,
        design,
        tech,
        presentation,
        comments ?? "",
      ),
      {
        loading: "Reviewing...",
        success: "Review added successfully!",
        error: "Something went wrong!",
      },
    );
  };

  return (
    <main className="ml-[70px] flex h-screen flex-col">
      <div className="flex items-center p-2">
        <Link href="/teams" className="ml-4 mt-3 font-medium text-primary">
          {"< Back"}
        </Link>
        <div className="flex-grow" />
        <Dialog>
          <DialogTrigger>
            <Button>Add Review</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="">
              <Label htmlFor="innovation">Innovation & Creativity</Label>
              <Input
                type="number"
                id="innovation"
                value={innovation}
                onChange={(e) => setInnovation(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="functionality">
                Functionality & Completeness
              </Label>
              <Input
                type="number"
                id="functionality"
                value={functionality}
                max={10}
                min={0}
                onChange={(e) => setFunctionality(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="design">UI/UX & Design</Label>
              <Input
                type="number"
                id="design"
                value={design}
                max={10}
                min={0}
                onChange={(e) => setDesign(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="tech">Technical Implementation</Label>
              <Input
                type="number"
                id="tech"
                value={tech}
                max={10}
                min={0}
                onChange={(e) => setTeach(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="presentation">Presentation & Communication</Label>
              <Input
                type="number"
                id="presentation"
                value={presentation}
                max={10}
                min={0}
                onChange={(e) => setPresentation(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                min={0}
                max={10}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogContent>
        </Dialog>
      </div>
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
              <TabsTrigger className="w-1/3" value="idea">
                Idea
              </TabsTrigger>
              <TabsTrigger className="w-1/3" value="project">
                Project
              </TabsTrigger>
              <TabsTrigger className="w-1/3" value="reviews">
                Reviews
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
            <TabsContent value="reviews" className="p-2">
              {reviews?.map((review, id) => (
                <div key={id}>
                  <p className="text-xl font-bold">Review {id + 1}</p>
                  <p>Round {review.review_round}</p>
                  <div className="flex">
                    <p className="text-muted-foreground">
                      Innovation & Creativity:
                    </p>
                    <p className="ml-1 font-medium">
                      {review.innovation_and_creativity}
                    </p>
                  </div>
                  <div className="mt-1 flex">
                    <p className="text-muted-foreground">
                      Functionality & Completeness:
                    </p>
                    <p className="ml-1 font-medium">
                      {review.functionality_and_completeness}
                    </p>
                  </div>
                  <div className="mt-1 flex">
                    <p className="text-muted-foreground">UI/UX & Design:</p>
                    <p className="ml-1 font-medium">{review.ui_and_design}</p>
                  </div>
                  <div className="mt-1 flex">
                    <p className="text-muted-foreground">
                      Technical Implementation:
                    </p>
                    <p className="ml-1 font-medium">
                      {review.techincal_implementation}
                    </p>
                  </div>
                  <div className="mt-1 flex">
                    <p className="text-muted-foreground">
                      Presentation & Communication:
                    </p>
                    <p className="ml-1 font-medium">
                      {review.presentation_and_communication}
                    </p>
                  </div>
                  <div className="mt-1 flex">
                    <p className="text-muted-foreground">Review by:</p>
                    <p className="ml-1 font-medium">{review.reviewer}</p>
                  </div>
                  <p className="text-muted-foreground">Comments:</p>
                  <p className="font-medium">{review.comments}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}
