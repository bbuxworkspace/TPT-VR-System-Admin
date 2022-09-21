import React from "react";
import { CollectionList } from "../../components/CollectionList";
import Layout from "../../components/shared/Layout/Layout";

const CollectionPage = () => {
  return (
    <Layout title={"Home"}>
      <CollectionList />
    </Layout>
  );
};

export default CollectionPage;
