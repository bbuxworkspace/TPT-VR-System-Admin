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
import { Link } from "react-router-dom";
import styles from "./SubCatList.module.scss";
import { connect } from "react-redux";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { getCategoryList } from "../../actions/Category.action";

const SubCatList = ({ categories, getCategoryList }) => {
  const [list, setList] = useState(categories === null ? [] : categories);
  useEffect(() => {
    if (categories === null) {
      getCategoryList();
    }
    if (categories !== null) {
      setList(categories);
    }
  }, [categories]);

  const [searchText, setSearchText] = useState("");

  const searchHandeler = (text) => {
    if (text !== "") {
      setList(
        categories.filter((item) => {
          return item.name.toLowerCase().includes(text.toLowerCase());
        })
      );
    } else {
      setList(categories);
    }
    setSearchText(text);
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-between align-items-center pb-3 ">
        <div className="d-flex align-items-center w-100">
          <span className="d-block fs-4">Search Category</span>
          <Form.Control
            type="text"
            placeholder="Search category by name..."
            className={`${styles.searchInput}`}
            onChange={(e) => searchHandeler(e.target.value)}
            value={searchText}
          />
        </div>
        <div className="">
          <Link to="/category/add" className={styles.add}>
            <BsFileEarmarkPlus />
          </Link>
        </div>
      </div>
      <Card className="crd p-md-4 pb-md-0 p-2">
        <Card.Body>
          {categories === null ? (
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
                  No Category Found
                </span>
              )}
              {list !== null &&
                list.map((player, i) => (
                  <Row
                    key={player._id}
                    className={`mb-3 pb-3 ${
                      list.length - 1 === i ? "" : "border-bottom"
                    }`}
                  >
                    <Col md={11} className="">
                      <div className="">
                        <Link
                          to={`/category/${player._id}`}
                          className={` fw-bold ${styles.link}`}
                        >
                          {player.name}
                        </Link>
                      </div>
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
                      <Link
                        to={`/category/${player._id}`}
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
  categories: state.category.category,
});

export default connect(mapStateToProps, { getCategoryList })(SubCatList);
