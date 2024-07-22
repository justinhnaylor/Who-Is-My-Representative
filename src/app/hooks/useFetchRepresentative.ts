"use client";
//Hook that fetches data from our Senator or Representative API, and maps the data to an object
import { useState } from "react";
import useSWR, { mutate as globalMutate } from "swr";
import { useRepresentativesContext } from "../context/GlobalStateContext";
import { Representative } from "../types/representative";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseRepresentativesResult {
  fetchRepresentatives: (selectedRep: string, selectedState: string) => void;
}

export const useFetchRepresentatives = (): UseRepresentativesResult => {
  //Import setRepresentatives and loading states from GlobalStateContext
  const { setRepresentatives, setIsLoading } = useRepresentativesContext();
  const [error, setError] = useState<string | null>(null);

  const fetchRepresentatives = (
    selectedRepType: string,
    selectedState: string
  ) => {
    setIsLoading(true);
    let apiUrl = "";
    //Determine what API endpoint is being used based on our Representative/Senator selection
    if (selectedRepType === "representative") {
      apiUrl = `/api/representatives/${selectedState}`;
    } else if (selectedRepType === "senator") {
      apiUrl = `/api/senators/${selectedState}`;
    }

    globalMutate(
      apiUrl,
      fetcher(apiUrl)
        .then((data) => {
          //Map our object
          const results = data.results.map((item: any) => {
            //Split the name returned by the API into firstName and lastName
            const [firstName, ...rest] = item.name.split(" ");
            const lastName = rest.join(" ");
            return {
              firstName,
              lastName,
              name: item.name,
              party: item.party,
              state: item.state,
              district: item.district,
              phone: item.phone,
              office: item.office,
              link: item.link,
            } as Representative;
          });
          setRepresentatives(results);
          setError(null);
        })
        .catch((error: Error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        })
    );
  };

  return {
    fetchRepresentatives,
  };
};
