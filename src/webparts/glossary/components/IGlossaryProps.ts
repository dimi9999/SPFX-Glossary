import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IGlossaryProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  listGuid: string;
  letter: string;
  list: string; // Stores the list ID
  column: string; // Stores the single column property (property can be configured)
  multiColumn: string; // Stores the multi column property (property can be configured)
}
