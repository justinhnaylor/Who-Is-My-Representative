"use client";

import InputSelection from "./components/input/InputSelection";
import RepresentativeList from "./components/RepresentativeList";
import MoreInfoCard from "./components/MoreInfoCard";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl text-center sm:text-left mb-10 sm:mb-20  sm:ml-6 mt-6 text-sky-500 antialiased font-bold	">
        Who's My Representative?
      </h1>
      {/* Input Selection form that handles the data we are passing to our API */}
      <InputSelection />
      <div className="flex flex-col sm:flex-row mt-4 w-full">
        <div className="w-full md:w-1/2 px-6 sm:px-0 sm:mr-4 sm:ml-6 sm:mt-0">
          {/* Card that displays the list of representatives fetched from our API */}
          <RepresentativeList />
        </div>
        <div className="w-full md:w-1/2 px-6 sm:px-0 sm:pl-4 sm:pr-6 mt-6 sm:mt-0">
          {/* Card that displays more information about a selected representative */}
          <MoreInfoCard />
        </div>
      </div>
    </div>
  );
}
