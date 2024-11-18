import React from 'react';
import './selectedSource.css';
import { useSelector, useDispatch } from 'react-redux';
import { Handle, Position } from 'reactflow';
import { deleteOutreachNode } from '../features/LSContainer/Outreach';


const handleStyle = {
  background: 'black',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
};

export const OutreachNode = ({ data }) => {
  const dispatch = useDispatch();

  
  const deleteNode = (id) => {
    dispatch(deleteOutreachNode(id)); 
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id={`${data.id}-top-handle`}
        style={handleStyle}
      />
      <div className="container" key={data.id} id={data.id}>
        <div className="icons">
          <i className={data.className}></i>
        </div>
        <div className="data">
          {data.delay.value === null || data.type === 'email' || data.type === 'task' || data.type === 'event' ? (
            <h4>{data.heading}</h4>
          ) : (
            <>
              <h4>Delay</h4>
              <p style={{ color: 'blue' }}>{`Wait ${data.delay.value} ${data.delay.unit}`}</p>
            </>
          )}
        </div>
        <div className="editOrDelete" onClick={()=>data.onDelete()}>
          <i className="fa-solid fa-square-xmark delete"></i>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${data.id}-bottom-handle`}
        style={handleStyle}
      />
    </>
  );
};
