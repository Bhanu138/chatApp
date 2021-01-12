import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const nameRef = React.createRef();
  const getChatrooms = () => {
    axios
      .get("http://localhost:4000/chatroom", {
        body: {
         token : localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 5000);
        console.log("requestedd");
      });
  };

  React.useEffect(() => {
    getChatrooms();
    // eslint-disable-next-line
  }, []);

  const createChatroom = () => {
    const name = nameRef.current.value;
    axios.post("http://localhost:4000/", {
      token : localStorage.getItem("CC_Token"),
      name
    }).then(res => {
      console.log(`${name} created`);
    }).catch(err => {
      console.log(err);
      console.log("Chat room creation failed");
    })
  }
  return (
    <div className="card">
      <div className="cardHeader">Chatrooms</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            placeholder="ChatterBox Nepal"
            ref={nameRef}
          />
        </div>
      </div>
      <button onClick={createChatroom}>Create Chatroom</button>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom._id}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;