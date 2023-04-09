import { useState } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';
import Calendar from '../../components/Calendar';

function SetTimeSlots() {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeList, setTimeList] = useState([]);
  // const [timeError, setTimeError] = useState('');

  const removeElement = (index) => {
    const newTimes = timeList.filter((_, i) => i !== index);
    setTimeList(newTimes);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  const handleTimeChange = (newTime) => {
    // if (!newTime.meridiem) {
    //   setTimeError('Error: Please input hour, minute and meridiem');
    // } else {
    //   setTimeError('');
    // }
    setSelectedTime(newTime);
  };
  const handleAddTime = () => {
    // if (timeError === '') {

    // }
    setTimeList([...timeList, selectedTime]);
    setSelectedTime(null);
  };

  return (
    <Div className="app">
      <Div>
        <h4>1. Pick a date to view the timeslots</h4>
      </Div>
      <CalenderDiv>
        <StyledCalender onChange={setDate} value={date} />
      </CalenderDiv>

      <Div>
        <h4>2. Add or remove timeslots</h4>
      </Div>
      <Div>
        <h4>Choose a new timeslot </h4>
        <Div>
          <StyledTime
            value={selectedTime}
            onChange={handleTimeChange}
            clockIcon={null}
            clearIcon={null}
          />

          <Button variant="cancel" type="button" onClick={handleAddTime}>
            Add Time
          </Button>
          {/* <ErrorDiv>{timeError}{ setTimeError('')}</ErrorDiv> */}
          {timeList.length > 0 && (
            <ul>
              {timeList.map((time, index) => (
                <StyledLi key={index}>
                  {time} Pakistan Time
                  <DeleteButton
                    type="button"
                    onClick={() => removeElement(index)}
                  >
                    Delete
                  </DeleteButton>
                </StyledLi>
              ))}
            </ul>
          )}
        </Div>
      </Div>

      <Button variant="cancel" type="submit" onChange={onSubmitHandler}>
        Save Changes
      </Button>
    </Div>
  );
}

const Button = styled.button`
  text-align: start;
  font-size: 13px;
  color: white;
  text-align: center;
  width: 10%;
  border-radius: 13px;
  padding: 10px;
  margin: 10px;
  background-color: ${(props) =>
    props.variant === 'cancel' ? '#FFFFFF' : '#0B0B45'};
  color: ${(props) => (props.variant === 'cancel' ? '#0B0B45' : '#FFFFFF')};
`;

const DeleteButton = styled.button`
  text-align: start;
  font-size: 13px;
  background-color: white;
  color: red;
  text-align: center;
  width: 10%;
  border-radius: 13px;
  padding: 10px;
  margin-left: 5rem;
`;

const Div = styled.div`
  padding: 10px;
  margin: auto;
  align: left;
  text-align: center;
`;

const StyledLi = styled.li`
  font-size: 20px;
  color: white;
  list-style: none;
  padding: 1rem;
`;
const CalenderDiv = styled.div`
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  background-color: #0b0b45;
`;
const StyledCalender = styled(Calendar)`
  display: inline-flex;
  justify-content: center;
  background-color: #0b0b45;
  width: 100%;
`;
const StyledTime = styled(TimePicker)`
  display: inline-flex;
  font-size: 16px;
  padding: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  color: #fffffff;

  & input {
    background-color: white;
    width: 100%;
    font-size: 18px;
    font-weight: 500;
    color: blue;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;
export const ErrorDiv = styled.div`
  margin-left: 10rem;
  margin-bottom: 10px;
  font-size: 11px;
  color: red;
`;
export default SetTimeSlots;