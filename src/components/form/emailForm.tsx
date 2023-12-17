import type { SetStateAction, Dispatch } from "react";
import { Form } from "react-bootstrap";

export interface EmailFormProps {
  value: string;
  name: string;
  handler: Dispatch<SetStateAction<any>>;
  placeholder?: string;
}

export default function EmailForm({
  value,
  name,
  handler,
  placeholder = "name@example.com",
}: EmailFormProps) {
  return (
    <Form.Group className="mb-3" controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handler}
        size="lg"
        className="mb-4"
      />
    </Form.Group>
  );
}
