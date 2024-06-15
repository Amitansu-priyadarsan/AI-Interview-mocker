"use client"
import Webcam from 'react-webcam';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from "sonner";
import { chatSession } from '@/utils/GemitiAIModal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnswerSection({ mockInterviewQuestions, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer(prevAns => prevAns + result?.transcript);
        });
    }, [results]);

    const SaveUserAnswer = async () => {
        if (isRecording) {
            setLoading(true);
            stopSpeechToText();
            if (userAnswer?.length < 10) {
                setLoading(false);
                toast('Error while saving your answer please try again');
                return;
            }
            const feedbackPrompt = "Question: " + mockInterviewQuestions[activeQuestionIndex]?.question +
                ", User Answer: " + userAnswer + ", Depends on Question and user Answer for the given interview question " +
                "please give us rating for answer and feedback for area of improvement " +
                "in just 3 to 5 lines to improve it in JSON format with rating field with feedback.";

            const result = await chatSession.sendMessage(feedbackPrompt);

            const MockJsonResp = result.response.text().replace("```json", "").replace("```", "");
            console.log(MockJsonResp);
            
            const JsonFedbackResp = JSON.parse(MockJsonResp);
            const resp = await db.insert(UserAnswer)
                .values({
                    mockIdRef: interviewData?.mockId,
                    question: mockInterviewQuestions[activeQuestionIndex]?.question,
                    correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JsonFedbackResp?.feedback,
                    rating: JsonFedbackResp?.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                });
            if (resp) {
                toast('User Answer Recorded Successfully');
            }
            setUserAnswer('');
            setLoading(false);
            setResults([]);
        } else {
            startSpeechToText();
        }
    };

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col justify-center items-center bg-black rounded-lg p-5 mb-5'>
                <Image
                    src={'/webcam.png'}
                    width={300}
                    height={300}
                    className='absolute'
                />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 5, // Lower z-index to be behind the image
                    }}
                />
            </div>
            <Button 
                disabled={loading} variant="outline" className="mt-0 mb-10" onClick={SaveUserAnswer}>
                {isRecording ? (
                    <h2 className='text-red-600 flex items-center gap-2'>
                        <Mic /> Recording...
                    </h2>
                ) : (
                    <span className='text-blue-700 flex items-center gap-2'>
                        <Mic /> Record Answer
                    </span>
                )}
            </Button>

          
        </div>
    );
}

export default RecordAnswerSection;
