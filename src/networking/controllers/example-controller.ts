import {
  serialize,
  deSerialize,
} from "networking/serializers/example-serializer";
import { ApiService } from "networking/api-service";
import { API_ROUTES } from "networking/api-routes";

/*
  NOTE: this file serves only as an example and is not used.
  You can remove it altogether or repurpose it by changing its name.
  Learn more about our networking architecture on:
  https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
*/

export const getExamples = async (): Promise<Example[]> => {
  const response = await ApiService.get<RawExample[]>(API_ROUTES.EXAMPLE);
  return response.map<Example>(deSerialize);
};

export const createExample = async (example: Example): Promise<Example> => {
  const serializedExample = serialize(example);
  const response = await ApiService.post<RawExample>(API_ROUTES.EXAMPLE, {
    body: JSON.stringify(serializedExample),
  });
  return deSerialize(response);
};
