import { TextField } from "common/text-field";
import { useState } from "react";
import { Button } from "common/button";
import { forgotPassword } from "networking/controllers/users";
import styles from "./forgot-password.module.scss";

const ForgotPassword = () => {
  const [error, setError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const doSendMail = async () => {
    setError(false);
    setShowSuccess(false);
    try {
      await forgotPassword(email);
      setShowSuccess(true);
    } catch (e) {
      setError(true);
    }
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
        {error && (
          <p className={styles.message}>
            Something went wrong. Please try again.
          </p>
        )}
        {showSuccess && <p className={styles.message}>Email sent!</p>}
        <Button className={styles.submitButton} onClick={doSendMail}>
          Send email
        </Button>
      </form>
    </div>
  );
};

export { ForgotPassword };
