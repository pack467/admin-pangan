import { useState, type ChangeEvent, type FormEvent } from "react";
import { Container, Button, Form } from "react-bootstrap";
import EmailForm from "../components/form/emailForm";
import PasswordForm from "../components/form/passwordForm";
import { useNavigate } from "react-router-dom";
import { adminLoginHandler } from "../actions/user";
import { swalError } from "../lib/swal";
import LoadingWrapper from "../components/loaders/loadingOverlay";

export type state = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<state>({
    email: "",
    password: "",
  });
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    adminLoginHandler(data)
      .then((data) => {
        localStorage.setItem("access_token", data);
        navigate("/");
      })
      .catch((err) => {
        swalError(err?.message || 'Internal Server Error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoadingWrapper active={loading}>
      <Container fluid className="p-3 my-5 h-custom">
        <Form onSubmit={onSubmit}>
          <EmailForm
            name="email"
            value={data.email}
            handler={onChangeHandler}
          />
          <PasswordForm
            name="password"
            value={data.password}
            handler={onChangeHandler}
            hide={hidePass}
            hidePasswordHandler={setHidePass}
          />
          <Button
            variant="primary"
            className="mb-0 px-5"
            size="lg"
            type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </LoadingWrapper>
  );
}
