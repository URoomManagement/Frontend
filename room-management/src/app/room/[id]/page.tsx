"use client";
import Navbar from "@/components/navbar/Navbar";
import { useParams } from "next/navigation";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

import ReservationDialog from "./reservation";

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const localizer = momentLocalizer(moment);

const RoomPage = () => {
  const params = useParams();
  const [myEventsList, setMyEventsList] = useState<Event[]>([
    {
      title: "Meeting",
      start: new Date(2024, 11, 14, 10, 0),
      end: new Date(2024, 11, 14, 12, 0),
    },
    {
      title: "Experiment",
      start: new Date(2025, 0, 1, 10, 0),
      end: new Date(2025, 0, 14, 12, 0),
    },
  ]);

  return (
    <div>
      <Navbar />
      <div className="pt-20 mx-auto max-w-4xl px-4 text-xl">
        
        <div className="flex justify-between mb-10">
            <p>Room no. : {params.id}</p>
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
