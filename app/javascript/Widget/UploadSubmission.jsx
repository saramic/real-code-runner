import React from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export default function UploadSubmission({ token }) {
  const hostAndPort = window.location.href.replace(
    window.location.pathname,
    ""
  );

  return (
    <Form
      action={`${hostAndPort}/submissions`}
      method="post"
      encType="multipart/form-data"
    >
      <Input type="hidden" name="user_token" value={token} />
      <FormGroup>
        <Label>Challenge ID</Label>
        <Input type="text" name="submission[challenge_id]" />
      </FormGroup>
      <FormGroup>
        <Label>External user identifier</Label>
        <Input type="text" name="submission[external_user_identifier]" />
      </FormGroup>
      <FormGroup>
        <Label>URL</Label>
        <Input type="text" name="submission[url]" />
      </FormGroup>
      <FormGroup>
        <Label>text</Label>
        <Input type="text" name="submission[text]" />
      </FormGroup>
      <FormGroup>
        <Label>file</Label>
        <Input type="file" name="submission[file]" />
      </FormGroup>
      <Button color="primary">submit</Button>
    </Form>
  );
}
