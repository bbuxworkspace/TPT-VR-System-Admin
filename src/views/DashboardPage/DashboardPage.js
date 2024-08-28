import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getDashboardData } from "../../actions/Dashboard.action";
import Layout from "../../components/shared/Layout/Layout";
import StatCard from "../../components/shared/StatCard/StatCard";
import { BsArrowLeft, BsPencil, BsPrinter } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BiBook, BiSquare } from "react-icons/bi";

const DashboardPage = ({ data, getDashboardData }) => {
  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);
  return (
    <Layout title="Dashboard">
      {data === null ? (
        <Spinner animation="grow" variant="dark" />
      ) : (
        <Row className="pt-">

          <Col md={3} className="py-3">
            <StatCard title="Tiles" icon={<BiSquare />} count={data.tileCount == 0 ? '0' : data.tileCount} />
          </Col>
        
          <Col md={3} className="py-3">
            <StatCard title="Users" icon={<FiUsers />} count={data.userCount == 0 ? '0' : data.userCount} />
          </Col>



          <Col md={12} className="py-3">
            <h2>Shortcuts</h2>
          </Col>
          <Col md={4} className="py-3">
            <StatCard
              title="Add Tile"
              icon={<BsArrowLeft />}
              link="/tile/add"
            />
          </Col>
        </Row>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  data: state.auth.dashboard,
});

export default connect(mapStateToProps, { getDashboardData })(DashboardPage);
