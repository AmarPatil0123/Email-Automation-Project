import React, { useEffect } from 'react';
import './SourceBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { showSelectLeadContainer, closeLSContainer, closeOutreachContainer, showDelayContainer, } from '../features/LSContainer/LSContainer';
import { addSource } from '../features/LSContainer/SelectedSourceAndList';
import { addDelay, addEmail, addTask } from '../features/LSContainer/Outreach';

export const SourceBox = ({ className, heading, desc, id, type }) => {
  const delay = useSelector((state) => state.outreach.outreach);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Updated Outreach Array:', delay); 
  }, [delay]);

  function select(type) {
    if (type === 'email') {
      
      dispatch(addEmail());
      dispatch(closeOutreachContainer());
      return;
    } else if (type === 'task') {

      dispatch(addTask());
      dispatch(closeOutreachContainer());
      return;

    } else if (type === 'delay') {
      
      dispatch(closeOutreachContainer());
      dispatch(showDelayContainer());

    } else {

      if(id === "source-1"){
        dispatch(addSource({ id, className, heading, desc }));
        dispatch(closeLSContainer());
        dispatch(showSelectLeadContainer());
      }else{
        alert("Currently not accessible");
      }
      
    }
  }

  return (
    <div className="SourceBox" onClick={() => select(type)}>
      <div className="icon">
        <i className={className}></i>
      </div>
      <div className="data">
        <h2 className='heading'>{heading}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
};
