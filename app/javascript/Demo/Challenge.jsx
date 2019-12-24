import React, { useState } from "react";
import { Router, Link } from "@reach/router";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink
} from "reactstrap";
import classnames from "classnames";

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

const All = ({ data }) => (
  <>
    <h3>{`Challenge : ${data.challenge.title}`}</h3>
    <p>{data.challenge.description}</p>
    {data.challenge.featureFileUrls.map(featureFile => (
      <React.Fragment key={featureFile.filename}>
        <h4>{featureFile.filename}</h4>
        <pre>{featureFile.text}</pre>
      </React.Fragment>
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

const Readme = ({ metadata }) => (
  <>
    <h4>README.md</h4>
    <ReactMarkdown source={metadata.readme} />
  </>
);

const Submission = () => {
  const [submissionText] = useState("<html>\n</html>");
  return (
    <>
      <h4>Submission</h4>
      <Editor height="40vh" language="ruby" value={submissionText} readOnly />
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
      <NavItem>
        <NavLink
          tag={Link}
          to="readme"
          getProps={({ isCurrent }) => {
            return {
              className: classnames({ "nav-link": true, active: isCurrent })
            };
          }}
        >
          Readme
        </NavLink>
      </NavItem>
      <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle nav caret>
          Features
        </DropdownToggle>
        <DropdownMenu>
          {data.challenge.features.map(feature => (
            <DropdownItem key={feature.title} header>
              <Link to={`feature/${feature.title}`}>{feature.title}</Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <NavItem>
        <NavLink
          tag={Link}
          to="submission"
          getProps={({ isCurrent }) => {
            return {
              className: classnames({ "nav-link": true, active: isCurrent })
            };
          }}
        >
          Submission
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
              <Readme path="readme" metadata={data.challenge.metadata} />
              <Submission
                path="submission"
                metadata={data.challenge.metadata}
              />
              <Feature path="feature/:featureId" data={data} />
            </Router>
          </>
        );
      }}
    </Query>
  );
}
