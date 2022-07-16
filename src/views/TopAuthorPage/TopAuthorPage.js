import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/shared/Layout/Layout";
import { TopAuthorDetails } from "../../components/TopAuthorDetails";

const TopAuthorPage = ({ collection }) => {
  return (
    <Layout
      title={`Popular Authors: ${
        collection !== null ? collection.name : "Loading..."
      }`}
    >
      <TopAuthorDetails id={"popularAuthor"} author={true} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  collection: state.collection.collection,
});

export default connect(mapStateToProps, null)(TopAuthorPage);
