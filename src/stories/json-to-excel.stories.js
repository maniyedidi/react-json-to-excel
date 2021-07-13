// import React from "react";
import { storiesOf } from "@storybook/react";

import { JsonToExcel } from "../component/json-to-excel";

const stories = storiesOf("JSON To Excel", module);

stories.add("App", () => {
  const data1 = [
    { label: "C" },
    { label: "Java" },
    { label: "Go" },
    { label: "Javascript" },
    { label: "HTML" },
    { label: "CSS" },
    { label: "REACT" },
    { label: "JQUERY" }
  ];
  const samplejson2 = [
    { name: "name01", age: "20", sex: "M" },
    { name: "name02", age: "22", sex: "F" },
    { name: "name03", age: "20", sex: "M" }
  ];
  return (
    <>
      <JsonToExcel
        title="Download as Excel"
        data={data1}
        fileName="sample-file"
        btnClassName="custom-class"
      />
      <br></br>
      <JsonToExcel
        title="Download as Excel color"
        data={samplejson2}
        fileName="sample-file"
        btnColor="red"
      />
    </>
  );
});
