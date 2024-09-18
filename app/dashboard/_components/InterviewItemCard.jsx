import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview.mockId); // Ensure the URL has a "/" before mockId
  };

  const onFeddbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  return (
    <div>
      <div className="border shadow-sm rounded-xl p-3">
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
        <h2 className="text-sm text-gray-600">
          {interview?.jobExperience} Years of Experience
        </h2>
        <h2 className="text-xs text-gray-400">
          Created At: {interview.createdAt}
        </h2>
        <div className="flex justify-between mt-2 gap-5 rounded-xl">
          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-xl"
            onClick={onFeddbackPress}
          >
            Feedback
          </Button>
          <Button size="sm" className="w-full rounded-xl" onClick={onStart}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewItemCard;
