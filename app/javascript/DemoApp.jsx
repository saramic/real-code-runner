import React from "react";
import { Router } from "@reach/router";
import { ApolloProvider } from "react-apollo";
import { Navbar, NavbarBrand, Container, Col, Row } from "reactstrap";
import ApolloClient from "./api/ApolloClient";
import Demo from "./Demo/Demo";
import Challenge from "./Demo/Challenge";

export default function DemoApp() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/demo">Demo App</NavbarBrand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Router>
              <Demo path="demo" />
              <Challenge path="demo/challenge/:challengeId" />
            </Router>
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}
