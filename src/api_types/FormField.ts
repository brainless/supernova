// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Content } from "./Content";
import type { ContentSpec } from "./ContentSpec";
import type { ContentType } from "./ContentType";

export type FormField = {
  name: string;
  label: string;
  description: string | null;
  placeholder: string | null;
  contentType: ContentType;
  contentSpec: ContentSpec;
  isRequired: boolean | null;
  isEditable: boolean | null;
  isHidden: boolean | null;
  defaultValue: Content | null;
};
