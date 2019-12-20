import React from "react";
import { Link } from "@reach/router";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

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
        if (error) return `Error! ${error.message}`;

        return (
          <>
            <h1>Demo App</h1>
            <h3>Challenges</h3>
            {data.challenges.map(challenge => (
              <div key={challenge.id}>
                <h3>
                  <Link to={`/demo/challenge/${challenge.id}`}>
                    {challenge.title}
                  </Link>
                </h3>
                <p>{challenge.description}</p>
              </div>
            ))}
          </>
        );
      }}
    </Query>
  );
}
