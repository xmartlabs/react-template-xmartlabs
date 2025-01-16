import { ApiService } from "networking/api-service";
import { API_ROUTES } from "networking/api-routes";
import { serializeLogin, serializeSignUp } from "networking/serializers/users";

const login = async (email: string, password: string) => {
  const serializeCredentials = serializeLogin(email, password);
  const response = await ApiService.post(API_ROUTES.LOGIN, {
    body: JSON.stringify(serializeCredentials),
  });
  return response;
};

const signUp = async (email: string, password: string, name: string) => {
  const serializeCredentials = serializeSignUp(email, password, name);
  const response = await ApiService.post(API_ROUTES.SIGN_UP, {
    body: JSON.stringify(serializeCredentials),
  });
  return response;
};
export { login, signUp };
