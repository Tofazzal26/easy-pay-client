import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/Header/Header";

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <h2>Footer</h2>
    </div>
  );
};

export default Root;
