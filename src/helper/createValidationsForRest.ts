import { DataModelWithFields } from "../services/zod/schema/recordFieldSchema";

export function createValidationsForRest(rest: DataModelWithFields["fields"]): any {
  // Validation for fields in the rest variable
  return rest.reduce((acc: Record<string, (value: any) => void | string>, field) => {
    switch (field.type) {
      case "TEXT":
      case "FULL_NAME":
      case "RICH_TEXT":
        acc[field.name] = (value) => {
          if (!field.isNullable) {
            if (!value || value.length === 0) return "Required";
          }
        };
        break;
      case "EMAILS":
        break;
      case "PHONES":
        break;
      case "DATE":
      case "DATE_TIME":
        break;
      case "BOOLEAN":
        break;
      case "NUMBER":
      case "NUMERIC":
        break;
      case "CURRENCY":
        break;
      case "RATING":
        break;
      case "SELECT":
      case "MULTI_SELECT":
        break;
      case "LINKS":
      case "ADDRESS":
        // Add specific validation if needed
        break;
      default:
        break;
    }
    return acc;
  }, {});
}
