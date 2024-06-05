// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AIProvider } from "./AIProvider";

export interface AIIntegration {
  id: bigint;
  label: string | null;
  aiProvider: AIProvider;
  apiKey: string | null;
  endpointUrl: string | null;
  createdAt: string;
  modifiedAt: string | null;
}
