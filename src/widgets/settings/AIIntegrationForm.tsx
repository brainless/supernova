import { Component } from "solid-js";
import { useUserInterface } from "../../stores/userInterface";
import withConfiguredForm from "../../utils/configuredForm";
import { Module } from "../../api_types/Module";
import { useParams } from "@solidjs/router";
import Form from "../interactable/Form";

const AIIntegrationForm: Component = () => {
  const [_, { getColors }] = useUserInterface();
  const params = useParams();

  const configuredForm = withConfiguredForm({
    module: "AIIntegration",
    existingItemId: !!params.id ? parseInt(params.id) : undefined,
    initialData: {
      apiKey: "",
      aiProvider: "openai",
      displayLabel: "OpenAI personal",
    },
    navtigateToAfterSave: "/settings",
  });

  return (
    <>
      <div class="max-w-screen-sm">
        <p style={{ color: getColors().colors["editor.foreground"] }}>
          Pricing and API key links for AI providers (register/login if you have
          not):
        </p>

        <ul
          class="mb-4 list-disc"
          style={{ color: getColors().colors["editor.foreground"] }}
        >
          <li class="ml-8">
            <span class="font-bold">OpenAI</span>:{" "}
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              class="underline text-blue-600"
            >
              API keys
            </a>
            ,{" "}
            <a
              href="https://openai.com/pricing"
              target="_blank"
              class="underline text-blue-600"
            >
              pricing
            </a>
          </li>
          <li class="ml-8">
            <span class="font-bold">Groq</span>{" "}
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              class="underline text-blue-600"
            >
              API keys
            </a>
            ,{" "}
            <a
              href="https://wow.groq.com"
              target="_blank"
              class="underline text-blue-600"
            >
              pricing
            </a>
          </li>
        </ul>
      </div>

      <div class="max-w-screen-sm">
        <Form configuredForm={configuredForm} />
      </div>
    </>
  );
};

export default AIIntegrationForm;
