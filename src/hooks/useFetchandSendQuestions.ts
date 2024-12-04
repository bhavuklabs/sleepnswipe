import axios from 'axios';

interface ApiResponse {
  questions: Array<{
    question: string;
    options: string[];
  }>;
}

interface QuestionnaireResponse {
  email: string;
  responses: Array<{
    question: string;
    options: string;
  }>;
}

// Function to fetch onboarding questions
const FetchOnboardingQuestions = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to send completed questionnaire responses
const SendQuestionnaireResponses = async (url: string, data: QuestionnaireResponse): Promise<void> => {
  try {
    const response = await axios.post(url, data);
    console.log("Response submitted successfully:", response.data);
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export { FetchOnboardingQuestions, SendQuestionnaireResponses };
