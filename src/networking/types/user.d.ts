interface loginCredentials {
  email: string;
  password: string;
}

interface signUpCredentials extends loginCredentials {
  name: string;
}
