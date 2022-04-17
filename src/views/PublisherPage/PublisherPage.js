import React from "react";
import { PublisherList } from "../../components/PublisherList";
import Layout from "../../components/shared/Layout/Layout";

const PublisherPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout title="Publishers">
        <PublisherList />
      </Layout>
    </div>
  );
};

export default PublisherPage;
