import React from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

export default function File() {
  return (
    <>
      <FormGroup>
        <Label>Upload File</Label>
        <Input type="file" placeholder="URL of your submission" />
      </FormGroup>
      <Button color="primary">submit</Button>
    </>
  );
}
