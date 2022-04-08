import React from "react";
import { AddPlayerForm } from "../../components/AddPlayerForm";
import Layout from "../../components/shared/Layout/Layout";

const AddPlayerPage = () => {
  return (
    <div className="bg_light">
      <Layout title="Add Player">
        <AddPlayerForm />
      </Layout>
    </div>
  );
};

export default AddPlayerPage;
