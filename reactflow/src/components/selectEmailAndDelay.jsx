import React, { useCallback, useMemo } from 'react';
import './LeadSourceContainer.css';
import { SourceBox } from './SourceBox';
import { useDispatch, useSelector } from 'react-redux';
import { closeLSContainer, closeOutreachContainer } from '../features/LSContainer/LSContainer';
import { v4 as uuidv4 } from 'uuid';

export const SelectEmailAndDelay = () => {
  const outreachs = useSelector((state) => state.outreach.outreach);
  const outreachLastItem = outreachs[outreachs.length-1]

  const dispatch = useDispatch();

  const hide = useCallback(() => {
    dispatch(closeOutreachContainer());
    dispatch(closeLSContainer());
  }, [dispatch]);

  const sourceBoxes = useMemo(() => [
    {id : uuidv4(), type: 'email', className: "fa-regular fa-envelope", heading: "Cold Email", desc: "Send an email to a lead" },
    {id : uuidv4(), type: 'task', className: "fa-regular fa-circle-check", heading: "Task", desc: "Schedule a manual task" },
    {id : uuidv4(), type: 'delay', className: "fa-solid fa-hourglass-half", heading: "Wait", desc: "Add a delay between blocks" },
    {id : uuidv4(), type: 'event', className: "fa-solid fa-filter", heading: "If/Else (Rules)", desc: "Route lead through the sequence based on events." }
  ], []);

  return (
    <div className="backdrop" onClick={hide}>
      <div className="LeadSourceContainer" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={hide}>
          <i className="fa-solid fa-xmark"></i>
        </div><br />
        <h2>Add Blocks</h2>
        <p style={{ marginTop: ".5rem" }}>
          click on a block to configure and add it in sequence.
        </p><br />
        <h2>Outreach</h2>
        <div className="source-container">
          {sourceBoxes.slice(0, 2).map(box => (
            <SourceBox key={box.id} type={box.type} className={box.className} heading={box.heading} desc={box.desc} />
          ))}
        </div><br />

        {(outreachs.length > 0 && outreachLastItem.type !== "wait") ? (
            <>
              <h1>Conditions</h1>
              <div className="source-container">
                {sourceBoxes.slice(2).map(box => (
                  <SourceBox key={box.id} type={box.type} className={box.className} heading={box.heading} desc={box.desc} />
                ))}
              </div>
              <br />
            </>
          ) : null
        
        }

      </div>  
    </div>
  );
};

export default SelectEmailAndDelay;
