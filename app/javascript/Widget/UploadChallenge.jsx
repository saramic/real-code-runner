import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function UploadChallenge({ token }) {
  const hostAndPort = window.location.href.replace(
    window.location.pathname,
    ""
  );

  return (
    <Form
      action={`${hostAndPort}/challenges`}
      method="post"
      encType="multipart/form-data"
    >
      <Input type="hidden" name="user_token" value={token} />
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
