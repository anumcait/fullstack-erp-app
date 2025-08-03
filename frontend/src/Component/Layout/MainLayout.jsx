// components/layout/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Partials/Header";
import Footer from "../Partials/Footer";
 import Sidebar from './Sidebar';
import './Layout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main className="layout-content">
          <Outlet /> {/* This will render the nested route components */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
