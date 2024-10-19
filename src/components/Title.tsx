import { Form } from "@raycast/api";
import { DataModelWithFields, ObjectRecordFields } from "../services/zod/schema/recordFieldSchema";

type TitleProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: string;
  objectRecordMetadata: DataModelWithFields;
  primary: ObjectRecordFields["primary"];
};

export default function Title({ values }: { values: TitleProps }) {
  const { defaultValue, objectRecordMetadata, primary } = values;
  const { labelSingular } = objectRecordMetadata;
  return (
    <Form.TextField
      id={primary.name}
      title={primary.label}
      placeholder={`Enter ${labelSingular} ${primary.label}`}
      defaultValue={defaultValue}
      autoFocus
    />
  );
}
