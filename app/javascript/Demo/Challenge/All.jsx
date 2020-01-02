import React from "react";
import ReactMarkdown from "react-markdown";

export default function All({ data }) {
  return (
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
}
