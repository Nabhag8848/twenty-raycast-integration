import { z } from "zod";

export const dataModelFieldsSchema = z.object({
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
});

export const dataModelsFieldsSchema = z.array(dataModelFieldsSchema);

export type DataModelWithFields = z.infer<typeof dataModelFieldsSchema>;

export type DataModelsWithFields = DataModelWithFields[];

export type DataModelField = DataModelWithFields["fields"][number];
export type ObjectRecordFields = {
  primary: DataModelField;
  rest: DataModelWithFields["fields"];
};
