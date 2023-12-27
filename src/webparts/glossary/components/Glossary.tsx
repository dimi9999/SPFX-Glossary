import * as React from 'react';
import styles from './Glossary.module.scss';
import { IGlossaryProps } from './IGlossaryProps';
import { IGlossary } from '../../../interface';
import { useEffect, useState } from 'react';
import { getSP } from '../../../pnpjsConfig';
import { SPFI } from '@pnp/sp';

const Glossary = (props: IGlossaryProps) => {
  const LOG_SOURCE = 'Glossary Web part';
  const LIST_NAME = 'EWR Glossary';
  let _sp: SPFI = getSP(props.context);

  const [glossaryItems, setGlossaryItems] = React.useState<IGlossary[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const pageSize = 50; // Number of Glossary Items to display 

  const getGlossaryItems = async () => {
    try {
      const skip = (currentPage - 1) * pageSize;
      const items = await _sp.web.lists.getByTitle(LIST_NAME).items.orderBy('Title', true).top(pageSize).skip(skip)();

      setGlossaryItems(
        items.map((item: any) => ({
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
          Synonyms: item.Synonyms,
          Comments: item.Comments,
        }))
      );
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    getGlossaryItems();
  }, [currentPage]);

  const totalPages = Math.ceil(9000 / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.glossary}>
      {/* Render your glossary items here */}
      {glossaryItems.map((item: IGlossary, index: number) => (
       <div key={index} className={styles.GlossaryItemBox}>
       {/* Glossary Item Loop */}
       <div className={styles.GlossaryImage}>
        <img src="https://eastwestrailwaycouk.sharepoint.com/:i:/r/Integrated%20Management%20System/SiteAssets/IMS/img/EWR-Portal-Glossary-Banner-Background.jpg?csf=1&web=1&e=PWmFfx" alt="IMS Glossary" />
        {/* Glossary Letter*/}
        <span className={styles.GlossaryLetter}>{item.Title}</span>
         </div>
      </div>
        
      ))}

      {/* Pager component */}
      <div className={styles.pager}>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Glossary;