"use client";
import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
import Link from "next/link";
import fetchRoomsByLocation from "@/fetch/fetchRoomByLocation";

interface Room {
    id: number;
    room: string;
    name: string;
    info: string;
}

const Reservation = () => {
    const [value, setValue] = useState("FIFTH_FLOOR");
    const [rooms, setRooms] = useState<Room[]>([]);
    useEffect(() => {
        async function loadRooms() {
          try {
            const data = await fetchRoomsByLocation(value);
            setRooms(data);
          } catch (err) {
          }
        }
        loadRooms();
    }, [value]);
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <div>
                    <ToggleGroup 
                        type="single" 
                        onValueChange={(value) =>{
                            setValue(value);
                        }}
                        defaultValue="5F"
                        className="gap-4"
                    >
                        <ToggleGroupItem value="FIFTH_FLOOR" className="text-xl">5F</ToggleGroupItem>
                        <ToggleGroupItem value="SIXTH_FLOOR" className="text-xl">6F</ToggleGroupItem>
                        <ToggleGroupItem value="DATA_STATION" className="text-xl">DS</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="pt-20">
                    <ul className="space-y-2">
                    {rooms?.map((room) => (
                        <li
                            key={room.id}
                            className={"px-4 py-2 rounded-md bg-green-200 text-green-800"}
                        >
                            <Link href={`/room/${room.id}`} className="block">
                                <p>
                                    <strong>Room {room.room}:</strong> {room.name}
                                </p>
                                <p>{room.info}</p>
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Reservation;