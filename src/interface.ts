import { ChoiceFieldFormatType } from "@pnp/sp/fields/types";
import { IPersonaProps } from "office-ui-fabric-react"; // Import IPersonaProps
import { PersonaBase } from "office-ui-fabric-react";

export interface IGlossary {
    // Export Fields of Glossary Sharepoint List
    Id: number;
    Title: string;
    Term: string;
    TopFilter: string;
    Tags: string;
    Abbreviation_x002f_Acronym: string;
    Abbreviation_x002f_Acronym_x002f: string;
    Definition: Text;
    Contact: IPersonaProps; // Define Contact as IPersonaProps
    // Use this Dummy Column for now
    EmailAddress: string;
    Category: string;
    ApprovalStatus: string;
    Synonyms: string;
    Source: string;
    Comments: string;
    Created: string;
    AverageRating: string;
    Approved: boolean;
    Approval_x002f_Status: string;
    OData__ModerationStatus: number;
    Visibility: ChoiceFieldFormatType;
    EAGlossaryExport: ChoiceFieldFormatType;
}

 