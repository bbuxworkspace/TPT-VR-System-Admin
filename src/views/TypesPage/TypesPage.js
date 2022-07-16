import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { ShelfList } from "../../components/ShelfList";

const TypesPage = () => {
  return (
    <Layout title={"Featured"}>
      <ShelfList />
    </Layout>
  );
};

export default TypesPage;
