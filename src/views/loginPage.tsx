import { useState, type ChangeEvent, type FormEvent } from "react";
import { Container, Button } from "react-bootstrap";
import EmailForm from "../components/form/emailForm";
import PasswordForm from "../components/form/passwordForm";
import { useNavigate } from "react-router-dom";
import { adminLoginHandler } from "../actions/user";
import { swalError } from "../lib/swal";

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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    adminLoginHandler(data)
      .then((data) => {
        localStorage.setItem("access_token", data);
        navigate("/");
      })
      .catch((err) => {
        swalError(err.message);
      });
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <form onSubmit={onSubmit}>
        <EmailForm name="email" value={data.email} handler={onChangeHandler} />
        <PasswordForm
          name="password"
          value={data.password}
          handler={onChangeHandler}
          hide={hidePass}
          hidePasswordHandler={setHidePass}
        />
        <Button variant="primary" className="mb-0 px-5" size="lg" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
}
