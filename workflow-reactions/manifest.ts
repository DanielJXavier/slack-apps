import { Manifest } from "deno-slack-sdk/mod.ts";
import AddReactionWorkflow from "./workflows/add_reaction_workflow.ts";

export default Manifest({
  name: "workflow-reactions",
  icon: "assets/default_new_app_icon.png",
  workflows: [AddReactionWorkflow],
  outgoingDomains: [],
  botScopes: ["commands", "reactions:write"],
});
