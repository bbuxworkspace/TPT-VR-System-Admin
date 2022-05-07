import React from "react";
import SeriesList from "../../components/SeriesList/SeriesList";
import Layout from "../../components/shared/Layout/Layout";

const SeriesPage = () => {
  return (
    <Layout title={"Series"}>
      <SeriesList />
    </Layout>
  );
};

export default SeriesPage;
