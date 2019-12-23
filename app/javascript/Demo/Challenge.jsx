import React from "react";
import { Link } from "@reach/router";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";

const GET_CHALLENGE = gql`
  query Challenge($id: ID!) {
    challenge(id: $id) {
      title
      description
      metadata {
        readme
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
            <Link to="/demo">Home</Link>
            <h3>{`Challenge : ${data.challenge.title}`}</h3>
            <p>{data.challenge.description}</p>
            <h4>README.md</h4>
            <ReactMarkdown source={data.challenge.metadata.readme} />
            {data.challenge.features.map(feature => (
              <>
                <h4>{feature.title}</h4>
                <Editor
                  height="40vh"
                  language="ruby"
                  value={feature.text}
                  readOnly
                />
              </>
            ))}
            {data.challenge.featureFileUrls.map(featureFile => (
              <>
                <h4>{featureFile.filename}</h4>
                <pre>{featureFile.text}</pre>
              </>
            ))}
            {data.challenge.helperImageUrls.map(helperImageUrl => (
              <img
                width="100px"
                key={helperImageUrl.url}
                src={helperImageUrl.url}
                alt={helperImageUrl.filename}
              />
            ))}
          </>
        );
      }}
    </Query>
  );
}
