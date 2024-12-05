import axios from "axios";
import { useState, useEffect, useRef } from "react";

interface DashboardData {
  overallSentimentScore: number;
  personalityType: string;
  emotionalStabilityScore: number;
  socialInteractionScore: number | undefined;
  matchNumbers: number;
}

const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const hasFetchedData = useRef(false); // Ref to track if data has been fetched

  useEffect(() => {
    if (hasFetchedData.current) return; // Prevent re-fetching

    const loginDetails = localStorage.getItem("loginDetails");
    if (!loginDetails) {
      setError("Login details not found in local storage");
      setLoading(false);
      return;
    }

    const parsedDetails = JSON.parse(loginDetails);
    console.log(parsedDetails[0].email);

    if (!parsedDetails[0].email) {
      setError("Email not found in login details");
      setLoading(false);
      return;
    }

    const fetchSentimentData = async () => {
      try {
        const sentimentResponse = await axios.post(
          "http://localhost:8080/sentiment/fetch",
          {
            email: parsedDetails[0].email,
          }
        );
        console.log("Sentiment data fetched:", sentimentResponse);

        if (sentimentResponse.data) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { sleepRecord, ...dashboardDataWithoutSleepRecord } = sentimentResponse.data;
          setData(dashboardDataWithoutSleepRecord);
        } else {
          setError("No sentiment data available");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchSentimentData();
    hasFetchedData.current = true; // Mark data as fetched
  }, []); // Empty dependency array ensures this runs only once

  return { data, loading, error };
};

export default useDashboardData;
