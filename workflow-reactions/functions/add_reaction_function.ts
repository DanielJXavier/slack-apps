import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const AddReactionFunctionDefinition = DefineFunction({
  callback_id: "add_reaction_function",
  title: "Add a reaction", // Exibido na sidebar dos steps
  source_file: "functions/add_reaction_function.ts",
  input_parameters: {
    properties: {
      message_context: {
        type: Schema.slack.types.message_context,
        description: "Message to react", // Exibido dentro do input na configuração do step
      },
    },
    required: ["message_context"]
  }
});

export default SlackFunction(
  AddReactionFunctionDefinition,
  ({ inputs, client }) => {
    const { message_context } = inputs;
    const { channel_id, message_ts } = message_context;

    client.reactions.add({
      channel: channel_id,
      name: 'white_check_mark',
      timestamp: message_ts
    })

    return { outputs: { message_context } };
  },
);