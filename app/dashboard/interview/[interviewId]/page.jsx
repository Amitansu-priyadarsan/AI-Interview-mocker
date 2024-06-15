"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Ghost, Lightbulb, Webcam, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ReactWebcam from 'react-webcam'

function Interview({ params }) {

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId))
        console.log(result);
        setInterviewData(result[0]);
    }

    return (
        <div className='my-11 '>
            <h2 className='font-bold text-2xl ml-8'> Let's Get Started </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
               
            <div className='flex flex-col my-5 gap-5 p-5 '>
                {interviewData ? (
                    <>
                    <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>

                   
                        <h2 className='text-lg'><strong>Job Role/Job Position:</strong> {interviewData.jsonPosition}</h2>
                        <h2  className='text-lg'><strong>Job Description:</strong> {interviewData.jobDesc}</h2>
                        <h2  className='text-lg'><strong>Job Experience:</strong> {interviewData.jobExperience}</h2>
                        </div>
                        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                            <h2 className='flex gap-2 items-center text-yellow-300'><Lightbulb/> <strong>Information</strong> </h2>
                            <h2 className='mt-3 text-yellow-500'> {process.env.NEXT_PUBLIC_INFORMATION}</h2>
 
                        </div>

                    </>
                    
                ) : (
                    <p>Loading interview data...</p>
                )}
            </div>
            <div>
                {webCamEnabled ? (
                    <ReactWebcam
                        audio={true}
                        onUserMedia={() => setWebCamEnabled(true)}
                        onUserMediaError={() => setWebCamEnabled(false)}
                        mirrored={true}
                        style={{
                            width: 300,
                            height: 300
                        }}
                    />
                ) : (
                    <>
                        <WebcamIcon className='h-72 w-full margin-y my-7 p-20 bg-secondary rounded-lg border' />
                        <Button variant="ghost"  className="w-full "  onClick={() => setWebCamEnabled(true)}> Enable WebCam and Microphone </Button>
                       
                    </>
                )}
                 <div className='flex justify-end items-end mt-2'>
                    <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                    <Button >Start Interview</Button>
                    </Link>
           

            </div>
            </div>
           
           

            </div>
          
           
        </div>
    )
}

export default Interview
