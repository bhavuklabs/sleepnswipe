import axios from 'axios';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const loginDetails = localStorage.getItem('loginDetails');
    if (!loginDetails) {
      setError('Login details not found in local storage');
      setLoading(false);
      return;
    }

    const parsedDetails = JSON.parse(loginDetails);
    console.log(parsedDetails[0].email);

    if (!parsedDetails[0].email) {
      setError('Email not found in login details');
      setLoading(false);
      return;
    }

    const fetchSentimentData = async () => {
      try {
        const sentimentResponse = await axios.post('http://localhost:8080/sentiment/fetch', {
          email: parsedDetails[0].email,
        });
        console.log('Sentiment data fetched:', sentimentResponse);

        const userResponse = await axios.get('http://localhost:8080/user/data', {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            email: parsedDetails[0].email,
          },
        });

        // Remove the sleep record from the user data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sleepRecord, ...dashboardDataWithoutSleepRecord } = userResponse.data;
        setData(dashboardDataWithoutSleepRecord);
        console.log('User data fetched:', userResponse);

      } catch (err) {
        console.error(err);
        setError('Error fetching data');
      } finally {
        setLoading(false); 
      }
    };

    fetchSentimentData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
