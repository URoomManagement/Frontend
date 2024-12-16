"use client";
import Navbar from "@/components/navbar/Navbar";
import { useParams } from "next/navigation";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";

import ReservationDialog from "./reservation";
import fetchReservationByRoom from "@/fetch/fetchReservationByRoom";
import locationMapper from "@/util/locationMapper";

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
            <p>Location : {locationMapper(reservations?.roomLocation)}</p>
            <p>Info : {reservations?.roomInfo}</p>
          </div>
          <ReservationDialog eventList={myEventsList} roomId={Number(id)}/>
        </div>
        <div className="">
          <Calendar
              localizer={localizer}
              events={myEventsList}
              startAccessor="start"
              endAccessor="end"
              views={["month"]}
              style={{ height: 500 }}
              eventPropGetter={() => ({
                style: {
                  backgroundColor: "#4B5563", 
                  color: "white", 
                  borderRadius: "4px", 
                  border: "none", 
                },
              })}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
