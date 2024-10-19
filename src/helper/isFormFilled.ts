import { Common } from "../enum/validation";

export function isFormFilled(
  values,
  setTitleError: (value: React.SetStateAction<string | undefined>) => void,
): boolean {
  let result: boolean = true;
  const { title } = values;

  if (title.length === 0) {
    setTitleError(Common.FORM_VALIDATION);
    result = false;
  }

  return result;
}
