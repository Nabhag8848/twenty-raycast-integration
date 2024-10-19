import React, { forwardRef } from "react";
import { Form, FormItemRef } from "@raycast/api";
import { DataModelWithFields, ObjectRecordFields } from "../services/zod/schema/recordFieldSchema";

type TitleProps = {
  defaultValue?: string;
  objectRecordMetadata: DataModelWithFields;
  primary: ObjectRecordFields["primary"];
};

// Use forwardRef to allow ref forwarding
const Title = forwardRef<FormItemRef, { values: TitleProps }>(({ values, ...rest }, ref) => {
  const { defaultValue, objectRecordMetadata, primary } = values;
  const { labelSingular } = objectRecordMetadata;

  return (
    <Form.TextField
      id={primary.name}
      title={primary.label}
      placeholder={`Enter ${labelSingular} ${primary.label}`}
      defaultValue={defaultValue}
      autoFocus
      ref={ref as React.Ref<FormItemRef>} // Cast the ref to the correct type
      {...rest}
    />
  );
});

// Set display name for better debugging
Title.displayName = "Title";

export default Title;
