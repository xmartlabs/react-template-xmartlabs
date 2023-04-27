import { useState } from 'react';

import { Button } from 'common/button';
import { TextField } from 'common/text-field';
import styles from './login.module.scss';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formValid = !!email && !!password;

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <TextField className={styles.field} label="Email" name="email" onChange={(e) => setEmail(e.target.value)} />
        <TextField className={styles.field} label="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button className={styles.submitButton} type="submit" disabled={!formValid}>
          Submit
        </Button>
      </form>
    </div>
  );
};
