import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { TeamList } from "../../components/TeamList";

const TeamListPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout title="Teams">
        <TeamList />
      </Layout>
    </div>
  );
};

export default TeamListPage;
