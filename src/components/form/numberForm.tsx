import type { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";

export interface NumberFormProps {
  id: string;
  label: string;
  name: string;
  value: number;
  onChange: Dispatch<SetStateAction<any>>;
  placeHolder: string;
  required?: boolean;
}

export default function NumberForm({
  id,
  label,
  name,
  value,
  onChange,
  placeHolder,
  required = true,
}: NumberFormProps) {
  return (
    <div className="mb-3">
      <Form.Group className="mb-3" controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="number"
          name={name}
          value={value}
          size="lg"
          className="mb-4"
          placeholder={placeHolder}
          onChange={onChange}
          required={required}
        />
      </Form.Group>
    </div>
  );
}
