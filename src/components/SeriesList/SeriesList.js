import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./SeriesList.module.scss";
import { connect } from "react-redux";
import { BsFileEarmarkPlus, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { toast } from "react-toastify";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { deleteSeries, getSeriesList } from "../../actions/Series.action";

const queryString = require("query-string");

const SeriesList = ({ series, getSeriesList, deleteSeries }) => {
  const [list, setList] = useState(series === null ? [] : series);
  const modals = useModals();
  const navigate = useNavigate();

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let page = 1;

  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    if (series === null) {
      getSeriesList(page);
    }
    if (series !== null) {
      setList(series);
    }
  }, [series]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/series?page=${parseInt(i)}`}
          key={i}
          className={`${styles.link} ${
            (!parsed.page && i == 1) || parsed.page == i
              ? `${styles.disabled} ${styles.active}`
              : ""
          } `}
        >
          <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
            {i}
          </span>
        </Link>
      );
    }

    return pages;
  };

  const [searchText, setSearchText] = useState("");

  const searchHandeler = (text) => {
    if (text !== "") {
      setList({
        ...series,
        items: series.items.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        }),
      });
    } else {
      setList(series);
    }
    setSearchText(text);
  };

  // DELETE HANDELER
  const deleteHandeler = (id) =>
    modals.openConfirmModal({
      title: "Delete this series",
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to delete this series? This action is
          destructive and you can not undo it.
        </Text>
      ),
      labels: { confirm: "Delete series", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => confirmHandeler(id),
    });

  // On CONFIRM DELETE
  const confirmHandeler = async (id) => {
    let check = await deleteSeries(id);
    if (check === true) {
      toast.success("series deleted successfully");
      navigate("/series");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search series</span>
          <Form.Control
            type="text"
            placeholder="Search series by name on this page..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/series/add" className={styles.add}>
            <BsFileEarmarkPlus />
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
              {list && list.items && list.items.length === 0 && (
                <span className="d-block text-center fs-4 lead pb-4">
                  No Series Found
                </span>
              )}
              {list &&
                list.items &&
                list.items.map((seriesItem, i) => (
                  <Row
                    key={seriesItem._id}
                    className={`mb-3 pb-3 ${
                      list.items.length - 1 === i ? "" : "border-bottom"
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
                    <Col md={10} className="">
                      <div className="d-flex align-items-center h-100">
                        <Link
                          to={`/series/${seriesItem._id}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {seriesItem.name}
                        </Link>
                      </div>
                    </Col>

                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link
                        to={`/series/${seriesItem._id}/edit`}
                        className={` fw-bold fs-4 ${styles.link}`}
                      >
                        <AiOutlineEdit />
                      </Link>
                      <span
                        className={`ms-3 fw-bold fs-4 ${styles.link}`}
                        onClick={() => deleteHandeler(seriesItem._id)}
                      >
                        <BsTrash className="text-danger" />
                      </span>
                    </Col>
                  </Row>
                ))}
            </>
          )}
        </Card.Body>
      </Card>

      {/* PAGINATION */}
      {series && (
        <Row>
          <Col className={`d-flex justify-content-end align-items-center py-4`}>
            {page !== -1 && (
              <div className="d-flex justify-content-end align-items-center">
                {parsed.page > 1 ? (
                  <Link
                    to={`/series?page=${parseInt(parsed.page) - 1}`}
                    className={`${styles.link} ${
                      parsed.page === 1 ? styles.disabled : ""
                    } ${styles.link_arrow}`}
                  >
                    <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                      <AiOutlineLeft />
                    </span>
                  </Link>
                ) : (
                  <span
                    className={`${styles.link} ${styles.disabled} ${styles.link_arrow}`}
                  >
                    <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                      <AiOutlineLeft />
                    </span>
                  </span>
                )}
                {series !== null && series.pageCount && series.pageCount > 0
                  ? getPages(series.pageCount)
                  : null}
                {page < series.pageCount ? (
                  <Link
                    to={`/series?page=${parseInt(parsed.page) + 1}`}
                    className={`${styles.link} ${styles.link_arrow} ${
                      styles.link_arrow
                    } ${
                      parsed.page >= series.pageCount ? styles.disabled : ""
                    }`}
                  >
                    <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                      <AiOutlineRight />
                    </span>
                  </Link>
                ) : (
                  <span
                    className={`${styles.link} ${styles.disabled} ${styles.link_arrow}`}
                  >
                    <span className="fw-light fs-3 d-flex justify-content-center align-items-center">
                      <AiOutlineRight />
                    </span>
                  </span>
                )}
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  series: state.series.series,
});

export default connect(mapStateToProps, { getSeriesList, deleteSeries })(
  SeriesList
);
