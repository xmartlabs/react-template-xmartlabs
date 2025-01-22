import { TextField } from "common/text-field";
import styles from "./reset-password.module.scss";
import { useEffect, useState } from "react";
import { Button } from "common/button";
import { setNewPassword } from "networking/controllers/users";
import { useGoToPage } from "hooks/use-go-to-page";
import { RouteName } from "routes";

export const ResetPassword = () => {
  const goToPage = useGoToPage();
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const formValid = !passwordError && password && repeatPassword;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      setToken(token);
    } else {
      goToPage(RouteName.Login);
    }
  }, []);

  const handleReset = async () => {
    try {
      await setNewPassword(token, password);
      setSuccess(true);
    } catch (e) {
      setError(true);
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
          <div className={styles.message}>The passwords do not match.</div>
        )}

        {error && (
          <div className={styles.message}>
            Something went wrong. Please try again.
          </div>
        )}
        {success && (
          <div className={styles.message}>
            Your password has been changed successfully.
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
