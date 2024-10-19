import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { randomUUID } from "crypto";

import { DataModel } from "./services/zod/schema/dataModelSchema";
import twenty from "./services/TwentySDK";
import { ObjectIcons } from "./enum/tag";

export default function CreateObjectRecord() {
  const [activeDataModels, setActiveDataModels] = useState<DataModel | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(
    function () {
      async function onLoad() {
        const [activeDataModels] = await Promise.all([twenty.getActiveDataModels()]);
        setActiveDataModels(activeDataModels);
        setIsLoading(false);
      }

      if (activeDataModels) return;
      onLoad();
    },
    [isLoading],
  );

  const standardActiveModel = activeDataModels?.filter((model) => !model.isCustom);
  const customActiveModel = activeDataModels?.filter((model) => model.isCustom);

  return (
    <List isLoading={isLoading} navigationTitle="Create Object Record" searchBarPlaceholder="Search Object Record">
      <List.Section title="Standard Object">
        {standardActiveModel?.map((model) => {
          const { id, description, labelPlural, icon } = model;
          return (
            <List.Item
              id={id}
              title={labelPlural}
              subtitle={description}
              actions={
                <ActionPanel>
                  <Action
                    title="Create Record"
                    icon={Icon.List}
                    onAction={async () => {
                      await twenty.getRecordFieldsForDataModel(id);
                    }}
                  />
                </ActionPanel>
              }
              icon={ObjectIcons[icon] ?? Icon.BulletPoints}
              key={randomUUID().toString()}
            />
          );
        })}
      </List.Section>
      <List.Section title="Custom Object">
        {customActiveModel?.map((model) => {
          const { id, description, labelPlural } = model;
          return (
            <List.Item
              id={id}
              title={labelPlural}
              subtitle={description}
              icon={Icon.BulletPoints}
              actions={
                <ActionPanel>
                  <Action
                    title="Create Record"
                    icon={Icon.List}
                    onAction={async () => {
                      await twenty.getRecordFieldsForDataModel(id);
                    }}
                  />
                </ActionPanel>
              }
              key={randomUUID().toString()}
            />
          );
        })}
      </List.Section>
    </List>
  );
}
