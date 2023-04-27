import { Button } from 'common/button';
import { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formValid = !!email && !!password;

  return (
    <form>
      <label>
        Email
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <Button type="submit" disabled={!formValid}>
        Submit
      </Button>
    </form>
  );
};
