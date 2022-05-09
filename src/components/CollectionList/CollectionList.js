import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CollectionList.module.scss";
import collections from "../../constants/Collections";

const CollectionList = () => {
  return (
    <Container className="pb-4">
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {collections.map((colItem, i) => (
            <Row
              key={colItem.id}
              className={`mb-3 pb-3 ${
                collections.length - 1 === i ? "" : "border-bottom"
              }`}
            >
              <Col md={1}>
                <Row>
                  <Col
                    md={12}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div className={styles.line}></div>
                  </Col>
                </Row>
              </Col>
              <Col md={11} className="">
                <div className="d-flex align-items-center h-100">
                  <Link
                    to={`/collection/${colItem.type}`}
                    className={` fw-bold ${styles.link}`}
                  >
                    {colItem.name}
                  </Link>
                </div>
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CollectionList;
