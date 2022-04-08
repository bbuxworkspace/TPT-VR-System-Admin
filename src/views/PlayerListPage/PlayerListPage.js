import React from "react";
import PlayerList from "../../components/PlayerList/PlayerList";
import Layout from "../../components/shared/Layout/Layout";

const PlayerListPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {/* <Topbar />
      <Sidebar />
      <FilterDashboard selectedFilter="active" />

      <DashboardCards /> */}
      <Layout title="Players">
        <PlayerList />
      </Layout>
    </div>
  );
};

export default PlayerListPage;
