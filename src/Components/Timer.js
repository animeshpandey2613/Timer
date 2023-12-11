import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
function Timer() {
  const [userInput, setUserInput] = useState("");
  const [Time, setTime] = useState({
    Hour: 0,
    Minute: 0,
    Second: 0,
  });
  const [Start, setStart] = useState(false);
  const ChangeHandler = (event) => {
    setStart(false);
    if(event.target.value==="-"){
      return;
    };
    const value = event.target.value;
    setUserInput(value);
    const TimeObj = { ...Time };
    TimeObj.Second=0;
    TimeObj.Minute = +value % 60;
    TimeObj.Hour = Math.floor(+value / 60);
    setTime(TimeObj);
  };
  useEffect(() => {
    const Interval = setInterval(() => {
      if (Start === true) {

        
    if (Time.Second === 0 && Time.Minute === 0 && Time.Hour === 0) {
      setStart(false);
      return;
    }
    const TimeObj = { ...Time };
    if (Time.Second === 0 && Time.Minute === 0) {
      TimeObj.Hour--;
      TimeObj.Minute = 59;
      TimeObj.Second = 59;
    } else if (Time.Second === 0) {
      TimeObj.Minute--;
      TimeObj.Second = 59;
    } else {
      TimeObj.Second--;
    }
    setTime(TimeObj);
  };
    }, 1000);
    return ()=>clearInterval(Interval);
  }, [Start, Time]);
  return (
    <Container>
      <MinuteInput>
        <Text>Enter Minutes</Text>
        <input
          type="text"
          className="MinuteText"
          value={userInput}
          onChange={ChangeHandler}
        />
      </MinuteInput>
      <Counter>
        <Button
          onClick={() => {
            setStart(!Start);
          }}
        >
            {Start?(<FaCirclePause className="ButtonChange" />):(<FaCirclePlay className="ButtonChange" />)}
        </Button>
        <Counting>
          {Time.Hour<10?(`0${Time.Hour}`):(Time.Hour)}:{Time.Minute<10?(`0${Time.Minute}`):(Time.Minute)}:{Time.Second<10?(`0${Time.Second}`):(Time.Second)}
        </Counting>
      </Counter>
    </Container>
  );
}
const Container = styled.div`
  color: #05abcd;
  font-family: "Poppins", sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MinuteInput = styled.div``;
const Text = styled.div`
  font-size: 17px;
`;
const Counter = styled.div`
  margin-top: 2vw;
  display: flex;
  align-items: center;
  width: 25vw;
  justify-content: space-around;
`;
const Counting = styled.div`
  font-size: 4vw;
  width:20vw;
`;
const Button = styled.div``;
export default Timer;
