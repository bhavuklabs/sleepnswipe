import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "./pages";
import Questionnaire from "./pages/Questionare/Questionnaire";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); 

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/auth" replace />
          }
        />
        {/* Auth route */}
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/questions"
          element={<Questionnaire setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

