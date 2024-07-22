"use client";

import React, { useRef, useState } from "react";
import { states } from "../data/States";
import { useFetchRepresentatives } from "@/app/hooks/useFetchRepresentative";
import { useRepresentativesContext } from "@/app/context/GlobalStateContext";

const InputSelection: React.FC = () => {
  const [selectedState, setselectedState] = useState("defaultStateSelect");
  //Global state that manages whether senator or Representative is selected
  const { selectedRepType, setSelectedRepType, isLoading } =
    useRepresentativesContext();
  const { fetchRepresentatives } = useFetchRepresentatives();
  const [error, setError] = useState("");

  // Refs to store the previous Rep/Sen and state selection
  const prevStateRef = useRef<string>("defaultStateSelect");
  const prevRepTypeRef = useRef<string>("defaultRepSelect");

  const handleRepChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRepType(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedState(event.target.value);
  };

  const handleSubmit = () => {
    if (
      selectedRepType === "defaultRepSelect" ||
      selectedState === "defaultStateSelect"
    ) {
      setError("Please select both a Rep/Sen and a state.");
      return;
    }
    //If the Rep/Sen and state selections have not changed since last submit, do nothing.
    if (
      selectedRepType === prevRepTypeRef.current &&
      selectedState === prevStateRef.current
    ) {
      return;
    }

    setError(""); // Clear the error if validation passes

    // Update refs with the new Rep/Sen and State selections
    prevRepTypeRef.current = selectedRepType;
    prevStateRef.current = selectedState;

    fetchRepresentatives(selectedRepType, selectedState);
  };

  return (
    <div>
      <div className="mb-2 border  border-gray-100 ml-6 mr-6"></div>
      {/* Border above our Input Form */}
      <div className=" sm:flex flex-col space-y-4 w-full sm:max-w-lg">
        <div className="sm:w-full sm:ml-20 flex space-x-2 sm:space-x-4 items-end">
          {/* Rep/Sen selection field */}
          <div className="ml-6 sm:pl-0 sm:ml-0 flex text-sm sm:text-base flex-col flex-1">
            <label
              htmlFor="representative-senator"
              className="mb-2 text-black text-bold text-center"
            ></label>
            <select
              name="representative-senator"
              id="representative-senator"
              className="px-0 sm:px-6 text-center w-full sm:w-48 text-black text-bold antialiased font-semibold py-2 border rounded"
              value={selectedRepType}
              onChange={handleRepChange}
            >
              <option key="defaultRepSelect" value="defaultRepSelect">
                Select a Rep/Sen
              </option>
              <option key="representative" value="representative">
                Representative
              </option>
              <option key="senator" value="senator">
                Senator
              </option>
            </select>
          </div>
          {/* State selection field */}
          <div className=" flex text-sm sm:text-base sm:px-2 flex-col flex-1">
            <label
              htmlFor="state"
              className="mb-2 text-black text-bold text-center"
            ></label>
            <select
              name="state"
              id="state"
              className=" px-0 sm:px-6 w-full sm:w-48 text-center text-black text-bold antialiased font-semibold py-2 border rounded"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option key="defaultStateSelect" value="defaultStateSelect">
                Select a State
              </option>
              {/* Map our state options from States.tsx */}
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
          <div className="pr-6 sm:pr-0">
            {/* Submit button */}
            <button
              className="px-3 text-sm sm:text-base sm:px-8 py-2 bg-blue-500 active:bg-blue-600 text-white rounded"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-500 antialiased ml-40 mt-2">{error}</div>
      )}
    </div>
  );
};

export default InputSelection;
