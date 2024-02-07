import "../css/mainPage.css";
import { getRequest } from "../api/get";
import { question } from "../api/path";
import { useState } from "react";
import { useEffect } from "react";

const date= new Date();
let options = {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Asia/Kathmandu',
  hourCycle: 'h12'
};
export default function MainPage() {
  const [inputText, setInputText] = useState("");
  const [msgArray, setMsgArray] = useState([
    {
      isResponse: true,
      msg: "Hi I'm Ai dewata, who knows almost everything in that exist on the internet. You can ask me anything related to science, studies and happiness 😊",
      time: date.toLocaleString('en-US', options),
    },
  ]);
  const [isLoadingMsg, setIsLoadingMsg]= useState(false)
  useEffect(()=>{
    console.log(date.toLocaleString('en-US', options));
  })
  const handleSubmit = async (e) => {
    // setMsgArray([...msgArray, {isResponse:false, msg:inputText, time:date.toLocaleString('en-US', options)}])
    setMsgArray(pre=>[...pre, {isResponse:false, msg:inputText, time:date.toLocaleString('en-US', options)}])
    setInputText("");
    setIsLoadingMsg(true)
    const responseTxt= await getRequest(question + `/?question=${inputText}`);
    // setMsgArray([...msgArray, {isResponse:true, msg: responseTxt, time: date.toLocaleString('en-US', options)}]);
    setMsgArray(pre=>[...pre, {isResponse:true, msg: responseTxt, time: date.toLocaleString('en-US', options)}])
    setIsLoadingMsg(false)
  };

  return (
    <div className="container">
      <h3 className=" text-center">Ai Dewata</h3>
      <div className="messaging">
        <div className="mesgs">
          <div className="msg_history">
            {msgArray.map((msg, index) =>
              msg.isResponse ? (
                <RecivedMessage key={index} msg={msg.msg} time={msg.time} />
              ) : (
                <SentMessage key={index} msg={msg.msg} time={msg.time} />
              )
            )}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input
                type="text"
                className="write_msg"
                placeholder="Type a message"
                value={inputText}
                onInput={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !isLoadingMsg && handleSubmit()}
              />
              <button
                className="msg_send_btn"
                type="button"
                onClick={()=> !isLoadingMsg && handleSubmit}
              >
                <i className="fa fa-paper-plane-o" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SentMessage = ({msg, time}) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg}</p>
        <span className="time_date">{time}</span>{" "}
      </div>
    </div>
  );
};

const RecivedMessage = ({msg, time}) => {
  return (
    <div className="received_msg">
      <div className="received_withd_msg">
        <p>{msg}</p>
        <span className="time_date">{time}</span>
      </div>
    </div>
  );
};
