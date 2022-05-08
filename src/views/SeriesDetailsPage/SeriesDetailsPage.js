import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../components/shared/Layout/Layout";
import { SeriesDetails } from "../../components/SeriesDetails";
import { getSeriesList } from "../../actions/Series.action";

const SeriesDetailsPage = ({ series, getSeriesList }) => {
  const { id } = useParams();
  useEffect(() => {
    if (series === null) {
      getSeriesList();
    }
  }, []);
  return (
    <Layout
      title={`Series: ${
        series !== null
          ? series.items.filter((item) => item._id === id)[0].name
          : "Loading..."
      }`}
    >
      <SeriesDetails id={id} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  series: state.series.series,
});

export default connect(mapStateToProps, { getSeriesList })(SeriesDetailsPage);
