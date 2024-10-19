"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { chatSession } from "@/utils/GeminiAIModal";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { db } from "@/utils/db";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    console.log("Submitting form with:", jobPosition, jobDesc, jobExperience);

    const InputPromt =
      `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. ` +
      `Please provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format and no other things other than this.`;

    try {
      const result = await chatSession.sendMessage(InputPromt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      // const textResponse = await result.response.text();
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID", resp);
        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add Details about your job position/role, job description,
                    and years of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label className="block">Job Role/Job Position</label>
                    <input
                      placeholder="Ex. Full Stack Developer"
                      className="border rounded p-2 block w-full"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="block">
                      Job Description/Tech Stack (In Short)
                    </label>
                    <textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      className="border rounded p-2 block w-full"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label className="block">Years of experience</label>
                    <input
                      placeholder="Ex. 5"
                      type="number"
                      className="border rounded p-2 block w-full"
                      required
                      max={50}
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="rounded-lg bg-blue-800"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          'Generating from AI'
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewInterview;
