import React from "react";
import { storiesOf } from "@storybook/react";

import { JsonToExcel } from "../component/json-to-excel";

const stories = storiesOf("JSON To Excel", module);

stories.add("App", () => {
  return (
    <JsonToExcel
      title="Download as Excel"
      data={[{ test: "test" }]}
      fileName="sample-file"
    />
  );
});
