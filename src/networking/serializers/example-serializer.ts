/*
  NOTE: this file serves only as an example and is not used.
  You can remove it altogether or repurpose it by changing its name.
  Learn more about our networking architecture on:
  https://blog.xmartlabs.com/2020/07/09/frontend-architecture-and-best-practices/
*/

export const deSerialize = (data: RawExample): Example => ({
  foo: data.Foobaz,
  bar: data.Barbaz,
});

export const serialize = (example: Example): RawExample => ({
  Foobaz: example.foo,
  Barbaz: example.bar,
});
