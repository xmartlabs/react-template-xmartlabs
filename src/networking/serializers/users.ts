export const serializeSignUp = (
  email: string,
  password: string,
  name: string,
): signUpCredentials => ({
  email,
  password,
  name,
});

export const serializeLogin = (
  email: string,
  password: string,
): loginCredentials => ({
  email,
  password,
});
