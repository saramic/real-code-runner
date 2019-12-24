import React from "react";
import { ApolloProvider } from "react-apollo";
import { Navbar, NavbarBrand, Container, Col, Row } from "reactstrap";
import ApolloClient from "./api/ApolloClient";
import Demo from "./Demo/Demo";

export default function DemoApp() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/demo">Demo App</NavbarBrand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Demo />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}
