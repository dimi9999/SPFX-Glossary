import { ChoiceFieldFormatType } from "@pnp/sp/fields/types";
import { PersonaBase } from "office-ui-fabric-react";

export interface IGlossary {
    // 3. Export Fields of Glossary Sharepoint List
    Id: number;
    Title: string;
    Term: string;
    TopFilter: string;
    Tags: string;
    Abbreviation_x002f_Acronym: string;
    Definition: Text;
    Contact: string;
    Category: ChoiceFieldFormatType;
    ApprovalStatus: ChoiceFieldFormatType;
    Synonyms:string;
    Comments:string;

}