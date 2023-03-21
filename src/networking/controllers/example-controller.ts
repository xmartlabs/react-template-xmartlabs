import { ExampleSerializer } from 'networking/serializers/example-serializer';
import { ApiService } from 'networking/api-service';
import { API_ROUTES } from 'networking/api-routes';

/*
  NOTE: this file serves only as an example and is not used.
  You can remove it altogether or repurpose it by changing its name.
  Learn more about our networking architecture on:
  https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
*/
class ExampleController {
  static async getExamples(): Promise<Example[]> {
    const response = await ApiService.get<RawExample[]>(API_ROUTES.EXAMPLE);
    return (response.data || []).map(ExampleSerializer.deSerialize);
  }

  static createExample(example: Example) {
    const serializedExample = ExampleSerializer.serialize(example);
    return ApiService.post(API_ROUTES.EXAMPLE, {
      example: serializedExample,
    });
  }
}

export { ExampleController };
