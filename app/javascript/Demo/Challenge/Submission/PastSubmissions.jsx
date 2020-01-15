import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Badge, Button, Collapse } from "reactstrap";
import Convert from "ansi-to-html";

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
          failed
          skipped
          pending
          passed
          output
        }
        step {
          total
          failed
          skipped
          pending
          passed
          output
        }
        elapsedTime
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

const StatusBadge = ({ text }) => {
  let args = {};

  switch (text) {
    case "success":
      args = { color: "success", text: "success", icon: "fa-check-circle" };
      break;
    case "processing":
      args = { color: "primary", text: "processing", icon: "fa-cog fa-spin" };
      break;
    default:
      args = { color: "danger", text: "failed", icon: "fa-times-circle" };
      break;
  }

  return (
    <Badge
      className="p-1"
      color={args.color}
      pill
      style={{
        textTransform: "uppercase",
        minWidth: "100px",
        textAlign: "left"
      }}
    >
      <i className={`fas ${args.icon}`} />
      {` ${args.text}`}
    </Badge>
  );
};

const Stars = ({ scenario }) => {
  return [
    [...Array(scenario.passed).keys()].map(id => (
      <i key={id} className="fas fa-star" />
    )),
    [...Array(scenario.total - scenario.passed).keys()].map(id => (
      <i key={id} className="far fa-star" />
    ))
  ];
};

export default function PastSubmissions({ challengeId }) {
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
                  {submission.status === "uploaded" && (
                    <StatusBadge text="processing" />
                  )}
                  {submission.result && submission.result.exitCode === 0 && (
                    <StatusBadge text="success" />
                  )}
                  {submission.result && submission.result.exitCode !== 0 && (
                    <StatusBadge text="failed" />
                  )}
                  &nbsp;
                  {submission.result && (
                    <Stars scenario={submission.result.scenario} />
                  )}
                  &nbsp;
                  {submission.result && `in ${submission.result.elapsedTime}`}
                  &nbsp;
                  {`at ${submission.updatedAt}`}
                  &nbsp;
                  {`id ${submission.id.slice(0, 6)}`}
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
}
