import { TextField } from "common/text-field";
import styles from "./sign-up.module.scss";
import { useState } from "react";
import { Button } from "common/button";
import { signUp } from "networking/controllers/users";
import { useNavigate } from "react-router-dom";
import { ErrorStatus, type ApiError } from "networking/api-error";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const formValid =
    !!name && !!email && !!password && password === repeatPassword;

  const handleSignUp = async () => {
    try {
      await signUp(email, password, name);
      navigate("/");
    } catch (e) {
      const err = e as ApiError;
      if (err.code === ErrorStatus.PreconditionFailed) {
        setUserAlreadyExists(true);
      } else {
        setError(true);
      }
    }
  };
  const doSignUp = () => {
    handleSignUp().catch(() => {
      setError(true);
    });
  };
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <TextField
          className={styles.field}
          label="Name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          onBlur={() => {
            if (repeatPassword && password !== repeatPassword) {
              setPasswordError(true);
            } else {
              setPasswordError(false);
            }
          }}
        />
        <TextField
          className={styles.field}
          label="Repeat Password"
          name="Repeat password"
          type="password"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
          onBlur={() => {
            if (password !== repeatPassword) {
              setPasswordError(true);
            } else {
              setPasswordError(false);
            }
          }}
        />
        {error && (
          <p className={styles.error}>
            Something went wrong. Please try again.
          </p>
        )}
        {passwordError && (
          <p className={styles.error}>Passwords do not match.</p>
        )}
        {userAlreadyExists && (
          <p className={styles.error}>A user with that email already exists.</p>
        )}
        <Button
          className={styles.submitButton}
          disabled={!formValid}
          onClick={doSignUp}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export { SignUp };
