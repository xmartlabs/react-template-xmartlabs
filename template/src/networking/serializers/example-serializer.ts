/*
  NOTE: this file serves only as an example and is not used.
  You can remove it altogether or repurpose it by changing its name.
  Learn more about our networking architecture on:
  https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
*/

import { Example } from 'models/example';

class ExampleSerializer {
  static deSerialize(data: RawExample) : SerializedExample {
    return {
      foo: data.Foobaz,
      bar: data.Barbaz,
    };
  }

  static serialize(example: Example) {
    return {
      foo: example.foo,
      bar: example.bar,
    };
  }
}

export { ExampleSerializer };
