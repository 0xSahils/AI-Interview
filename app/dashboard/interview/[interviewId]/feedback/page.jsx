"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [percentageRating, setPercentageRating] = useState(0); // State for percentage rating
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []); // Add empty dependency array to avoid infinite loops

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    // Calculate the average rating, including questions with rating 0
    const totalQuestions = result.length; // Total number of questions
    const totalRating = result.reduce((sum, item) => sum + item.rating, 0); // Sum of all ratings (including 0s)
    const maxPossibleRating = totalQuestions * 10; // Max possible rating (if all were rated 10)

    if (totalQuestions > 0) {
      const percentage = (totalRating / maxPossibleRating) * 100; // Convert to percentage
      setPercentageRating(percentage.toFixed(2)); // Set percentage rating and round to 2 decimal places
    } else {
      setPercentageRating(0); // If no questions, set percentage to 0
    }
  };

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{percentageRating}%</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answers, your answers,
            and feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                  {item.question}
                  <ChevronsDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating:</strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")} className="mt-5">
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
