import * as React from 'react';
import styles from './Glossary.module.scss';
import { IGlossaryProps } from './IGlossaryProps';
import { IGlossary } from '../../../interface';

import { useEffect, useState } from 'react';
import { getSP } from '../../../pnpjsConfig';
//import { escape } from '@microsoft/sp-lodash-subset';
import { SPFI } from '@pnp/sp';
 
const Glossary = (props: IGlossaryProps) => {
const LOG_SOURCE = 'Glossary Web part';
// const LIST_NAME = 'IMS%20Glossary';
   const LIST_NAME = 'EWR Glossary';
let _sp:SPFI = getSP(props.context);

const startsWithChar = 'A'; // Change this to the desired starting character
 
const [glossaryItems, setGlossaryItems] = React.useState<IGlossary[]>([])
const getGlossaryItems = async () => {
  // const pageSize = 1700; // Number of items to fetch in each request
  const pageSize = 100;
  let skip = 0; // Initial value for skipping items

  const allItems: IGlossary[] = [];

  // Loop until all items are fetched
  while (true) {
      const items = await _sp.web.lists.getByTitle(LIST_NAME).items.top(pageSize).orderBy('Title',true).skip(skip)();
      // .items.filter(`substringof('${startsWithChar}',Title)`)
      
      // Break the loop if no more items
      if (items.length === 0) {
          break;
      }

      // Map and add the items to the result array
      allItems.push(
          ...items.map((item) => {
              return {
                  Id: item.Id,
                  TopFilter: item.TopFilter,
                  Title: item.Title,
                  Term: item.Term,
                  Tags: item.Tags,
                  Abbreviation_x002f_Acronym: item.Abbreviation_x002f_Acronym,
                  Definition: item.Definition,
                  Contact: item.Contact,
                  Category: item.Category,
                  ApprovalStatus: item.ApprovalStatus,
                  Synonyms:item.Synonyms,
                  Comments:item.Comments,

              };
          })
      );

      // Increase the skip value for the next iteration
      skip += pageSize;
  }

  setGlossaryItems(allItems);
};

useEffect(() => {
  getGlossaryItems();
},[])


  return (
    <div className={styles.glossary}> 
    <h1>Welcome to EWR Glossary - Your Terms Defined</h1>
    <pre>{JSON.stringify(glossaryItems,null,2)}</pre>
    </div>
  )
}
export default Glossary 

