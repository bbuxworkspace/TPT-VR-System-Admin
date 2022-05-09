import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CollectionDetails.module.scss";
import { connect } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { BASE_URL } from "../../constants/URL";
import { getCollectionDetails } from "../../actions/Collection.action";

const CollectionDetails = ({ collection, getCollectionDetails, id }) => {
  useEffect(() => {
    getCollectionDetails(id);
  }, [id]);

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-end align-items-center pb-3 ">
        <div className="text-right">
          <Link to={`/collection/${id}/edit`} className={styles.add}>
            <AiOutlineEdit />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {collection === null ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 600 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
            <>
              {collection.books.length === 0 && (
                <span className="d-block text-center fs-4 lead pb-4">
                  No Book Found!
                </span>
              )}
              {collection !== null &&
                collection.books.map((bookItem, i) => (
                  <Row
                    key={bookItem._id}
                    className={`mb-3 pb-3 ${
                      collection.books.length - 1 === i ? "" : "border-bottom"
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
                              crossOrigin="anonymous"
                              src={`${BASE_URL}/image/small/${bookItem.image}`}
                              alt={bookItem.name}
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
                    <Col md={10} className="">
                      <div className="d-flex align-items-center h-100">
                        <span className={` fw-bold`}>{bookItem.name}</span>
                      </div>
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
  collection: state.collection.collection,
});

export default connect(mapStateToProps, {
  getCollectionDetails,
})(CollectionDetails);
