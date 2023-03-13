import React from "react";
import styled from "styled-components";

export default function Seats({ seats, setSeats }) {
  function handleSeatClick(seatName) {
    const newSeats = seats.map((seat) => {
      if (seat.name === seatName) {
        return { ...seat, isSelected: !seat.isSelected };
      } else {
        return seat;
      }
    });
    setSeats(newSeats);
  }

  return (
    <StyledSeats>
      {seats.map((seat) => (
        <SeatItem
          data-test="seat"
          key={seat.name}
          isAvailable={seat.isAvailable}
          isSelected={seat.isSelected}
          onClick={() => {
            if (seat.isAvailable) {
              handleSeatClick(seat.name);
            } else {
              alert("Esse assento não está disponível");
            }
          }}
        >
          {seat.name}
        </SeatItem>
      ))}
    </StyledSeats>
  );
}

const SeatItem = styled.div`
  border: ${(seat) =>
    seat.isSelected
      ? "1px solid #0E7D71"
      : seat.isAvailable
      ? "1px solid #808F9D"
      : "1px solid #F7C52B"};
  background-color: ${(seat) =>
    seat.isSelected
      ? "#1AAE9E"
      : seat.isAvailable
      ? "#C3CFD9  "
      : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;

const StyledSeats = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
