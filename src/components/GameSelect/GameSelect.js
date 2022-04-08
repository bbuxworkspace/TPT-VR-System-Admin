import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getGameList, selectGame } from "../../actions/Game.action";
import { AiOutlineDoubleRight } from "react-icons/ai";
import styles from "./GameSelect.module.scss";

const GameSelect = ({ getGameList, games, selectGame, token }) => {
  const naviagte = useNavigate();
  useEffect(() => {
    const func = async () => {
      if (token !== "") {
        let check = await getGameList(token);
        if (check === false) {
          naviagte("/");
        }
      } else {
        getGameList(-1);
      }
    };

    func();
  }, []);
  return (
    <Container>
      <Row>
        {games === null ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: 600 }}
          >
            <Spinner variant="dark" animation="grow" />
          </div>
        ) : (
          <>
            <Col md={12} className="pt-5 pb-3">
              <h3>Select Game</h3>
            </Col>
            {games &&
              games.map((game) => (
                <Col md={6} key={game._id} className="py-2">
                  <Card className="crd shadow py-5">
                    <Card.Body>
                      <Link to="/players" className={styles.name}>
                        {game.gameName}
                        <span className=" fs-5 fw-normal ms-2">
                          ({game.shortCode})
                        </span>
                      </Link>
                      <Link to="/players" className={styles.link}>
                        <AiOutlineDoubleRight
                          onClick={() => selectGame(game._id)}
                        />
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </>
        )}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  games: state.game.games,
  token: state.auth.token,
});

export default connect(mapStateToProps, { getGameList, selectGame })(
  GameSelect
);
