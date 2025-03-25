import { useState } from "react";
import { Button } from "common/button/button";
import { Input } from "common/input/input";
import { Label } from "common/label/label";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formValid = !!email && !!password;

  return (
    <div className="flex h-full flex-1 items-center justify-center px-8">
      <form className="w-full max-w-md rounded p-8 shadow-md">
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
        <Button className="mx-auto w-36" type="submit" disabled={!formValid}>
          Submit
        </Button>
      </form>
    </div>
  );
};
