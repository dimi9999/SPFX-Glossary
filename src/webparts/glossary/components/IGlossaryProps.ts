import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IGlossaryProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  listGuid: string;
}
