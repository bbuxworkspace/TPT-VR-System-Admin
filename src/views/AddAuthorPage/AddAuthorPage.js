import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthorDetails } from "../../actions/Author.action";
import AddAuthorForm from "../../components/AddAuthorForm/AddAuthorForm";
import Layout from "../../components/shared/Layout/Layout";

const AddAuthorPage = ({ edit, data, getAuthorDetails }) => {
  const { id } = useParams();
  useEffect(() => {
    if (edit) {
      getAuthorDetails(id);
    }
  }, [edit, id]);

  return (
    <div className="bg_light">
      <Layout title={edit ? (!data ? "Loading..." : data.name) : "Add Author"}>
        {edit && !data && <Spinner animation="border" variant="dark" />}
        {edit === true && data ? (
          <AddAuthorForm data={data} update={true} />
        ) : (
          <AddAuthorForm />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.author.selected_author,
});

export default connect(mapStateToProps, { getAuthorDetails })(AddAuthorPage);
