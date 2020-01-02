import React, { useState, useRef } from "react";
import { navigate } from "@reach/router";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Button, FormGroup, Label } from "reactstrap";
import Editor from "@monaco-editor/react";

const ADD_SUBMISSION = gql`
  mutation AddSubmission(
    $challengeId: ID!
    $externalUserIdentifier: String!
    $text: String!
  ) {
    addSubmission(
      challengeId: $challengeId
      externalUserIdentifier: $externalUserIdentifier
      text: $text
    ) {
      submission {
        id
      }
    }
  }
`;

export default function Text({ challengeId }) {
  const [submissionText] = useState("<html>\n</html>");
  // eslint-disable-next-line no-unused-vars
  const [_isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const [
    addSubmission,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_SUBMISSION, {
    onCompleted: ({
      addSubmission: {
        submission: { id }
      }
    }) => navigate(`../past_submissions?id=${id}`)
  });

  const handleEditorDidMount = _valueGetter => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  return (
    <>
      <FormGroup>
        <Label>Text solution</Label>
        <Editor
          height="40vh"
          language="html"
          value={submissionText}
          editorDidMount={handleEditorDidMount}
        />
      </FormGroup>
      <Button
        color="primary"
        onClick={event => {
          event.preventDefault();
          addSubmission({
            variables: {
              challengeId,
              externalUserIdentifier: "demo_user",
              text: valueGetter.current()
            }
          });
        }}
      >
        submit
      </Button>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </>
  );
}
