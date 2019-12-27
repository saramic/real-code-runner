import React from "react";
import { Router, Link } from "@reach/router";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Challenge from "./Challenge";

const GET_CHALLENGES = gql`
  query Challenges {
    challenges {
      id
      title
      description
    }
  }
`;

const Challenges = ({ data }) => (
  <>
    <h3>Challenges</h3>
    {data.challenges.map(challenge => (
      <div key={challenge.id}>
        <h3>
          <Link to={`/demo/challenge/${challenge.id}`}>{challenge.title}</Link>
        </h3>
        <p>{challenge.description}</p>
      </div>
    ))}
  </>
);

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
