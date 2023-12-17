import type { SetStateAction, Dispatch } from "react";
import { Form } from "react-bootstrap";

export interface PasswordFormProps {
  value: string;
  name: string;
  handler: Dispatch<SetStateAction<any>>;
  placeholder?: string;
  hide?: boolean;
  hidePasswordHandler: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordForm({
  value,
  name,
  handler,
  placeholder,
  hide,
  hidePasswordHandler,
}: PasswordFormProps) {
  return (
    <Form.Group className="mb-3" controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type={hide ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handler}
        size="lg"
        className="mb-4"
      />
      <span
        onClick={() => {
          hidePasswordHandler((prev) => !prev);
        }}
      >
        {hide ? "See Password" : "Hide Password"}
      </span>
    </Form.Group>
  );
}
