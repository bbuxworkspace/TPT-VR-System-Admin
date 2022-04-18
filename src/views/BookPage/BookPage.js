import React from "react";
import { BookList } from "../../components/BookList";
import Layout from "../../components/shared/Layout/Layout";

const BookPage = () => {
  return (
    <div
      className="bg_dark"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      <Layout title="Books">
        <BookList />
      </Layout>
    </div>
  );
};

export default BookPage;
