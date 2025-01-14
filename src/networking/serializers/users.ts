export const serializeSignUp = (
  email: string,
  password: string,
): signUpCredentials => {
  return {
    email: email,
    password: password,
  };
};
