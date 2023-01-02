// import * as React from 'react';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import styles from "./ConfirmationModal.css";
// import { useRouter } from "next/router";
// import LinkIcon from '@mui/icons-material/Link';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import ReactGA from "react-ga4";

export default function ConfirmationModal(props) {

  const [userName, setUserName] = useState(props.userData && props.userData.display_name);
  const [userMobile, setUserMobile] = useState(props.userData && props.userData.mobile);
  
  const handelEdit = () => {
    if(!userName){
      alert('Please Provide userName');
    }
    else if(!userMobile){
      alert('Please Provide mobile');
    }
    else if((userMobile[0] === '9') && (userMobile.length >= 10) && ((userMobile.length <= 12)) && isNaN(userMobile) === false){
      axios
      .post(
        "http://localhost:8080/update/user-data",
        {
          userName: userName,
          mobile: userMobile,
          preUserName: props.userData.display_name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("User Updated SuccessFully");
        props.renderAgain();
      })
      .catch((err) => {
        console.log("Error in Updating User :", err);
        alert("Error in Updating User. Please Try Again!");
      });

      props.closeModal();
    }
    else{
      alert('Not a valid mobile number. Number should start with 9 and should contains 10-12 digits')
    }
  };


  return (
    <div>
      <Modal
        open={props.openModal}
        className='confirm-model-main'
        onClose={() => props.closeModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='model-container'>
          <label>
            User Name:
            <input type="text" name="userName" value={userName} onChange={(e) => {
              setUserName(e.target.value);
              }} />
          </label>
          <label>
            Mobile:
            <input type="text" name="mobile" value={userMobile} onChange={(e) => {
              setUserMobile(e.target.value);
              }} />
          </label>
          <button type="submit" value="Submit" onClick={handelEdit}>Submit</button>
        </div>
      </Modal>
    </div>
  );
}