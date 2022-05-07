import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesDetails } from "../../actions/Series.action";
import { AddSeriesForm } from "../../components/AddSeriesForm";
import Layout from "../../components/shared/Layout/Layout";

const AddSeriesPage = ({ edit, data, getSeriesDetails }) => {
  const { id } = useParams();
  useEffect(() => {
    if (edit) {
      getSeriesDetails(id);
    }
  }, [edit, id]);

  return (
    <div className="bg_light">
      <Layout title={edit ? (!data ? "Loading..." : data.name) : "Add Series"}>
        {edit && !data && <Spinner animation="border" variant="dark" />}
        {edit === true && data ? (
          <AddSeriesForm data={data} update={true} />
        ) : (
          <AddSeriesForm />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.series.selected_series,
});

export default connect(mapStateToProps, { getSeriesDetails })(AddSeriesPage);
