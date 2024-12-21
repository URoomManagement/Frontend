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
import locationMapper from "@/util/locationMapper";
import { useAuth } from "@/contexts/AuthContext";

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
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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
    const { user } = useAuth();
    const [ reservations, setReservations ] = useState<Reservation[]>([]);
    const [error, setError] = useState<Error|null>(null);

    useEffect(() => {
        async function loadReservations() {
          try {
            const data = await fetchReservationByUser(user!.id); 
            setReservations(data);
            setError(null);
          } catch (err:any) {
            setError(err);
          }
        }
        loadReservations();
      }, []);

    const handleCancel=(reservationId:number) => {
        deleteReservationById(reservationId);
        window.location.reload();
    }

    if(error){
        throw error;
    }

    return (
        <>
            <Navbar />
            <div className="pt-20 ml-20 mr-20">
                <div className="mb-5">
                    <h1> My Reservations : </h1>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px] text-center">Room</TableHead>
                        <TableHead className="text-center">Purpose</TableHead>
                        <TableHead className="text-center">Location</TableHead>
                        <TableHead className="text-center">Start</TableHead>
                        <TableHead className="text-center">End</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <TableRow key={reservation.id}>
                                <TableCell className="font-medium text-center">{reservation.roomName}</TableCell>
                                <TableCell>{reservation.purpose}</TableCell>
                                <TableCell className="text-center">{locationMapper(reservation.roomLocation)}</TableCell>
                                <TableCell className="text-center">{reservation.startedAt.toLocaleString().split(',')[0]}</TableCell>
                                <TableCell className="text-center">{reservation.endedAt.toLocaleString().split(',')[0]}</TableCell>
                                <TableCell className="text-center">
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
  