"use client";
import React from "react";
import { useRepresentativesContext } from "../context/GlobalStateContext";
import Link from "next/link";

const MoreInfoCard = () => {
  // Get the currentSelectedRepresentative and selectedRepType from GlobalStateContext
  const { currentSelectedRepresentative, selectedRepType } =
    useRepresentativesContext();

  const websiteLink = currentSelectedRepresentative?.link || "";

  return (
    <div className=" text-gray-500">
      <h2 className="text-2xl font-medium antialiased mb-4"> Info </h2>

      {/* First Name field */}
      <div className="mb-4 bg-gray-100 p-1 rounded">
        <div
          id="representative-firstName"
          className="p-2"
          aria-label="Selected Representative's First Name"
        >
          {currentSelectedRepresentative?.firstName || "First Name"}
        </div>
      </div>

      {/* Last Name field */}
      <div className="mb-4 bg-gray-100 p-1 rounded">
        <div
          id="representative-lastName"
          className="p-2"
          aria-label="Selected Representative's Last Name"
        >
          {currentSelectedRepresentative?.lastName || "Last Name"}
        </div>
      </div>

      {/* District field */}
      {selectedRepType !== "senator" && (
        <div className="mb-4 bg-gray-100 p-1 rounded">
          <div
            id="representative-district"
            className="p-2"
            aria-label="Selected Representative's District"
          >
            {currentSelectedRepresentative?.district || "District"}
          </div>
        </div>
      )}

      {/* Phone field */}
      <div className="mb-4 bg-gray-100 p-1 rounded">
        <div
          id="representative-phone"
          className="p-2"
          aria-label="Selected Representative's Phone Number"
        >
          {currentSelectedRepresentative?.phone || "Phone"}
        </div>
      </div>

      {/* Office field */}
      <div className="mb-4 bg-gray-100 p-1 rounded">
        <div
          id="representative-office"
          className="p-2"
          aria-label="Selected Representative's Office"
        >
          {currentSelectedRepresentative?.office || "Office"}
        </div>
      </div>

      {/* Website field */}
      <div className="mb-4 bg-gray-100 p-1 rounded">
        <div
          id="representative-website"
          className="p-2"
          aria-label="Selected Representative's Website Link"
        >
          {websiteLink ? (
            <Link
              href={websiteLink}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit Website
            </Link>
          ) : (
            "Website"
          )}
        </div>
      </div>
    </div>
  );
};
export default MoreInfoCard;
