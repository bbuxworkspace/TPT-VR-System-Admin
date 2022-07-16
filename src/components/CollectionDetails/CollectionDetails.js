import React, { useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Spinner,
  Button,
} from "react-bootstrap";
import styles from "./CollectionDetails.module.scss";
import { connect } from "react-redux";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BASE_URL } from "../../constants/URL";
import {
  addBookToCollection,
  getCollectionDetails,
  removeBookToCollection,
} from "../../actions/Collection.action";
import { useModals } from "@mantine/modals";
import { getBookList } from "../../actions/Book.action";
import { Select, Text } from "@mantine/core";
import { BsTrash } from "react-icons/bs";

const CollectionDetails = ({
  book,
  collection,
  getCollectionDetails,
  id,
  addBookToCollection,
  removeBookToCollection,
  getBookList,
}) => {
  useEffect(() => {
    getCollectionDetails(id);
    if (book === null) {
      getBookList();
    }
  }, [id]);
  const modals = useModals();

  const newHandeler = () => {
    modals.openModal({
      title: "Add Book",
      closeOnClickOutside: false,
      centered: true,
      children: (
        <>
          <form onSubmit={handelAddToCollection}>
            <FormGroup className="mb-3">
              <Form.Label>Search the book you want to add...</Form.Label>
              <Select
                placeholder="Book Name..."
                searchable
                nothingFound="Not Found..."
                data={book.items.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />
            </FormGroup>
            <Button type="submit" className="btn_primary">
              Submit
            </Button>
          </form>
        </>
      ),
    });
  };

  const handelAddToCollection = async (e) => {
    e.preventDefault();
    let bookInput = e.target.elements[0].value;
    await addBookToCollection(bookInput, id);

    modals.closeAll();
  };

  const deleteHandeler = (bookIdToRemove) => {
    modals.openConfirmModal({
      title: `Remove this book from collection`,
      centered: true,
      children: (
        <Text size="md">
          Are you sure you want to remove this book from collection?
        </Text>
      ),
      labels: { confirm: "Remove book", cancel: "No don't remove it" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => removeBookToCollection(bookIdToRemove, id),
    });
  };

  return (
    <Container className="pb-4">
      <div className="d-flex justify-content-end align-items-center pb-3 ">
        <div className="text-right">
          <span className={styles.add} onClick={() => newHandeler()}>
            <AiOutlineFileAdd />
          </span>
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
              {collection &&
                collection.books &&
                collection.books.length === 0 && (
                  <span className="d-block text-center fs-4 lead pb-4">
                    No Book Found!
                  </span>
                )}
              {collection !== null &&
                collection.books &&
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
                    <Col md={9} className="">
                      <div className="d-flex align-items-center h-100">
                        <span className={` fw-bold`}>{bookItem.name}</span>
                      </div>
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-center"
                    >
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
    </Container>
  );
};

const mapStateToProps = (state) => ({
  collection: state.collection.collection,
  book: state.book.book,
});

export default connect(mapStateToProps, {
  getCollectionDetails,
  addBookToCollection,
  removeBookToCollection,
  getBookList,
})(CollectionDetails);
