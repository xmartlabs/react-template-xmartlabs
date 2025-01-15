export const serializeSignUp = (
  email: string,
  password: string,
): signUpCredentials => ({
  email,
  password,
});
