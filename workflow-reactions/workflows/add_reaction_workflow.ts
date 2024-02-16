import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { AddReactionFunctionDefinition } from "../functions/add_reaction_function.ts";

const AddReactionWorkflow = DefineWorkflow({
  callback_id: "add_reaction_workflow",
  title: "Add a reaction",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      }
    },
    required: ["interactivity"],
  },
});

const inputForm = AddReactionWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Add a reaction - Params",
    interactivity: AddReactionWorkflow.inputs.interactivity,
    fields: {
      elements: [
        {
          name: "message_context",
          type: Schema.types.object
        }
      ],
      required: ["message_context"],
    },
  },
);

AddReactionWorkflow.addStep(
  AddReactionFunctionDefinition,
  {
    message_context: inputForm.outputs.fields.message_context,
  },
);

export default AddReactionWorkflow;
