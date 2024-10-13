import { getPreferenceValues } from "@raycast/api";

class TwentySDK {
  private url!: string;
  private token!: string;

  constructor() {
    const { api_token }: { api_token: string } = getPreferenceValues();
    this.token = api_token;
  }
}

const twenty = new TwentySDK();
export default twenty;
