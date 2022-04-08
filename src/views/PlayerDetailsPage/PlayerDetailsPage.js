import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlayerDetails } from "../../actions/Player.action";
import PlayerDetails from "../../components/PlayerDetails/PlayerDetails";
import Layout from "../../components/shared/Layout/Layout";

const PlayerDetailsPage = ({ getPlayerDetails, player }) => {
  const { id } = useParams();
  useEffect(() => {
    getPlayerDetails(id);
  }, []);
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout
        title={`${
          player === null || player.playerUniqueId !== id
            ? "Loading..."
            : player.name
        }`}
      >
        {player === null || player.playerUniqueId !== id ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: 600 }}
          >
            <Spinner variant="dark" animation="grow" />
          </div>
        ) : (
          <PlayerDetails player={player} />
        )}
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.game.selected_player,
});

export default connect(mapStateToProps, { getPlayerDetails })(
  PlayerDetailsPage
);
