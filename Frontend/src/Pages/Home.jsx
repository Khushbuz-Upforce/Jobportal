import React from 'react';
import Navbar from '../Components/Navbar';
import HeroImage from '../assets/heroimage.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-yellow-100 via-white to-gray-100 min-h-screen">
        <Navbar />
        <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-32 gap-12">

          {/* Left Text Section with Glassmorphism */}
          <div className="md:w-1/2 text-center md:text-left bg-white/30 backdrop-blur-md p-8 rounded-xl border border-white/40">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Get Your <span className="text-yellow-500">Dream Job</span><br />Today!
            </h1>
            <p className="text-gray-700 mt-6 text-base sm:text-lg max-w-md">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
              perferendis dignissimos eligendi voluptas exercitationem, eius aut
              mollitia quasi nisi voluptatem similique, tempore totam, odit
              repellendus non. Dolores eos animi recusandae.
            </p>
            <Link to="/jobs">
              <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium transition">
                Browse Jobs
              </button>
            </Link>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 flex justify-center">
            <img src={HeroImage} alt="Hero Illustration" className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
