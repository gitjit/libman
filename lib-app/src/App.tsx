import { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountPage from "./pages/AccountPage/AccountPage";

import User from "./models/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />{" "}
        {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
