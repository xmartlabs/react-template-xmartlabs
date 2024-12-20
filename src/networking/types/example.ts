import { z } from "zod";

export const exampleSchema = z.object({
  foo: z.string(),
  bar: z.number(),
});

export type Example = z.infer<typeof exampleSchema>;
