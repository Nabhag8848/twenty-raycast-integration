import { DataModelWithFields } from "../services/zod/schema/recordFieldSchema";
import { splitFullName } from "./splitFullName";
import { createTwentyUrlObject } from "./twentyUrlObject";

export function formatValues(values: Record<string, any>, objectRecordMetadata: DataModelWithFields) {
  const formattedValues: Record<string, any> = { ...values };

  for (const key in values) {
    const field = objectRecordMetadata.fields.find((field) => field.name === key);
    if (field) {
      switch (field.type) {
        case "LINKS":
          {
            formattedValues[key] = createTwentyUrlObject(values[key]);
          }
          break;
        case "FULL_NAME": {
          formattedValues[key] = splitFullName(values[key]);
          break;
        }
        default:
          break;
      }
    }
  }

  return formattedValues;
}
