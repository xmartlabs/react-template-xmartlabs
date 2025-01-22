import { ApiService } from "networking/api-service";
import { API_ROUTES } from "networking/api-routes";
import { serializeLogin } from "networking/serializers/users";

const login = async (email: string, password: string) => {
  const serializeCredentials = serializeLogin(email, password);
  const response = await ApiService.post(API_ROUTES.LOGIN, {
    body: JSON.stringify(serializeCredentials),
  });
  return response;
};
export { login };
