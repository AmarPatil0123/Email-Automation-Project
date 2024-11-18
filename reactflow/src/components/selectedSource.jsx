import React from 'react';
import './selectedSource.css';
import { useDispatch, useSelector } from 'react-redux';
import { Handle, Position } from 'reactflow';
import { showEditSelectedListContainer, } from '../features/LSContainer/LSContainer';
import { deleteSource, deleteSourceList } from '../features/LSContainer/SelectedSourceAndList';

const handleStyle = {
  background: 'black',
  width: '5px', 
  height: '5px', 
  borderRadius: '50%',
};

export const SelectedSource = () => {
  const { className, heading, id } = useSelector(
    (state) => state.selectedSourceAndLists.Source
  );

  const dispatch = useDispatch();

  const sourceList = useSelector((state) => state.selectedSourceAndLists.SelectedsourceList)

  function showEditContainer() {
    dispatch(showEditSelectedListContainer());
  }

  function handleDeleteSource() {
    dispatch(deleteSource());
    dispatch(deleteSourceList()) 
  }
  

  if (!id) {
    return null;
  }

  return (
    <>

      <div className='container' id={id}>
        <div className="icons">
          <i className={className}></i>
        </div>
        <div className="data">
          <h4>Leads from</h4>
          <div className='lists'>
            {sourceList.map((list, index) => {
              return (
                <p key={index}>{list}</p> // <p> now inside a <div>, which is valid
              );
            })}
          </div>

        </div>
        <div className='editOrDelete'>
          <i className="fas fa-edit edit" onClick={showEditContainer}></i> &nbsp;&nbsp;
          <i className="fa-solid fa-square-xmark delete" onClick={handleDeleteSource}></i>
        </div>
      </div>
      <Handle
        type="source" // This is a source handle, allows connecting to it
        position={Position.Bottom}
        id="a" // Ensure this id matches with edges' source or target
        style={handleStyle}
      />
    </>

  );
};
