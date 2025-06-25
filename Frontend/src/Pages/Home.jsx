import React from 'react'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-200 via-gray-100 to-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center py-24 px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to the Job Portal
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
            Discover thousands of job opportunities, connect with top companies, and take the next step in your career.
          </p>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300">
            Browse Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
