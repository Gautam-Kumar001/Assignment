import "./Cards.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function Cards({ userData, renderAgain }) {

    const [openModal, setCloseModal] = useState(false);
    const [elementKey, setElementKey] = useState();


  const handelDelete = (e) => {
    const userName = e.target.dataset.name
    const fileName = e.target.dataset.image

    axios
      .post(
        "http://localhost:8080/delete/user-data",
        {
          userName: userName,
          fileName: fileName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        renderAgain();
        alert("User deleted SuccessFully");
      })
      .catch((err) => {
        console.log("Error in deleting User :", err);
        alert("User not deleted. Try Again!");
      });
  };

  return (
    <>
        <div className="main-cards">
        {userData.map((ele, ind) => (
            <div className="polaroid" key={ind}>
            <img src="/logo192.png" alt="Norway" style={{ width: "100%" }} />
            <div className="container">
                <span style={{ width: "100%", padding: "5px 0" }}>
                Name : {ele.display_name}
                </span>
                <span style={{ width: "100%", padding: "5px 0" }}>
                Phone : {ele.mobile}
                </span>
                <div className="buttons">
                <button
                    type="submit"
                    className="delete-button"
                    data-name={ele.display_name}
                    data-image={ele.image}
                    data-mobile={ele.mobile}
                    onClick={handelDelete}
                >
                    Delete
                </button>
                <button
                    type="submit"
                    className="edit-button"
                    data-name={ele.display_name}
                    data-image={ele.image}
                    data-mobile={ele.mobile}
                    data-ind={ind}
                    onClick={(e) => {
                        setCloseModal(true);
                        setElementKey(e.target.dataset.ind);
                    }}
                >
                    Edit
                </button>
                </div>
            </div>
            </div>
        ))}
        </div>
        <ConfirmationModal openModal={openModal} userData={userData[elementKey]} closeModal={() => setCloseModal(false)} renderAgain={renderAgain} />
    </>
  );
}

export default Cards;
