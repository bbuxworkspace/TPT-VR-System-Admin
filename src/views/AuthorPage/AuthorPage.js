import React from "react";
import AuthorList from "../../components/AuthorList/AuthorList";
import Layout from "../../components/shared/Layout/Layout";

const AuthorPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout title="Authors">
        <AuthorList />
      </Layout>
    </div>
  );
};

export default AuthorPage;
