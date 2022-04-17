import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./PublisherList.module.scss";
import { connect } from "react-redux";
import { BsFileEarmarkPlus, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { toast } from "react-toastify";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { BASE_URL } from "../../constants/URL";
import {
  deletePublisher,
  getPublisherList,
} from "../../actions/Publisher.action";

const queryString = require("query-string");

const PublisherList = ({ publisher, getPublisherList, deletePublisher }) => {
  const [list, setList] = useState(publisher === null ? [] : publisher);
  const modals = useModals();
  const navigate = useNavigate();

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let page = 1;

  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    if (publisher === null) {
      getPublisherList(page);
    }
    if (publisher !== null) {
      setList(publisher);
    }
  }, [publisher]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/publisher?page=${parseInt(i)}`}
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
        ...publisher,
        items: publisher.items.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        }),
      });
    } else {
      setList(publisher);
    }
    setSearchText(text);
  };

  // DELETE HANDELER
  const deleteHandeler = (id) =>
    modals.openConfirmModal({
      title: "Delete this publisher",
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to delete this publisher? This action is
          destructive and you can not undo it.
        </Text>
      ),
      labels: { confirm: "Delete publisher", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => confirmHandeler(id),
    });

  // On CONFIRM DELETE
  const confirmHandeler = async (id) => {
    let check = await deletePublisher(id);
    if (check === true) {
      toast.success("publisher deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search publisher</span>
          <Form.Control
            type="text"
            placeholder="Search publisher by name..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/publisher/add" className={styles.add}>
            <BsFileEarmarkPlus />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {publisher === null ? (
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
                  No publisher Found
                </span>
              )}
              {list &&
                list.items &&
                list.items.map((publisherItem, i) => (
                  <Row
                    key={publisherItem._id}
                    className={`mb-3 pb-3 ${
                      list.items.length - 1 === i ? "" : "border-bottom"
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
                              crossorigin="anonymous"
                              src={`${BASE_URL}/image/small/${publisherItem.image}`}
                              alt={publisherItem.name}
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
                    <Col md={9} className="">
                      <div className="d-flex align-items-center h-100">
                        <Link
                          to={`/publisher/${publisherItem._id}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {publisherItem.name}
                        </Link>
                      </div>
                    </Col>

                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link
                        to={`/publisher/${publisherItem._id}/edit`}
                        className={` fw-bold fs-4 ${styles.link}`}
                      >
                        <AiOutlineEdit />
                      </Link>
                      <span
                        className={`ms-3 fw-bold fs-4 ${styles.link}`}
                        onClick={() => deleteHandeler(publisherItem._id)}
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
      {publisher && publisher.pageCount && (
        <Row>
          <Col className={`d-flex justify-content-end align-items-center py-4`}>
            {page !== -1 && (
              <div className="d-flex justify-content-end align-items-center">
                {parsed.page > 1 ? (
                  <Link
                    to={`/publisher?page=${parseInt(parsed.page) - 1}`}
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
                {publisher !== null &&
                publisher.pageCount &&
                publisher.pageCount > 0
                  ? getPages(publisher.pageCount)
                  : null}
                {page < publisher.pageCount ? (
                  <Link
                    to={`/publisher?page=${parseInt(parsed.page) + 1}`}
                    className={`${styles.link} ${styles.link_arrow} ${
                      styles.link_arrow
                    } ${
                      parsed.page >= publisher.pageCount ? styles.disabled : ""
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
  publisher: state.publisher.publisher,
});

export default connect(mapStateToProps, { getPublisherList, deletePublisher })(
  PublisherList
);
