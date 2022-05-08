import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SeriesDetails.module.scss";
import { connect } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { getSeriesDetails } from "../../actions/Series.action";
import { BASE_URL } from "../../constants/URL";

const SeriesDetails = ({ series, getSeriesDetails, id }) => {
  const [list, setList] = useState(series === null ? [] : series.books);

  useEffect(() => {
    if (series === null) {
      getSeriesDetails(id);
    }
    if (series !== null) {
      setList(series.books);
    }
  }, [series]);

  const [searchText, setSearchText] = useState("");

  const searchHandeler = (text) => {
    if (text !== "") {
      setList(
        series.books.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        })
      );
    } else {
      setList(series.books);
    }
    setSearchText(text);
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search Book</span>
          <Form.Control
            type="text"
            placeholder="Search book by name..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to={`/series/${id}/edit`} className={styles.add}>
            <AiOutlineEdit />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {series === null ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: 600 }}
            >
              <Spinner variant="dark" animation="grow" />
            </div>
          ) : (
            <>
              {list.length === 0 && (
                <span className="d-block text-center fs-4 lead pb-4">
                  No Book Found!
                </span>
              )}
              {list !== null &&
                list.map((seriesItem, i) => (
                  <Row
                    key={seriesItem._id}
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
                              crossOrigin="anonymous"
                              src={`${BASE_URL}/image/small/${seriesItem.image}`}
                              alt={seriesItem.name}
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
                        <span className={` fw-bold`}>{seriesItem.name}</span>
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
  isAuthenticated: state.auth.isAuthenticated,
  series: state.series.selected_series,
});

export default connect(mapStateToProps, {
  getSeriesDetails,
})(SeriesDetails);
