import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout";
import { SubCategoryList } from "../../components/SubCategoryList";

const SubCategoryPage = ({ categories }) => {
  const { catId } = useParams();
  return (
    <Layout
      title={
        categories && categories.filter((item) => item._id === catId)[0].name
      }
    >
      <SubCategoryList id={catId} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.category,
});

export default connect(mapStateToProps, null)(SubCategoryPage);
