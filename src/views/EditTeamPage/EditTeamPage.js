import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getTeamDetails } from "../../actions/Team.action";
import AddTeamForm from "../../components/AddTeamForm/AddTeamForm";
import Layout from "../../components/shared/Layout/Layout";

const EditTeamPage = ({ getTeamDetails, team }) => {
  const { id } = useParams();

  useEffect(() => {
    getTeamDetails(id);
  }, []);
  return (
    <div className="bg_light">
      <Layout
        title={`${
          team === null || team.teamUniqueId !== id
            ? "Loading..."
            : team.teamName
        }`}
      >
        <AddTeamForm update={true} data={team} />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  team: state.game.selected_team,
});

export default connect(mapStateToProps, { getTeamDetails })(EditTeamPage);
