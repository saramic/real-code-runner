import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function UploadChallenge() {
  return (
    <Form action="/admin/challenges" method="post">
      <FormGroup>
        <Label>Title</Label>
        <Input type="text" name="challenge[title]" />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input type="text" name="challenge[description]" />
      </FormGroup>
      <FormGroup>
        <Label>Test case</Label>
        <Input type="file" name="challenge[test_case]" />
      </FormGroup>
      <Button color="primary">upload</Button>
    </Form>
  );
}
