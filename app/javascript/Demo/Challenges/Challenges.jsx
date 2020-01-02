import React from "react";
import { Link } from "@reach/router";

export default function Challenges({ data }) {
  return (
    <>
      <h3>Challenges</h3>
      {data.challenges.map(challenge => (
        <div key={challenge.id}>
          <h3>
            <Link to={`/demo/challenge/${challenge.id}`}>
              {challenge.title}
            </Link>
          </h3>
          <p>{challenge.description}</p>
        </div>
      ))}
    </>
  );
}
