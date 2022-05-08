import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout";
import { SubCategoryList } from "../../components/SubCategoryList";
import { getCategoryList } from "../../actions/Category.action";

const SubCategoryPage = ({ categories, getCategoryList }) => {
  const { catId } = useParams();
  useEffect(() => {
    if (categories === null) {
      getCategoryList();
    }
  }, []);
  return (
    <Layout
      title={
        categories !== null
          ? categories.filter((item) => item._id === catId)[0].name
          : "Loading..."
      }
    >
      <SubCategoryList id={catId} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.category,
});

export default connect(mapStateToProps, { getCategoryList })(SubCategoryPage);
