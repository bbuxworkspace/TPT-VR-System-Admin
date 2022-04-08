import React from "react";
import AddTeamForm from "../../components/AddTeamForm/AddTeamForm";
import Layout from "../../components/shared/Layout/Layout";

const AddTeamPage = () => {
  return (
    <div className="bg_light">
      <Layout title="Add Team">
        <AddTeamForm />
      </Layout>
    </div>
  );
};

export default AddTeamPage;
