import { TextField } from "common/text-field";
import styles from "./reset-password.module.scss";
import { useState } from "react";
import { Button } from "common/button";
import { resetPassword } from "networking/controllers/users";
import { useNavigate } from "react-router-dom";
import { ErrorStatus, type ApiError } from "networking/api-error";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const formValid = !passwordError && password && repeatPassword && email;

  const handleReset = async () => {
    try {
      await resetPassword(email, password);
      navigate("/login");
    } catch (error) {
      const err = error as ApiError;
      if (err.code === ErrorStatus.PreconditionFailed) {
        setInvalidEmail(true);
      }
    }
  };

  const doReset = () => {
    handleReset().catch(() => {
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
        {passwordError && (
          <div className={styles.error}>Passwords do not match</div>
        )}
        {invalidEmail && (
          <div className={styles.error}>Email doesn't exits </div>
        )}
        {error && (
          <div className={styles.error}>
            Something went wrong. Please try again
          </div>
        )}
        <Button
          className={styles.submitButton}
          disabled={!formValid}
          onClick={doReset}
        >
          Change password
        </Button>
      </form>
    </div>
  );
};
