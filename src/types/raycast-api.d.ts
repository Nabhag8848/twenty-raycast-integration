import "@raycast/api";

declare module "@raycast/api" {
  interface FormItemRef {
    focus: () => void;
    reset: () => void;
  }
}
