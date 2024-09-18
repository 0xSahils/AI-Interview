"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubscribe = () => {
    // Perform any subscription-related logic here if needed

    // Redirect to the dashboard page
    router.push("/dashboard");
  };

  return (
    <div>
      <p>Subscribe</p>
      <Button onClick={handleSubscribe}>Subscribe</Button>{" "}
      {/* Add the click handler */}
    </div>
  );
}
