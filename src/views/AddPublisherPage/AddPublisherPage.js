import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPublisherDetails } from "../../actions/Publisher.action";
import { AddPublisherForm } from "../../components/AddPublisherForm";
import Layout from "../../components/shared/Layout/Layout";

const AddPublisherPage = ({ edit, data, getPublisherDetails }) => {
  const { id } = useParams();
  useEffect(() => {
    if (edit) {
      getPublisherDetails(id);
    }
  }, [edit, id]);

  return (
    <div className="bg_light">
      <Layout
        title={edit ? (!data ? "Loading..." : data.name) : "Add Publisher"}
      >
        {edit && !data && <Spinner animation="border" variant="dark" />}
        {edit === true && data ? (
          <AddPublisherForm data={data} update={true} />
        ) : (
          <AddPublisherForm />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.publisher.selected_publisher,
});

export default connect(mapStateToProps, { getPublisherDetails })(
  AddPublisherPage
);
