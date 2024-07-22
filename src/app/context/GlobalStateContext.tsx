"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Representative } from "../types/representative";
import makeContextHook from "../hooks/makeContextHook";

//Define the Representative object context
type RepresentativesContextTpe = {
  //The type for all representatives that are pulled from the API endpoint
  representatives: Representative[];
  setRepresentatives: Dispatch<SetStateAction<Representative[]>>;
  //The type for the current representative that is selected in RepresentativeList
  currentSelectedRepresentative: Representative | null;
  setCurrentSelectedRepresentative: Dispatch<
    SetStateAction<Representative | null>
  >;
  //Change the RepType based on whether "Representative" or "Senator" is selected
  selectedRepType: string;
  setSelectedRepType: Dispatch<SetStateAction<string>>;
  //Manage loading for this context
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
export const RepresentativesContext = createContext<
  RepresentativesContextTpe | undefined
>(undefined);

// Custom hook
export const useRepresentativesContext = makeContextHook(
  RepresentativesContext
);

// Global state provider
const GlobalStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [currentSelectedRepresentative, setCurrentSelectedRepresentative] =
    useState<Representative | null>(null);
  const [selectedRepType, setSelectedRepType] =
    useState<string>("defaultRepSelect");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <RepresentativesContext.Provider
      value={{
        representatives,
        setRepresentatives,
        currentSelectedRepresentative,
        setCurrentSelectedRepresentative,
        selectedRepType,
        setSelectedRepType,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </RepresentativesContext.Provider>
  );
};

export default GlobalStateContextProvider;
