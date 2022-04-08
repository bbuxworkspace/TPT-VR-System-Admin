import React from "react";
import GameSelect from "../../components/GameSelect/GameSelect";
import Layout from "../../components/shared/Layout/Layout";

const DashboardPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <GameSelect />
    </div>
  );
};

export default DashboardPage;
