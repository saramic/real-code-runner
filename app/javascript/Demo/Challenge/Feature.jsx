import React from "react";
import Editor from "@monaco-editor/react";

export default function Feature({ data, featureId }) {
  const feature = data.challenge.features.filter(
    _feature => _feature.title === featureId
  )[0];

  return (
    <>
      <h4>{feature.title}</h4>
      <Editor height="40vh" language="ruby" value={feature.text} readOnly />
    </>
  );
}
