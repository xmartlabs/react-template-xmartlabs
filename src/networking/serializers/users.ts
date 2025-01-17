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

export const deserializeUser = (response: UserRaw): UserInfo => ({
  email: response.email,
  name: response.name,
});
