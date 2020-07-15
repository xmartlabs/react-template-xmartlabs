class ExampleSerializer {
  static deSerialize(data) {
    return {
      foo: data.foo,
      bar: data.bar,
    };
  }
}

export { ExampleSerializer };
