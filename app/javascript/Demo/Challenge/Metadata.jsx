import React from "react";

export default function Metadata({ data }) {
  return (
    <>
      <pre>{JSON.stringify(data.challenge.metadata.metadata, null, 2)}</pre>
    </>
  );
}
