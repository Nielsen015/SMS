import { z } from "zod";

export const subjectSchema = z.object({
  // Define the schema for the subject form
  id: z.coerce.number().optional(),
  // id is optional and coerced to a number
  name: z.string()
    .min(1, { message: 'Subject name is required!' }),
  teachers: z.array(z.string()) // Array of teacher IDs, can be empty
});
// Pass the types of the schema to the useForm hook
export type SubjectSchema =  z.infer<typeof subjectSchema>; 