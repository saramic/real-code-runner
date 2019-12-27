import React from "react";
import ReactDOM from "react-dom";
import UploadChallenge from "Widget/UploadChallenge";
import UploadSubmission from "Widget/UploadSubmission";

const render = node => {
  const componentsMap = new Map([
    ["UploadChallenge", UploadChallenge],
    ["UploadSubmission", UploadSubmission]
  ]);
  const DynamicComponent = componentsMap.get(
    node.dataset.widgetType.split("-")[1]
  );
  try {
    if (node) {
      ReactDOM.render(
        <DynamicComponent />,
        node.appendChild(document.createElement("div"))
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

Array.from(
  document.querySelectorAll('[data-widget-type|="rcp"]').forEach(node => {
    render(node);
  })
);
