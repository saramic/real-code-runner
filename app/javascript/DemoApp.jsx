import React from "react";
import { Router } from "@reach/router";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "./api/ApolloClient";
import Demo from "./Demo/Demo";
import Challenge from "./Demo/Challenge";

export default function DemoApp() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Router>
        <Demo path="demo" />
        <Challenge path="demo/challenge/:challengeId" />
      </Router>
    </ApolloProvider>
  );
}
