import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./AuthorList.module.scss";
import { connect } from "react-redux";
import { BsFileEarmarkPlus, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { toast } from "react-toastify";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { deleteAuthor, getAuthorList } from "../../actions/Author.action";
import { BASE_URL } from "../../constants/URL";

const queryString = require("query-string");

const AuthorList = ({ author, getAuthorList, deleteAuthor }) => {
  const [list, setList] = useState(author === null ? [] : author);
  const modals = useModals();
  const navigate = useNavigate();

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let page = 1;

  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    if (author === null) {
      getAuthorList(page);
    }
    if (author !== null) {
      setList(author);
    }
  }, [author]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/author?page=${parseInt(i)}`}
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
        ...author,
        items: author.items.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        }),
      });
    } else {
      setList(author);
    }
    setSearchText(text);
  };

  // DELETE HANDELER
  const deleteHandeler = (id) =>
    modals.openConfirmModal({
      title: "Delete this author",
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to delete this author? This action is
          destructive and you can not undo it.
        </Text>
      ),
      labels: { confirm: "Delete Author", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => confirmHandeler(id),
    });

  // On CONFIRM DELETE
  const confirmHandeler = async (id) => {
    let check = await deleteAuthor(id);
    if (check === true) {
      toast.success("Author deleted successfully");
      navigate("/author");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search Authors</span>
          <Form.Control
            type="text"
            placeholder="Search author by name..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/author/add" className={styles.add}>
            <BsFileEarmarkPlus />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {author === null ? (
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
                  No Author Found
                </span>
              )}
              {list &&
                list.items &&
                list.items.map((authorItem, i) => (
                  <Row
                    key={authorItem._id}
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
                              crossOrigin="anonymous"
                              src={`${BASE_URL}/image/small/${authorItem.image}`}
                              alt={authorItem.name}
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
                          to={`/author/${authorItem._id}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {authorItem.name}
                        </Link>
                      </div>
                    </Col>

                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link
                        to={`/author/${authorItem._id}/edit`}
                        className={` fw-bold fs-4 ${styles.link}`}
                      >
                        <AiOutlineEdit />
                      </Link>
                      <span
                        className={`ms-3 fw-bold fs-4 ${styles.link}`}
                        onClick={() => deleteHandeler(authorItem._id)}
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
      {/* {author && (
        <Row>
          <Col className={`d-flex justify-content-end align-items-center py-4`}>
            {page !== -1 && (
              <div className="d-flex justify-content-end align-items-center">
                {parsed.page > 1 ? (
                  <Link
                    to={`/author?page=${parseInt(parsed.page) - 1}`}
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
                {author !== null && author.pageCount && author.pageCount > 0
                  ? getPages(author.pageCount)
                  : null}
                {page < author.pageCount ? (
                  <Link
                    to={`/author?page=${parseInt(parsed.page) + 1}`}
                    className={`${styles.link} ${styles.link_arrow} ${
                      styles.link_arrow
                    } ${
                      parsed.page >= author.pageCount ? styles.disabled : ""
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
      )} */}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  author: state.author.author,
});

export default connect(mapStateToProps, { getAuthorList, deleteAuthor })(
  AuthorList
);
