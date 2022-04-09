import React from "react";
import { CategoryList } from "../../components/CategoryList";
import Layout from "../../components/shared/Layout/Layout";

const CategoryPage = () => {
  return (
    <Layout title={"Category"}>
      <CategoryList />
    </Layout>
  );
};

export default CategoryPage;
