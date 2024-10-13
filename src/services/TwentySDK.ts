/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPreferenceValues } from "@raycast/api";
import { Api } from "../enum/api";
import fetch from "node-fetch";
import { dataModelSchema } from "./zod/schema/dataModelSchema";

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
}

const twenty = new TwentySDK();
export default twenty;
