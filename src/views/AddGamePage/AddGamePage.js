import React from "react";
import { AddGameForm } from "../../components/AddGameForm";
import Layout from "../../components/shared/Layout/Layout";

const AddGamePage = () => {
  return (
    <div className="bg_light">
      <Layout title="Add Game">
        <AddGameForm />
      </Layout>
    </div>
  );
};

export default AddGamePage;
