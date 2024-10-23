/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPreferenceValues } from "@raycast/api";
import { Api } from "../enum/api";
import fetch from "node-fetch";
import { dataModelSchema } from "./zod/schema/dataModelSchema";
import { dataModelsFieldsSchema } from "./zod/schema/recordFieldSchema";
import { splitFullName } from "../helper";

class TwentySDK {
  private url: string = "http://localhost:3000/rest";
  private token!: string;

  constructor() {
    const { api_token }: { api_token: string } = getPreferenceValues();
    this.token = `Bearer ${api_token}`;
  }

  async getActiveDataModels() {
    try {
      const response = await fetch(this.url + "/metadata/objects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });
      const data = (await response.json()) as any;
      const dataModel = await dataModelSchema.parseAsync(data?.data?.objects);
      const activeDataModel = await dataModel.filter((model) => !model.isSystem && model.isActive);
      return activeDataModel;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async getRecordFieldsForDataModel(id: string) {
    try {
      const response = await fetch(this.url + "/metadata/objects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          [Api.KEY]: this.token,
        },
      });
      const data = (await response.json()) as any;
      const objectRecords = await dataModelsFieldsSchema.parseAsync(data?.data?.objects);
      const objectRecordWithFieldsMetadata = await objectRecords.find((object) => object.id === id)!;
      const excludeFieldsWithName = ["updatedAt", "deletedAt"];
      objectRecordWithFieldsMetadata.fields = objectRecordWithFieldsMetadata.fields
        .filter((object) => !object.isSystem)
        .filter((object) => object.isActive)
        .filter((object) => object.type !== "RELATION" && object.type !== "ACTOR") // handle relation later
        .filter((object) => !excludeFieldsWithName.includes(object.name));

      return objectRecordWithFieldsMetadata;
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async createObjectRecord(namePlural: string, bodyParam: any) {
    try {
      if (namePlural === "people") {
        bodyParam.name = splitFullName(bodyParam.name);
      }

      const response = await fetch(this.url + `/${namePlural}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          [Api.KEY]: this.token,
        },
        body: JSON.stringify({
          ...bodyParam,
        }),
      });

      if (response.ok) {
        return true;
      }

      return false;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

const twenty = new TwentySDK();
export default twenty;
