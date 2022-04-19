import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./BookList.module.scss";
import { connect } from "react-redux";
import { BsFileEarmarkPlus, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { toast } from "react-toastify";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { BASE_URL } from "../../constants/URL";
import { deletebook, getBookList } from "../../actions/Book.action";

const queryString = require("query-string");

const BookList = ({ book, getBookList, deletebook }) => {
  const [list, setList] = useState(book === null ? [] : book);
  const modals = useModals();
  const navigate = useNavigate();

  const location = useLocation();
  const parsed = queryString.parse(location.search);
  let page = 1;

  useEffect(() => {
    if (parsed.page) {
      page = parsed.page;
    }
    if (book === null) {
      getBookList(page);
    }
    if (book !== null) {
      setList(book);
    }
  }, [book]);

  const getPages = (totalPage) => {
    let pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <Link
          to={`/books?page=${parseInt(i)}`}
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
        ...book,
        items: book.items.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        }),
      });
    } else {
      setList(book);
    }
    setSearchText(text);
  };

  // DELETE HANDELER
  const deleteHandeler = (id) =>
    modals.openConfirmModal({
      title: "Delete this book",
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to delete this book? This action is destructive
          and you can not undo it.
        </Text>
      ),
      labels: { confirm: "Delete book", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => confirmHandeler(id),
    });

  // On CONFIRM DELETE
  const confirmHandeler = async (id) => {
    let check = await deletebook(id);
    if (check === true) {
      toast.success("book deleted successfully");
      navigate("/books");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search book</span>
          <Form.Control
            type="text"
            placeholder="Search book by name..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/books/add" className={styles.add}>
            <BsFileEarmarkPlus />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {book === null ? (
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
                  No book Found
                </span>
              )}
              {list &&
                list.items &&
                list.items.map((bookItem, i) => (
                  <Row
                    key={bookItem._id}
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
                    <Col md={9} className="">
                      <div className="d-flex align-items-center h-100">
                        <Link
                          to={`/books/${bookItem._id}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {bookItem.name}
                        </Link>
                      </div>
                    </Col>

                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Link
                        to={`/books/${bookItem._id}/edit`}
                        className={` fw-bold fs-4 ${styles.link}`}
                      >
                        <AiOutlineEdit />
                      </Link>
                      <span
                        className={`ms-3 fw-bold fs-4 ${styles.link}`}
                        onClick={() => deleteHandeler(bookItem._id)}
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
      {book && (
        <Row>
          <Col className={`d-flex justify-content-end align-items-center py-4`}>
            {page !== -1 && (
              <div className="d-flex justify-content-end align-items-center">
                {parsed.page > 1 ? (
                  <Link
                    to={`/books?page=${parseInt(parsed.page) - 1}`}
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
                {book !== null && book.pageCount && book.pageCount > 0
                  ? getPages(book.pageCount)
                  : null}
                {page < book.pageCount ? (
                  <Link
                    to={`/books?page=${parseInt(parsed.page) + 1}`}
                    className={`${styles.link} ${styles.link_arrow} ${
                      styles.link_arrow
                    } ${parsed.page >= book.pageCount ? styles.disabled : ""}`}
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
  book: state.book.book,
});

export default connect(mapStateToProps, { getBookList, deletebook })(BookList);
