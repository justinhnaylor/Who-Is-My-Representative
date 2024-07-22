"use client";
import React, { useEffect, useState } from "react";
import { useRepresentativesContext } from "../context/GlobalStateContext";
import { Representative } from "../types/representative";
import SpinningCircle from "./SpinningCircle";

const RepresentativeList = () => {
  //Grab our states from GlobalStateContext
  const { representatives, setCurrentSelectedRepresentative, isLoading } =
    useRepresentativesContext();
  const [selectedRep, setSelectedRep] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  //Set the selection of the current Representative
  const handleCurrentSelectedRepresentative = (rep: Representative) => {
    setCurrentSelectedRepresentative(rep);
    setSelectedRep({ firstName: rep.firstName, lastName: rep.lastName });
  };

  // Identify the current selected Rep so that we can make the background darker for that Rep while it is selected
  const isSelected = (rep: Representative) => {
    return (
      selectedRep?.firstName === rep.firstName &&
      selectedRep?.lastName === rep.lastName
    );
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-gray-500 text-2xl font-medium antialiased mb-4">
        List / <span className="text-sky-500">Representatives</span>
      </h2>
      <table className="min-w-full">
        <thead className="text-gray-500 bg-gray-100 text-left">
          <tr>
            <th className="py-4 px-3 border-b antialiased font-medium">Name</th>
            <th className="py-4 px-20 border-b antialiased font-medium">
              Party
            </th>
          </tr>
        </thead>
        <tbody className="text-black">
          {isLoading ? (
            <SpinningCircle />
          ) : (
            // Map the representatives retrieved from our API
            representatives.map((rep, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 cursor-pointer ${
                  isSelected(rep) ? "bg-gray-100" : ""
                }`}
                onClick={() => handleCurrentSelectedRepresentative(rep)}
              >
                <td className="py-4 px-3 border-b border-gray-100 antialiased whitespace-nowrap">
                  {rep.firstName} {rep.lastName}
                </td>
                <td className="py-4 px-20 border-b border-gray-200 antialiased">
                  {rep.party.charAt(0)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RepresentativeList;
