import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { AddReactionFunctionDefinition } from "../functions/add_reaction_function.ts";

const AddReactionWorkflow = DefineWorkflow({
  callback_id: "add_reaction_workflow",
  title: "Add a reaction",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

const inputForm = AddReactionWorkflow.addStep(Schema.slack.functions.OpenForm, {
  title: "Add a reaction - Params",
  interactivity: AddReactionWorkflow.inputs.interactivity,
  fields: {
    elements: [
      {
        name: "message_context",
        type: Schema.types.object,
      },
      {
        name: "emoji_name",
        type: Schema.types.string,
      },
    ],
    required: ["message_context", "emoji_name"],
  },
});

AddReactionWorkflow.addStep(AddReactionFunctionDefinition, {
  message_context: inputForm.outputs.fields.message_context,
  emoji_name: inputForm.outputs.fields.emoji_name,
});

export default AddReactionWorkflow;
