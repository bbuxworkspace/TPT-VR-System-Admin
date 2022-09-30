import React from "react";
import { connect } from "react-redux";
import Layout from "../../components/shared/Layout/Layout";
import { TopPublishers } from "../../components/TopPublishers";

const TopPublisherPage = ({ collection }) => {
  return (
    <Layout
      title={`Top Publishers: ${
        collection !== null ? collection.name : "Loading..."
      }`}
    >
      <TopPublishers id={"publisher"} author={true} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  collection: state.collection.collection,
});

export default connect(mapStateToProps, null)(TopPublisherPage);
