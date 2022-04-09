import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import { getSubCategoryList } from "../../actions/SubCategory.action";
import AddSubCategoryForm from "../../components/AddSubCategoryForm/AddSubCategoryForm";
import Layout from "../../components/shared/Layout/Layout";

const AddSubCategory = ({ edit, categories, getCategoryList }) => {
  const { catId } = useParams();
  useEffect(() => {
    if (edit && !categories) {
      getSubCategoryList(catId);
    }
  }, [edit, catId]);

  const { id } = useParams();
  return (
    <div className="bg_light">
      <Layout title="Add Sub Category">
        {edit && !categories && <Spinner animation="border" variant="dark" />}
        {edit === true && categories ? (
          <AddSubCategoryForm
            data={categories.filter((item) => item._id === id)[0]}
            update={true}
            id={catId}
          />
        ) : (
          <AddSubCategoryForm id={catId} />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.subcategory.subcategory,
});

export default connect(mapStateToProps, { getCategoryList })(AddSubCategory);
