import React from "react";
import { Router } from "@reach/router";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Navigation from "./Navigation";
import Submission from "./Submission/Submission";
import PastSubmissions from "./Submission/PastSubmissions";
import All from "./All";
import Feature from "./Feature";
import Metadata from "./Metadata";

const GET_CHALLENGE = gql`
  query Challenge($id: ID!) {
    challenge(id: $id) {
      title
      description
      metadata {
        readme
        metadata {
          id
          uri
          line
          name
          keyword
          description
          elements {
            id
            line
            name
            keyword
            description
            steps {
              line
              name
              keyword
              hints
              helperImages
            }
          }
        }
      }
      features {
        title
        text
      }
      featureFileUrls {
        filename
        url
      }
      helperImageUrls {
        filename
        url
      }
    }
  }
`;

export default function Challenge({ challengeId }) {
  return (
    <Query query={GET_CHALLENGE} variables={{ id: challengeId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading ...";
        if (error) return `Error! ${error.message}`;

        return (
          <>
            <Navigation data={data} />
            <Router>
              <All path="/" data={data} />
              <Metadata path="/metadata" data={data} />
              <Feature path="feature/:featureId" data={data} />
              <Submission
                path="submission/*"
                metadata={data.challenge.metadata}
                challengeId={challengeId}
              />
              <PastSubmissions
                path="past_submissions/*"
                metadata={data.challenge.metadata}
                challengeId={challengeId}
              />
            </Router>
          </>
        );
      }}
    </Query>
  );
}
