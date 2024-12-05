import { useState, useEffect } from 'react';

// Define the interface without sleepRecord
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

    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Sending email in query instead of body
          body: JSON.stringify({ email: parsedDetails[0].email }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        
        // Set data excluding sleepRecord (which isn't needed now)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sleepRecord, ...dashboardDataWithoutSleepRecord } = result;
        setData(dashboardDataWithoutSleepRecord);

      } catch (err) {
        console.log(err);
        setError('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
