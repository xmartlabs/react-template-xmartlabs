interface loginCredentials {
  email: string;
  password: string;
}

interface signUpCredentials extends loginCredentials {
  name: string;
}

interface UserRaw {
  email: string;
  name: string;
}

interface UserInfo {
  email: string;
  name: string;
}
