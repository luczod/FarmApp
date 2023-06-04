import React from "react";
import Dashboard from "../Pages/Dashboard";
import List from "../Pages/List";
import Layout from "../components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Adicionar from "../Pages/Adicionar";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list/:tipo" element={<List />} />
          <Route path="/Adicionar" element={<Adicionar />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default AppRoutes;
