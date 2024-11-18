import React from 'react';
import "./App.css";
import FlowContainer from './components/FlowContainer';
import { LeadSourceContainer } from './components/LeadSourceContainer';
import { useSelector } from 'react-redux';
import LeadList from './components/SelectLeadList';
import SelectEmailAndDelay from './components/selectEmailAndDelay';
import SelectDelay from './components/SelectDelay';
import EditSelectedLists from './components/EditSelectLeadList';
import { ScheduleEmailButton } from './components/ScheduleEmailButton';

function App() {
  const toggle = useSelector((state) => state.LSContainer.toggleLSContainer); // Access state.counter.toggleLSContainer
  const toggleselectedLead = useSelector((state) => state.LSContainer.toggleSelectLead); // Access state.counter.toggleLSContainer
  const toggleOutreach = useSelector((state) => state.LSContainer.toggleOutreach); // Access state.counter.toggleLSContainer 
  const toggleDelay = useSelector((state)=>state.LSContainer.toggleDelay);
  const toggleEditSLContainer = useSelector((state)=>state.LSContainer.toggleEditSelectedList);

  return (
    <div style={{ width: "100%", height: "100%" }}>

      {/* Navbar */}
      <nav style={{ height: "80px", padding: "0rem 1rem", border: "2px solid black" }}>Navbar</nav> 

      <div style={{ margin: "8rem 3rem 6rem 3rem", height: "80vh", borderRadius:"200px", }}>

        {/* Schedule Email Button*/}
        <div className="save">
          <div className='username'>
            <h2 >Username &nbsp;&nbsp;<i className="fa-solid fa-pencil"></i> </h2  >
            <p>Click on a block to configure and it in a Sequence.</p>
          </div>
          <ScheduleEmailButton/>

        </div>
        <FlowContainer />

      </div>

      {toggle ? <LeadSourceContainer /> : null}
      {toggleselectedLead ? <LeadList/> : null}
      {toggleOutreach ? <SelectEmailAndDelay/> : null}
      {toggleDelay ? <SelectDelay /> : null};
      {toggleEditSLContainer ? <EditSelectedLists /> : null}
    </div>
  );
}

export default App;
