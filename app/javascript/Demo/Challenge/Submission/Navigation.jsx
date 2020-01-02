import React from "react";
import { Link } from "@reach/router";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

export default function Navigation() {
  // eslint-disable-next-line no-unused-vars
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
}
