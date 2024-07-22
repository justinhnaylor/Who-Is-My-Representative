import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { state: string } }
) {
  const { state } = params;
  const url = `http://whoismyrepresentative.com/getall_reps_bystate.php?state=${state}&output=json`;

  return (
    axios
      .get(url)
      .then((response) => {
        const body = response.data;

        // Check if the response body starts with '<', which would likely be an HTML error page
        if (body[0] === "<") {
          return NextResponse.json(
            {
              success: false,
              error: "Invalid request. Please check your state variable.",
            },
            { status: 400 }
          );
        }

        // Return the successful JSON response
        return NextResponse.json(
          {
            success: true,
            results: body.results,
          },
          { status: 200 }
        );
      })
      // Handle errors for the request
      .catch((error) => {
        return NextResponse.json(
          {
            success: false,
            error: error.message,
          },
          { status: 500 }
        );
      })
  );
}
