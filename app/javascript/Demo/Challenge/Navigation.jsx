import React, { useState } from "react";
import { Link } from "@reach/router";
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

export default function Navigation({ data }) {
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
}
