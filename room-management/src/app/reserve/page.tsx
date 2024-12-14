"use client";
import Navbar from "@/components/navbar/Navbar";
import { useState } from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
import Link from "next/link";

interface Room {
    room: string; 
    available: boolean; 
}

interface FloorRooms {
    [key: string]: Room[]; 
}

const Reservation = () => {
    const [value, setValue] = useState("5F");
    const rooms:FloorRooms = {
        "5F": [
          { room: "511", available: true },
          { room: "512", available: false },
          { room: "513", available: true },
          { room: "514", available: true },
          { room: "515", available: false },
        ],
        "6F": [
          { room: "611", available: true },
          { room: "612", available: true },
          { room: "613", available: false },
          { room: "614", available: true },
          { room: "615", available: true },
        ],
        DS: [
          { room: "DS1", available: false },
          { room: "DS2", available: true },
        ],
      };
    
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
                        <ToggleGroupItem value="5F" className="text-xl">5F</ToggleGroupItem>
                        <ToggleGroupItem value="6F" className="text-xl">6F</ToggleGroupItem>
                        <ToggleGroupItem value="DS" className="text-xl">DS</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="pt-20">
                    <ul className="space-y-2">
                        {rooms[value]?.map((room) => (
                            <li
                                key={room.room}
                                className={`px-4 py-2 rounded-md ${
                                    room.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                                }`}
                            >
                                <Link href={`/room/${room.room}`} className="block">
                                    Room {room.room} - {room.available ? "Available" : "Occupied"}
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