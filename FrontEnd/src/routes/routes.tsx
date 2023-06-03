import React from "react";
import Dashboard from "../Pages/Dashboard";
import List from "../Pages/List";
import Layout from "../components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list/:tipo" element={<List />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default AppRoutes;
