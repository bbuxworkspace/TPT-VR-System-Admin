import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryList } from "../../actions/Category.action";
import { AddCategoryForm } from "../../components/AddCategoryForm";
import Layout from "../../components/shared/Layout/Layout";

const AddCategory = ({ edit, categories, getCategoryList }) => {
  useEffect(() => {
    if (edit && !categories) {
      getCategoryList();
    }
  }, [edit]);

  const { id } = useParams();
  return (
    <div className="bg_light">
      <Layout title="Add Category">
        {edit && !categories && <Spinner animation="border" variant="dark" />}
        {edit === true && categories ? (
          <AddCategoryForm
            data={categories.filter((item) => item._id === id)[0]}
            update={true}
          />
        ) : (
          <AddCategoryForm />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.category.category,
});

export default connect(mapStateToProps, { getCategoryList })(AddCategory);
