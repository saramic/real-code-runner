import React from "react";
import { Router } from "@reach/router";
import Url from "./Url";
import Text from "./Text";
import File from "./File";
// import Navigation from "./Navigation";

export default function Submission({ challengeId }) {
  return (
    <>
      <h4>Submission</h4>
      {/* <Navigation /> */}
      <Router>
        <Url path="/" />
        <Text path="text" challengeId={challengeId} />
        <File path="file" />
      </Router>
    </>
  );
}
