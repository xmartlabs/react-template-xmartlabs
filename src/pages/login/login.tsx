import { useState } from "react";

import { Button } from "common/button";
import { TextField } from "common/text-field";
import styles from "./login.module.scss";
import { login } from "networking/controllers/users";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const formValid = !!email && !!password;

  const handleSignIn = async () => {
    try {
      await login(email, password);
      navigate(`/`);
    } catch (err) {
      setError(true);
    }
  };
  const doLogin = () => {
    handleSignIn().catch(() => {
      setError(true);
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <TextField
          className={styles.field}
          label="Email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          className={styles.field}
          label="Password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error && <p className={styles.error}>Incorrect email or password.</p>}
        <Button
          className={styles.submitButton}
          disabled={!formValid}
          onClick={doLogin}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
