export const serializeLogin = (
  email: string,
  password: string,
): loginCredentials => ({
  email,
  password,
});
