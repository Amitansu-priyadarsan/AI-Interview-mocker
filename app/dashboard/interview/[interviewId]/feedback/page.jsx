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
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [overallRating, setOverallRating] = useState(0);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, []);

    const GetFeedback = async () => {
        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result);

        // Calculate the overall rating
        if (result.length > 0) {
            const totalRating = result.reduce((acc, item) => acc + item.rating, 0);
            const averageRating = totalRating / result.length;
            setOverallRating(averageRating.toFixed(2)); // Round to 2 decimal places
        }
    };

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
            <h2 className="font-bold text-2xl"> Here is Your Interview Feedback</h2>

            {feedbackList.length === 0 ? (
                <h2 className="text-primary font-lg my-3">No interview record found.</h2>
            ) : (
                <>
                    <h2 className="text-primary font-lg my-3">
                        Your Overall Rating: <strong>{overallRating}/10</strong>
                    </h2>

                    <h2 className="text-sm text-gray-500">
                        Find below interview questions with correct answers and feedback for improvement
                    </h2>
                    {feedbackList.map((item, index) => (
                        <Collapsible key={index} className="mt-7">
                            <CollapsibleTrigger className="p-2 bg-secondary rounded my-2 text-left flex justify-between gap-7 w-full">
                                {item.question} <ChevronsUpDown className="h-5 w-5" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-red-500 p-2 border rounded-lg">
                                        <strong>Rating: {item.rating}</strong>
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                                        <strong>Your Answer:</strong> {item.userAns}
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                                        <strong>Correct Answer:</strong> {item.correctAns}
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-700">
                                        <strong>Feedback:</strong> {item.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            )}

            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    );
}

export default Feedback;
