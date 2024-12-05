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

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/data', {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            email: parsedDetails[0].email,
          },
        });
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sleepRecord, ...dashboardDataWithoutSleepRecord } = response.data;
        setData(dashboardDataWithoutSleepRecord);
        console.log(response);
    
      } catch (err) {
        console.error(err);
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
