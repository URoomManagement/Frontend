"use client";
import Navbar from "@/components/navbar/Navbar";
import { useParams } from "next/navigation";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";

import ReservationDialog from "./reservation";
import fetchReservationByRoom from "@/fetch/fetchReservationByRoom";

interface Event {
  title: string;
  start: Date;
  end: Date;
}

export interface Reservation {
  id: number; 
  purpose: string; 
  startedAt: Date;
  endedAt: Date;  
  userName: string; 
}

export interface Reservations {
  roomLocation: string; 
  roomName: string; 
  roomInfo: string; 
  reservations: Reservation[];
}

const mapper = (location: string | undefined): string => {
  switch (location) {
    case "FIFTH_FLOOR":
      return "5F";
    case "SIXTH_FLOOR":
      return "6F";
    case "DATA_STATION":
      return "DS";
    default:
      return "";
  }
};

const localizer = momentLocalizer(moment);

const RoomPage = () => {
  const params = useParams();
  const id = String(params.id) ?? "";

  const [reservations, setReservations] = useState<Reservations>();

  useEffect(() => {
    async function loadReservations() {
      try {
        const data = await fetchReservationByRoom(id);
        setReservations(data);

        const events = data.reservations.map((reservation: Reservation) => ({
          title: reservation.userName, 
          start: new Date(reservation.startedAt), 
          end: new Date(reservation.endedAt), 
        }));
        setMyEventsList(events);
      } catch (err) {
      }
    }
    loadReservations();
  }, []);

  const [myEventsList, setMyEventsList] = useState<Event[]>([]);

  return (
    <div>
      <Navbar />
      <div className="pt-20 mx-auto max-w-4xl px-4 text-xl">
        <div className="flex justify-between mb-10">
          <div>
            <p>Room {reservations?.roomName}</p>
            <p>Location : {mapper(reservations?.roomLocation)}</p>
            <p>Info : {reservations?.roomInfo}</p>
          </div>
          <ReservationDialog eventList={myEventsList}/>
        </div>
        <div className="">
          <Calendar
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              views={["month"]}
              style={{ height: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
