import { Form } from "@raycast/api";
import { DataModelField } from "../services/zod/schema/recordFieldSchema";
import TextInput from "./TextInput";

type ItemProps = Partial<Form.ItemProps<any>> & {
  id: string;
};

type FieldComponentProps = {
  values: {
    field: DataModelField;
    itemProps: ItemProps;
  };
};
export default function FieldComponent({ values }: FieldComponentProps) {
  const { field, itemProps } = values;
  switch (field.type) {
    case "FULL_NAME":
    case "LINKS":
    case "TEXT": {
      return <TextInput values={{ field, placeholder: `Enter ${field.name}...` }} {...itemProps} />;
    }
    default:
      return <></>;
  }
}
