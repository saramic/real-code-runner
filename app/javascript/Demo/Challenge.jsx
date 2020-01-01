import React, { useState, useRef } from "react";
import { Router, Link, navigate } from "@reach/router";
import { Query } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Collapse,
  FormGroup,
  Input,
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Label,
  NavLink
} from "reactstrap";
import classnames from "classnames";
import Convert from "ansi-to-html";

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

const GET_PAST_SUBMISSIONS = gql`
  query Submissions($challengeId: ID!, $externalUserIdentifier: String!) {
    submissions(
      challengeId: $challengeId
      externalUserIdentifier: $externalUserIdentifier
    ) {
      id
      result {
        output
        exitCode
        scenario {
          total
          output
        }
        step {
          total
          output
        }
      }
      status
      updatedAt
      text
      runs {
        id
        result {
          output
        }
      }
    }
  }
`;

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

const All = ({ data }) => (
  <>
    <h3>{`Challenge : ${data.challenge.title}`}</h3>
    <p>{data.challenge.description}</p>
    <ReactMarkdown source={data.challenge.metadata.readme} />
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

const Feature = ({ data, featureId }) => {
  const feature = data.challenge.features.filter(
    _feature => _feature.title === featureId
  )[0];
  return (
    <>
      <h4>{feature.title}</h4>
      <Editor height="40vh" language="ruby" value={feature.text} readOnly />
    </>
  );
};

const SubmissionUrl = () => (
  <>
    <FormGroup>
      <Label>URL</Label>
      <Input type="text" placeholder="URL of your submission" />
    </FormGroup>
    <Button color="primary">submit</Button>
  </>
);

const SubmissionText = ({ challengeId }) => {
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
};

const SubmissionFile = () => (
  <>
    <FormGroup>
      <Label>Upload File</Label>
      <Input type="file" placeholder="URL of your submission" />
    </FormGroup>
    <Button color="primary">submit</Button>
  </>
);

const PastSubmissions = ({ challengeId }) => {
  const [isOpen, setIsOpen] = useState();

  const toggle = event => {
    const submissionId = event.target.dataset.id;
    setIsOpen(isOpen === submissionId ? null : submissionId);
  };

  return (
    <Query
      query={GET_PAST_SUBMISSIONS}
      variables={{ challengeId, externalUserIdentifier: "demo_user" }}
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading ...";
        if (error) return `Error! ${challengeId} ${error.message}`;

        return (
          <>
            <h4>Past Submissions</h4>
            {data.submissions.map(submission => (
              <div key={submission.id}>
                <Button data-id={submission.id} color="link" onClick={toggle}>
                  {submission.status === "uploaded" ? (
                    <i className="fas fa-cog fa-spin" />
                  ) : (
                    <i
                      className={`fas ${
                        submission.result.exitCode === 0
                          ? "fa-check-circle"
                          : "fa-times-circle"
                      }`}
                    />
                  )}
                  &nbsp;
                  {submission.result &&
                    submission.result.scenario &&
                    [
                      ...Array(submission.result.scenario.total).keys()
                    ].map(id => <i key={id} className="far fa-star" />)}
                  {` from ${submission.updatedAt} ${submission.id.slice(0, 6)}`}
                </Button>
                <Collapse
                  data-id={submission.id}
                  isOpen={isOpen === submission.id}
                >
                  {submission.text && <div>{submission.text}</div>}
                  {submission.result && (
                    <tt>{JSON.stringify(submission.result)}</tt>
                  )}
                  {submission.runs.map(run => (
                    <React.Fragment key={run.id}>
                      <div>{`Run ${run.id.slice(0, 6)}`}</div>
                      {/* eslint-disable react/no-danger */}
                      {run.result && (
                        <tt
                          className="p-2"
                          style={{
                            display: "block",
                            color: "#ffffff",
                            background: "#131313",
                            minWidth: "1000px"
                          }}
                          dangerouslySetInnerHTML={{
                            __html: new Convert().toHtml(
                              run.result.output
                                .replace(/ {1}/gm, "&nbsp")
                                .replace(/(\r\n|\n)/gm, "<br />")
                            )
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </Collapse>
              </div>
            ))}
          </>
        );
      }}
    </Query>
  );
};

// eslint-disable-next-line no-unused-vars
const SubmissionSubNav = () => (
  <Nav tabs>
    <NavItem>
      <NavLink
        tag={Link}
        to=""
        getProps={({ isCurrent }) => {
          return {
            className: classnames({ "nav-link": true, active: isCurrent })
          };
        }}
      >
        Url
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        tag={Link}
        to="text"
        getProps={({ isCurrent }) => {
          return {
            className: classnames({ "nav-link": true, active: isCurrent })
          };
        }}
      >
        Text
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        tag={Link}
        to="file"
        getProps={({ isCurrent }) => {
          return {
            className: classnames({ "nav-link": true, active: isCurrent })
          };
        }}
      >
        File
      </NavLink>
    </NavItem>
  </Nav>
);

const Submission = ({ challengeId }) => {
  return (
    <>
      <h4>Submission</h4>
      {/* <SubmissionSubNav /> */}
      <Router>
        <SubmissionUrl path="/" />
        <SubmissionText path="text" challengeId={challengeId} />
        <SubmissionFile path="file" />
      </Router>
    </>
  );
};

const ChallengeNavigation = ({ data }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          tag={Link}
          to=""
          getProps={({ isCurrent }) => {
            return {
              className: classnames({ "nav-link": true, active: isCurrent })
            };
          }}
        >
          Challenge
        </NavLink>
      </NavItem>
      <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle nav caret>
          Features
        </DropdownToggle>
        <DropdownMenu>
          {data.challenge.features.map(feature => (
            <DropdownItem key={feature.title} header>
              <Link to={`feature/${feature.title}`} onClick={toggle}>
                {feature.title}
              </Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <NavItem>
        <NavLink
          tag={Link}
          to="submission/text"
          getProps={({ isCurrent }) => {
            return {
              className: classnames({ "nav-link": true, active: isCurrent })
            };
          }}
        >
          Submission
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={Link}
          to="past_submissions"
          getProps={({ isCurrent }) => {
            return {
              className: classnames({ "nav-link": true, active: isCurrent })
            };
          }}
        >
          Past Submissions
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default function Challenge({ challengeId }) {
  return (
    <Query query={GET_CHALLENGE} variables={{ id: challengeId }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading ...";
        if (error) return `Error! ${error.message}`;

        return (
          <>
            <ChallengeNavigation data={data} />
            <Router>
              <All path="/" data={data} />
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
