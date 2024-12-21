"use client";
import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"
import Link from "next/link";
import fetchRoomsByLocation from "@/fetch/fetchRoomByLocation";
import Image from "next/image";
import images from "@/assets";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

    const getImage = () => {
        if (value === "FIFTH_FLOOR") return images.fifth_floor;
        if (value === "SIXTH_FLOOR") return images.sixth_floor;
        return null;
    };
    const image = getImage();
    return (
        <div>
            <Navbar />
            <div className="py-20 mx-[200px]">
                <div>
                    <ToggleGroup 
                        type="single" 
                        onValueChange={(value) =>{
                            setValue(value);
                        }}
                        defaultValue="FIFTH_FLOOR"
                        className="gap-4"
                    >
                        <ToggleGroupItem value="FIFTH_FLOOR" className="text-xl">5F</ToggleGroupItem>
                        <ToggleGroupItem value="SIXTH_FLOOR" className="text-xl">6F</ToggleGroupItem>
                        <ToggleGroupItem value="DATA_STATION" className="text-xl">DS</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="">
                    {image && (
                        <div className="flex justify-center">
                        <Image
                            src={image}
                            alt={value}
                            width={640}
                            height={4800}
                            className="rounded-md"
                        />
                        </div>
                    )}
                    <ul className="space-y-2">
                        {rooms?.map((room) => (
                            <li key={room.id}>
                                <Link href={`/room/${room.id}`} className="block">
                                    <Card className="p-2 hover:shadow-lg hover:bg-gray-100">
                                        <CardHeader>
                                            <CardTitle>Room {room.name}</CardTitle>
                                            <CardDescription>{room.info}</CardDescription>
                                        </CardHeader>
                                    </Card>
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