import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlayerDetails } from "../../actions/Player.action";
import { AddPlayerForm } from "../../components/AddPlayerForm";
import AddTeamForm from "../../components/AddTeamForm/AddTeamForm";
import Layout from "../../components/shared/Layout/Layout";

const EditPlayerPage = ({ getPlayerDetails, player }) => {
  const { id } = useParams();

  useEffect(() => {
    getPlayerDetails(id);
  }, []);
  return (
    <div className="bg_light">
      <Layout
        title={`${
          player === null || player.playerUniqueId !== id
            ? "Loading..."
            : player.name
        }`}
      >
        <AddPlayerForm update={true} data={player} />
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.game.selected_player,
});

export default connect(mapStateToProps, { getPlayerDetails })(EditPlayerPage);
