import * as React from "react";
import styles from "./Glossary.module.scss";
import { IGlossaryProps } from "./IGlossaryProps";
import { IGlossary } from "../../../interface";
import { useEffect, useState } from "react";
import { getSP } from "../../../pnpjsConfig";
import { SPFI } from "@pnp/sp";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";

// Retrieve List Data using SharepPoint REST API

const Glossary = (props: IGlossaryProps) => {
  const LOG_SOURCE = "Glossary Web part";
  const LIST_NAME = "EWR Glossary";
  let _sp: SPFI = getSP(props.context);

  const [glossaryItems, setGlossaryItems] = React.useState<IGlossary[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  // Declare Popups
  const [openedPopupIndex, setOpenedPopupIndex] = React.useState<number>(-1);
  const [showOverlay, setShowOverlay] = React.useState<boolean>(false); // State to control overlay display
  const pageSize = 550; // Number of Glossary Items to display

  const getGlossaryItems = async () => {
    try {
      const skip = (currentPage - 1) * pageSize;
      const items = await _sp.web.lists
        .getByTitle(LIST_NAME)
        .items.orderBy("TopFilter", true)
         .filter(`TopFilter eq 'G' and OData__ModerationStatus eq 0`)
         // .orderBy('Created', false)
            .top(pageSize)
         //.top(10)
           .skip(skip)();

      setGlossaryItems(
        items.map((item: any) => ({
          Id: item.Id,
          TopFilter: item.TopFilter,
          Title: item.Title,
          Term: item.Term,
          Tags: item.Tags,
          Abbreviation_x002f_Acronym:item.Abbreviation_x002f_Acronym,
          Abbreviation_x002f_Acronym_x002f:
          item.Abbreviation_x002f_Acronym_x002f,
          Definition: item.Definition,
          Contact: item.Contact,
          Category: item.Category,
          ApprovalStatus: item.ApprovalStatus,
          Approval_x002f_Status: item.Approval_x002f_Status,
          Synonyms: item.Synonyms,
          Comments: item.Comments,
          Created: item.Created,
          AverageRating: item.AverageRating,
          Approved: item.Approved,
          OData__ModerationStatus: item.OData__ModerationStatus,
          Visibility: item.Visibility,
          Source: item.Source,
          EAGlossaryExport: item.EAGlossaryExport,
          EmailAddress: item.EmailAddress,
        }))
      );
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getGlossaryItems();
  }, [currentPage]);

  const totalPages = Math.ceil(10000 / pageSize);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const togglePopup = (index: number) => {
    setOpenedPopupIndex(openedPopupIndex === index ? -1 : index);
    setShowOverlay(!showOverlay); // Toggle overlay when popup opens/closes
  };


  return (
    <>
     
        {/* re>{JSON.stringify(glossaryItems,null,2)}</pre> */}
      
      <div className={styles.glossary}>
        {/* Pager component */}
        <div className={styles.pager}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous Item.
          </button>
          {/* <span>{currentPage}</span> */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next Item.
          </button>
        </div>
        {/* Render your glossary items here */}

         {/* 1. Glossary Popup Details */}
        {glossaryItems.map((item: IGlossary, index: number) => (
           <>  
            {openedPopupIndex === index && (
              
            <div className={styles.GlossaryPopup}>
              <div className={styles.GlossaryContainer}>
                <div className={styles.glossary}>
                  {/*  item */}
                  <div className={styles.GlossaryItem}>
                    <div className={styles.GlossaryContent}>
                      {/* title */}
                      <h2>{item.Title}</h2>
                      {/*  Abbreviation */}
                      <div className={styles.abbr}>
                        <h3 className={styles.Title}><strong>Abbreviation:</strong> </h3>
                        <div className={styles.Content}><p>{item.Abbreviation_x002f_Acronym}</p></div>
                      </div>
                       {/*  Abbreviation */}
                       <div className={styles.abbr}>
                        <h3 className={styles.Title}><strong>Belogns to:</strong> </h3>
                        <div className={styles.Content}><p>{item.Abbreviation_x002f_Acronym_x002f}</p></div>
                      </div>
                      {/*  tags */}
                      <div className={styles.Tags}>
                        <div className={styles.Title}><strong>Tags:</strong></div>
                        <div className={styles.Content}>
                            {item.Tags} 
                        </div>
                      </div>
                      {/*  category */}
                      <div className={styles.Category}>
                        <div className={styles.Title}><strong>Category:</strong></div>
                        <div className={styles.Content}>
                          <span className={styles.CategoryWord}>
                             {item.Category} 
                          </span>
                        </div>
                      </div>
                       {/*  source */}
                       <div className={styles.Category}>
                        <div className={styles.Title}><strong>Source:</strong></div>
                        <div className={styles.Content}>
                         <p>{item.Source}</p>
                        </div>
                      </div>
                      {/*  definition */}
                      <div className={styles.Definition}>
                        <div className={styles.Title}><strong>Definition:</strong></div>
                        <div className={styles.Content}>
                          <p>
                            {item.Definition}
                          </p>
                        </div>
                      </div>
                       {/*  synonyms */}
                       {item.Synonyms && (
                       <div className={styles.Definition}>
                        <div className={styles.Title}><strong>Synonyms:</strong></div>
                        <div className={styles.Content}>
                          <p>
                            {item.Synonyms}
                          </p>
                        </div>
                      </div>
                      )}
                       {/*  Visibility */}
                       {item.Visibility && (
                       <div className={styles.Definition}>
                        <div className={styles.Title}><strong>Visibility:</strong></div>
                        <div className={styles.Content}>
                          <p>
                            {item.Visibility}
                          </p>
                        </div>
                      </div>
                      )}
                       {/*  Export */}
                       {item.EAGlossaryExport && (
                       <div className={styles.Definition}>
                        <div className={styles.Title}><strong>EA Glossary Export:</strong></div>
                        <div className={styles.Content}>
                          <p>
                            {item.EAGlossaryExport}
                          </p>
                        </div>
                      </div>
                      )}
                     {/*  Comments */}
                      {item.Comments && (
                       <div className={styles.Definition}>
                        <div className={styles.Title}><strong>Comments:</strong></div>
                        <div className={styles.Content}>
                          <p>
                            {item.Comments}
                          </p>
                        </div>
                      </div>
                      )}
                      {/*  Contact*/}

                      {item.EmailAddress && (
                        <div className={styles.Definition}>
                          <div className={styles.Title}><strong>Contact</strong></div>
                          <div className={styles.Content}>
                            <p>{item.Contact}
                              <a className={styles.EmailAddress} href="mailto:{item.EmailAddress}">{item.EmailAddress}</a>
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Close Window */}
                      <p>
                        <a  onClick={() => togglePopup(index)} className={styles.btnprimary} href="#">
                          Close Window
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.GlossaryPopupFooter}></div>
            </div>
            
              )}
             {/* Glossary Loop Item */}
            <div key={index} className={styles.GlossaryItemBox}>
              <div className={styles.GlossaryImage}>
                <img
                  src="https://eastwestrailwaycouk.sharepoint.com/:i:/r/Integrated%20Management%20System/SiteAssets/IMS/img/EWR-Portal-Glossary-Banner-Background.jpg?csf=1&web=1&e=PWmFfx"
                  alt="IMS Glossary"
                />
                {/* Glossary Letter*/}
                <span className={styles.GlossaryLetter}>
                  <span className={styles.letter}>{item.TopFilter}</span>
                  <span className={styles.title}>{item.Title}</span>
                  <button onClick={() => togglePopup(index)}>Read more</button>
                </span>
              </div>
            </div>
          </>
        ))}
         
      </div>
      {showOverlay && <div className={styles.GlossaryPopupOverlay}></div>}
    </>
  );
};

export default Glossary;
