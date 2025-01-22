import { useState } from "react";

import { Button } from "common/button";
import { TextField } from "common/text-field";
import styles from "./login.module.scss";
import { login } from "networking/controllers/users";
import { useNavigate } from "react-router-dom";
import { useGoToPage } from "hooks/use-go-to-page";
import { RouteName } from "routes";

export const Login = () => {
  const goToPage = useGoToPage();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const formValid = !!email && !!password;

  const handleSignIn = async () => {
    try {
      await login(email, password);
      goToPage(RouteName.Home);
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
