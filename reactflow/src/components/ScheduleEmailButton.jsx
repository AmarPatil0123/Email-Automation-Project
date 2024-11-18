import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Correct import for axios

export const ScheduleEmailButton = () => {
  // Select data from Redux state
  const source = useSelector((state) => state.selectedSourceAndLists.Source);
  const sourceList = useSelector((state) => state.selectedSourceAndLists.SelectedsourceList);
  const outreachData = useSelector((state) => state.outreach.outreach);

  // Filter and map outreach data
  const filteredOutreachData = outreachData
    .filter((data) => data.type !== "wait")
    .map((data) => {
      return {
        type: data.type,
        delay: {
          value: data.delay.value,
          unit: data.delay.unit,
        },
      };
    });

  // Prepare the data to be sent
  const createData = {
    Source: source.heading,
    SourceList: sourceList,
    Outreach: filteredOutreachData,
  };

  // Function to send data to the server
  async function sendData() {
    try {

      if(!createData.Source){
        alert("Add Source Block");
        return;
      }
      else if(createData.Outreach.length === 0){
        alert("Add outrich");
        return;
      }

      // Send a POST request
      await axios.post("https://emailautomationtool.onrender.com/sendEmail", createData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Emails sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  return (
    <div className='savebtn'>
      <button onClick={sendData}>
        <i className="fa-solid fa-rocket"></i>&nbsp;&nbsp;&nbsp;&nbsp;Save & Schedule
      </button>
    </div>
  );
};
