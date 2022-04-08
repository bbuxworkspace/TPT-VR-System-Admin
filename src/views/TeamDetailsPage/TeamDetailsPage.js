import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeamDetails } from "../../actions/Team.action";
import Layout from "../../components/shared/Layout/Layout";
import TeamDetails from "../../components/TeamDetails/TeamDetails";

const TeamDetailsPage = ({ getTeamDetails, team }) => {
  const { id } = useParams();
  useEffect(() => {
    getTeamDetails(id);
  }, [id]);
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout
        title={`${
          team === null || team.teamUniqueId !== id
            ? "Loading..."
            : team.teamName
        }`}
      >
        {team === null || team.teamUniqueId !== id ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: 600 }}
          >
            <Spinner variant="dark" animation="grow" />
          </div>
        ) : (
          <TeamDetails team={team} />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  team: state.game.selected_team,
});

export default connect(mapStateToProps, { getTeamDetails })(TeamDetailsPage);
