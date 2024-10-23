import { DataModelWithFields } from "../services/zod/schema/recordFieldSchema";

export function createValidationsForRest(rest: DataModelWithFields["fields"]): any {
  // Validation for fields in the rest variable
  return rest.reduce((acc: Record<string, (value: any) => void | string>, field) => {
    switch (field.type) {
      case "TEXT":
      case "FULL_NAME": {
        acc[field.name] = (value) => {
          if ((!field.isNullable && !value) || value.length === 0) return "Required";
        };
        break;
      }
      case "LINKS": {
        acc[field.name] = (value) => {
          const urlPattern = /^(https?:\/\/(localhost|[^\s$.?#].[^\s]*))$/i;
          if (!field.isNullable) {
            if (!value) {
              return "Required";
            }
          }

          if (value && !urlPattern.test(value)) {
            return "Invalid URL";
          }
        };
        break;
      }
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
      case "ADDRESS":
        break;
      default:
        break;
    }
    return acc;
  }, {});
}
