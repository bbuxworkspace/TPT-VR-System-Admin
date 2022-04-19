import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookDetails } from "../../actions/Book.action";
import { AddBookForm } from "../../components/AddBookForm";
import Layout from "../../components/shared/Layout/Layout";

const AddBookPage = ({ edit, data, getBookDetails }) => {
  const { id } = useParams();
  useEffect(() => {
    if (edit) {
      getBookDetails(id);
    }
  }, [edit, id]);

  return (
    <div className="bg_light">
      <Layout title={edit ? (!data ? "Loading..." : data.name) : "Add Book"}>
        {edit && !data && <Spinner animation="border" variant="dark" />}
        {edit === true && data ? (
          <AddBookForm data={data} update={true} />
        ) : (
          <AddBookForm />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.book.selected_book,
});

export default connect(mapStateToProps, { getBookDetails })(AddBookPage);
