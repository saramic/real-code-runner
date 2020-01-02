import React from "react";
import { Router } from "@reach/router";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Challenges from "./Challenges/Challenges";
import Challenge from "./Challenge/Challenge";

const GET_CHALLENGES = gql`
  query Challenges {
    challenges {
      id
      title
      description
    }
  }
`;

export default function Demo() {
  return (
    <Query query={GET_CHALLENGES}>
      {({ loading, error, data }) => {
        if (loading) return "Loading ...";
        if (
          error &&
          error.networkError &&
          error.networkError.statusCode === 401
        )
          window.location.assign(
            `/users/sign_in?redirect_to=${window.location.pathname}`
          );
        if (error) return `Error! ${error.message}`;

        return (
          <Router>
            <Challenges path="demo" data={data} />
            <Challenge path="demo/challenge/:challengeId/*" />
          </Router>
        );
      }}
    </Query>
  );
}
