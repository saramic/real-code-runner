import React from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

export default function Url() {
  return (
    <>
      <FormGroup>
        <Label>URL</Label>
        <Input type="text" placeholder="URL of your submission" />
      </FormGroup>
      <Button color="primary">submit</Button>
    </>
  );
}
