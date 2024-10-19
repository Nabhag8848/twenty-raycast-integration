import { Action, ActionPanel, Form, Icon, PopToRootType, Toast, showHUD, showToast } from "@raycast/api";
import { Fragment } from "react";

import { FailureToast } from "./enum/api";

import { DataModelWithFields, ObjectRecordFields } from "./services/zod/schema/recordFieldSchema";
import { Title } from "./components";
import { FormValidation, useForm } from "@raycast/utils";

function CreateObjectRecordForm({
  objectRecordMetadata,
  fields,
}: {
  objectRecordMetadata: DataModelWithFields;
  fields: ObjectRecordFields;
}) {
  const { primary } = fields;
  const { handleSubmit, itemProps } = useForm({
    async onSubmit(values) {
      console.log(values);
      await showToast({
        style: Toast.Style.Animated,
        title: "Creating Object Record",
      });

      const isSuccess = true;

      if (isSuccess) {
        await showHUD(`${objectRecordMetadata.labelSingular} Created 🎉`, {
          popToRootType: PopToRootType.Immediate,
          clearRootSearch: true,
        });

        return;
      }

      await showToast(FailureToast);
    },
    validation: {
      title: FormValidation.Required,
    },
  });

  return (
    <Fragment>
      <Form
        actions={
          <ActionPanel>
            <Action.SubmitForm title="Create Record" onSubmit={handleSubmit} icon={Icon.Pencil} />
          </ActionPanel>
        }
      >
        <Title values={{ primary, objectRecordMetadata }} />
      </Form>
    </Fragment>
  );
}

export default CreateObjectRecordForm;
