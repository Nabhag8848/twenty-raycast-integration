import "@raycast/api";

declare module "@raycast/api" {
  interface FormItemRef {
    focus: () => void;
    reset: () => void;
  }

  type ItemProps = Partial<Form.ItemProps<any>> & {
    id: string;
  };
}
