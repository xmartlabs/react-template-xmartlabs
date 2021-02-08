import { Example } from 'models/example';
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
  static async getExamples() {
    const response = await ApiService.get(API_ROUTES.EXAMPLE);
    const deSerializedExample = ExampleSerializer.deSerialize(response.data);
    return new Example(deSerializedExample);
  }

  static createExample(example) {
    const serializedExample = ExampleSerializer.serialize(example);
    return ApiService.post(API_ROUTES.EXAMPLE, {
      example: serializedExample,
    });
  }
}

export { ExampleController };
