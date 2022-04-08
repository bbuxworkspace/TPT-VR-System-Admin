import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Spinner,
} from "react-bootstrap";
import Moment from "react-moment";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PlayerList.module.scss";
import demoImg from "../../assets/Demo/plr.webp";
import { connect } from "react-redux";
import { AiOutlineDoubleRight, AiOutlineUserAdd } from "react-icons/ai";
import { getPlayerList } from "../../actions/Player.action";

const PlayerList = ({ players, getPlayerList, selected_game }) => {
  const navigate = useNavigate();
  const [list, setList] = useState(players === null ? [] : players);
  useEffect(() => {
    if (selected_game === null) {
      navigate("/dashboard");
    } else if (players === null) {
      getPlayerList(selected_game._id);
    }
    if (players !== null) {
      setList(players);
    }
  }, [players]);

  const [searchText, setSearchText] = useState("");

  const searchHandeler = (text) => {
    if (text !== "") {
      setList(
        players.filter((item) => {
          return (
            item.name.toLowerCase().includes(text.toLowerCase()) ||
            item.playerUniqueId.toLowerCase().includes(text.toLowerCase()) ||
            item.customGameId.toLowerCase().includes(text.toLowerCase())
          );
        })
      );
    } else {
      setList(players);
    }
    setSearchText(text);
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search Player</span>
          <Form.Control
            type="text"
            placeholder="Search Player by name or team..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/players/add-player" className={styles.add}>
            <AiOutlineUserAdd />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {players === null ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 600 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
            <>
              {list !== null &&
                list.map((player, i) => (
                  <Row
                    key={player._id}
                    className={`mb-3 pb-3 ${
                      list.length - 1 === i ? "" : "border-bottom"
                    }`}
                  >
                    <Col md={2}>
                      <Row>
                        <Col
                          md={7}
                          className={`${styles.small} d-flex align-items-center`}
                        >
                          <div className={styles.img_wrapper}>
                            <img
                              src={player.pictureUrl}
                              alt=""
                              className={styles.img}
                            />
                          </div>
                        </Col>
                        <Col
                          md={3}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <div className={styles.line}></div>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={5} className="">
                      <div className="">
                        <Link
                          to={`/players/${player.playerUniqueId}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {player.name}{" "}
                          <span className="fw-normal fs-6">
                            ({player.customGameId})
                          </span>
                        </Link>
                      </div>
                      <span className="d-block fw-normal">
                        <span className="fw-bold me-2">ID:</span>
                        {player.playerUniqueId}
                      </span>
                      <span className="d-block fw-light text-secondary">
                        <Moment format="dddd, MMMM DD YYYY">
                          {player.createdAt}
                        </Moment>
                      </span>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div className={styles.line}></div>
                    </Col>
                    <Col md={3} className="">
                      <span className="d-block fw-normal">
                        <span className=" me-2">Total Match:</span>
                        {player.totalPlayedMatch}
                      </span>
                      <span className="d-block fw-normal">
                        <span className=" me-2">Total Win:</span>
                        {player.totalWin}
                      </span>
                      <span className="d-block fw-normal">
                        <span className=" me-2">Total Loss:</span>
                        {player.totalLoss}
                      </span>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link
                        to={`/players/${player.playerUniqueId}`}
                        className={` fw-bold fs-4 ${styles.link}`}
                      >
                        <AiOutlineDoubleRight />
                      </Link>
                    </Col>
                  </Row>
                ))}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  selected_game: state.game.selected_game,
  players: state.game.players,
});

export default connect(mapStateToProps, { getPlayerList })(PlayerList);
