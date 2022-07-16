import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout";
import { CollectionDetails } from "../../components/CollectionDetails";

const FeatuedDetailsPage = ({ collection }) => {
  const { id } = useParams();

  return (
    <Layout
      title={`Featured: ${
        collection !== null ? collection.name : "Loading..."
      }`}
    >
      <CollectionDetails id={id} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  collection: state.collection.collection,
});

export default connect(mapStateToProps, null)(FeatuedDetailsPage);
