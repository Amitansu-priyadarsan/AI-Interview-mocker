import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import Interview from './_components/Interview'

function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>DashBoard</h2>
      <h2 className='text-gray-500'>Create and Satart Your AI Mock Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>

       {/* Previous Interview Question */}
       <Interview/>

    </div>
  )
}

export default Dashboard