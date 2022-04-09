import React from "react";
import { AddCategoryForm } from "../../components/AddCategoryForm";
import Layout from "../../components/shared/Layout/Layout";

const AddCategory = () => {
  return (
    <div className="bg_light">
      <Layout title="Add Category">
        <AddCategoryForm />
      </Layout>
    </div>
  );
};

export default AddCategory;
