import React from 'react';
import './LeadSourceContainer.css';
import { SourceBox } from './SourceBox';
import { useDispatch } from 'react-redux';
import { closeLSContainer } from '../features/LSContainer/LSContainer';

export const LeadSourceContainer = ({ setToggle }) => {
  const dispatch = useDispatch();

  function hide() {
    dispatch(closeLSContainer());
  }

  // Define source box data with static unique IDs
  const sourceBoxes = [
    { id: 'source-1', className: "fa-solid fa-user-plus", heading: "Leads from List(s)", desc: "Connect multiple lists as sources for this sequence." },
    { id: 'source-2', className: "fa-solid fa-user-check", heading: "Segment by Events", desc: "Create a segment of leads who have engaged with emails previously." },
    { id: 'source-3', className: "fa-solid fa-people-arrows", heading: "Segment of List", desc: "Create a segment of leads which match salesBlink Variables." },
    { id: 'source-4', className: "fa-solid fa-bolt", heading: "Lead from CRM Integration", desc: "Pulls leads from your CRM Integrations." }
  ];

  return (
    <div className="backdrop" onClick={hide}>
      <div className="LeadSourceContainer" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={hide}>
          <i className="fa-solid fa-xmark"></i>
        </div><br />
        <h2>Add a Source Block</h2>
        <p style={{ marginTop: ".5rem" }}>
          Pick a block & configure, any new leads that match rules will be added to the sequence automatically.
        </p><br />
        <h2>Sources</h2>
        <div className="source-container">
          {sourceBoxes.map(box => (
            <SourceBox
              key={box.id}
              id={box.id}
              className={box.className}
              heading={box.heading}
              desc={box.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadSourceContainer;
