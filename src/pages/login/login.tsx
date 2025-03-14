import { useState } from "react";
import { Button } from "common/button";
// import styles from "./login.module.scss";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formValid = !!email && !!password;

  return (
    <div className="flex justify-center items-center w-screen h-screen px-8">
      <form className="max-w-md w-full p-8 rounded shadow-md bg-white">
        {/* <TextField
          className="mb-5"
          label="Email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          className="mb-5"
          label="Password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> */}
        <Button className="w-36 mx-auto" type="submit" disabled={!formValid}>
          Submit
        </Button>
      </form>
    </div>
  );
};
