"use client";

import Navbar from "@/components/navbar/Navbar";
import fetchReservationByUser from "@/fetch/fetchReservationByUser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import deleteReservationById from "@/fetch/deleteReservationById";

interface Reservation{
    id: number,
    purpose: string,
    startedAt: Date,
    endedAt: Date,
    roomLocation: string,
    roomName: string,
    roomInfo: string,
    userName: string,
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

interface AlertDialogProps {
    reservationId: number;
    onConfirm: (reservationId: number) => void;
  }
  
const CancelAlertDialog: React.FC<AlertDialogProps> = ({ reservationId, onConfirm }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">
                    <Trash className="w-5 h-5" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the reservation.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onConfirm(reservationId)}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
  
const Reservation = () => {
    const params = useParams();
    const [ reservations, setReservations ] = useState<Reservation[]>([]);

    // TODO
    // Change the hardcode "1" to userid
    useEffect(() => {
        async function loadReservations() {
          try {
            const data = await fetchReservationByUser("1"); // FIXME
            setReservations(data);
          } catch (err) {
          }
        }
        loadReservations();
      }, []);

    const handleCancel=(reservationId:number) => {
        deleteReservationById(reservationId);
        window.location.reload();
    }

    return (
        <>
            <Navbar />
            <div className="pt-20 ml-20 mr-20">
                <div className="mb-5">
                    <h1> Your Reservations : </h1>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Room</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                                <TableCell className="font-medium">{reservation.roomName}</TableCell>
                                <TableCell>{reservation.purpose}</TableCell>
                                <TableCell>{mapper(reservation.roomLocation)}</TableCell>
                                <TableCell>{reservation.startedAt.toISOString().split('T')[0]}</TableCell>
                                <TableCell>{reservation.endedAt.toISOString().split('T')[0]}</TableCell>
                                <TableCell>
                                    <CancelAlertDialog reservationId={reservation.id} onConfirm={handleCancel} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </div>
        </>
        
    );
}

export default Reservation;
  