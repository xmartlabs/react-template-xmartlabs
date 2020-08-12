/*
  NOTE: this file serves only as an example and is not used.
  You can remove it altogether or repurpose it by changing its name.
  Learn more about our networking architecture on:
  https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
*/
class ExampleSerializer {
  static deSerialize(data) {
    return {
      foo: data.foo,
      bar: data.bar,
    };
  }

  static serialize(example) {
    return {
      foo: example.foo,
      bar: example.bar,
    };
  }
}

export { ExampleSerializer };
