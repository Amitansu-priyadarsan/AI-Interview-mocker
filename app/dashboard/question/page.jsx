"use client"
import React, { useState } from 'react';

function Page() {
  const [message, setMessage] = useState('');
  const [isMailSent, setIsMailSent] = useState(false);

  const handleSendMessage = () => {
    // You can implement the email sending logic here
    // For simplicity, let's just update the state to indicate that the mail has been sent
    setIsMailSent(true);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Any questions? MAIL US</h1>
        <p className="mt-4 text-gray-500">
          If you have any questions, feel free to email us at <a href="mailto:amitansupriyadarsan70@gmail.com">amitansupriyadarsan70@gmail.com</a>.
        </p>
      </div>

      {/* Message box */}
      <div className="mx-auto max-w-md mt-8">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          placeholder="Type your message here..."
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Send
        </button>
        {isMailSent && (
          <p className="mt-2 text-green-600">Mail sent!</p>
        )}
      </div>
    </div>
  );
}

export default Page;
