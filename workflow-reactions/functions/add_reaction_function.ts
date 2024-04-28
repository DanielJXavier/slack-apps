import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const AddReactionFunctionDefinition = DefineFunction({
  callback_id: "add_reaction_function",
  title: "Add a reaction",
  source_file: "functions/add_reaction_function.ts",
  input_parameters: {
    properties: {
      message_context: {
        type: Schema.slack.types.message_context,
        description: "Message to react",
      },
      emoji_name: {
        type: Schema.types.string,
        description: "Emoji used in reaction",
      },
    },
    required: ["message_context", "emoji_name"],
  },
});

export default SlackFunction(
  AddReactionFunctionDefinition,

  ({ inputs, client }) => {
    const { message_context, emoji_name } = inputs;
    const { channel_id, message_ts } = message_context;

    const parsed_emoji_name = emoji_name.replaceAll(":", "");

    client.reactions.add({
      channel: channel_id,
      name: parsed_emoji_name,
      timestamp: message_ts,
    });

    return { outputs: {} };
  }
);
