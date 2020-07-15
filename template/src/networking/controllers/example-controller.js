import { Example } from 'src/models/example';
import { ExampleSerializer } from '../serializers/example-serializer';
import { ApiService } from '../api-service';
import { API_ROUTES } from '../api-routes';

class ExampleController {
  static async getExamples() {
    const response = await ApiService.get(API_ROUTES.EXAMPLE);
    const deSerializedExample = ExampleSerializer.deSerialize(response.data);
    return new Example(deSerializedExample);
  }
}

export { ExampleController };
