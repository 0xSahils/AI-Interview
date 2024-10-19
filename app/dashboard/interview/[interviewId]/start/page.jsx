"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnsSection from "./_components/RecordAnsSection";
import Button from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      // Ensure result has data before accessing jsonMockResp
      if (result && result.length > 0 && result[0].jsonMockResp) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      } else {
        console.error("No data found or jsonMockResp missing");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* video/Audio Recording */}
        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className=" flex justify-end gap-6">
        {" "}
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
