import { Common } from "../enum/validation";

export function validateRequiredField(
  event: { target: { value: Array<unknown>; id: string } },
  setTitleError: (value: React.SetStateAction<string | undefined>) => void,
) {
  const { value, id } = event.target;

  if (value && value.length > 0) {
    switch (id) {
      case "title": {
        setTitleError(undefined);
        break;
      }
    }

    return;
  }

  switch (id) {
    case "title": {
      setTitleError(Common.FORM_VALIDATION);
      break;
    }
  }
}
