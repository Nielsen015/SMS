import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string()
    .min(1, { message: 'Subject name is required!' }),
});
// Pass the types of the schema to the useForm hook
export type SubjectSchema =  z.infer<typeof subjectSchema>; 