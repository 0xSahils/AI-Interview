"use client";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { db } from "@/utils/db";
import Webcam from "react-webcam";
import { Ghost, Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null); // Initialize as null
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  // Fetch interview details by MockId/Interview Id
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    console.log(result);

    if (result.length > 0) {
      setInterviewData(result[0]); // Set interview data from result
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {interviewData ? ( // Only render this section if interviewData is not null
            <div className="flex flex-col my-5 gap-5  justify-center">
              <div className="flex flex-col p-5 rounded-xl border gap-3 bg-gray-100">
                {" "}
                <h2 className="text-lg">
                  <strong>Job Role/Job Position:</strong>{" "}
                  {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description/Tech Stack:</strong>{" "}
                  {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience:</strong>{" "}
                  {interviewData.jobExperience}
                </h2>
              </div>
              <div className="p-5 border rounded-xl border-yellow-300 bg-yellow-100">
                <h2 className="flex gap-2 items-center text-yellow-500">
                  <Lightbulb />
                  <strong>Imformation</strong>
                </h2>
                <h2 className="mt-3 text-yellow-500">
                  {process.env.NEXT_PUBLIC_IMFORMATION}
                </h2>
              </div>
            </div>
          ) : (
            <p>Loading interview details...</p> // Placeholder while data is being fetched
          )}
        </div>

        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 400,
                width: 400,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-3 p-20 bg-gray-300 rounded-xl border flex justify-center items-center" />
              <Button
                className="flex justify-center items-center w-full"
                variant={Ghost}
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
