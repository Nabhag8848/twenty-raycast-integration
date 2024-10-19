import { z } from "zod";

export const dataModelFieldsSchema = z.array(
  z.object({
    id: z.string(),
    dataSourceId: z.string(),
    nameSingular: z.string(),
    namePlural: z.string(),
    labelSingular: z.string(),
    labelPlural: z.string(),
    description: z.string().nullable(),
    isCustom: z.boolean(),
    isActive: z.boolean(),
    isSystem: z.boolean(),
    fields: z.array(
      z.object({
        id: z.string(),
        type: z.string(),
        name: z.string(),
        label: z.string(),
        description: z.string().nullable(),
        isCustom: z.boolean(),
        isActive: z.boolean(),
        isSystem: z.boolean(),
        isNullable: z.boolean(),
      }),
    ),
  }),
);

export type DataModelFields = z.infer<typeof dataModelFieldsSchema>;
