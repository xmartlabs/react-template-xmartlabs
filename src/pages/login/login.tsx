import { useState } from "react";
import { Button } from "common/button/button";
import { Input } from "common/input/input";
import { Label } from "common/label/label";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formValid = !!email && !!password;

  return (
    <div className="flex flex-1 justify-center items-center h-full px-8">
      <form className="max-w-md w-full p-8 rounded shadow-md">
        <Label htmlFor="email">Email</Label>
        <Input
          className="mt-2 mb-6"
          id="email"
          name="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Label htmlFor="password">Password</Label>
        <Input
          className="mt-2 mb-8"
          id="password"
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button className="w-36 mx-auto" type="submit" disabled={!formValid}>
          Submit
        </Button>
      </form>
    </div>
  );
};
