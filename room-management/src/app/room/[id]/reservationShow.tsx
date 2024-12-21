import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";

interface Event {
  title: string;
  start: Date;
  end: Date;
  id: number;
  purpose: string;
}

interface ReservationDialogProps {
  event: Event | null;
  setEvent: Dispatch<SetStateAction<Event | null>>;
}

const ReservationShowDialog: React.FC<ReservationDialogProps> = ({ event, setEvent }) => {
  const [isOpen, setIsOpen] = useState(!!event); 

  const handleDialogClose = () => {
    setEvent(null); 
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservation Info</DialogTitle>
        </DialogHeader>
        {event ? (
          <div>
            <p><strong>Name:</strong> {event.title}</p>
            <p><strong>Purpose:</strong> {event.purpose}</p>
            <p><strong>Start:</strong> {event.start.toLocaleDateString()}</p>
            <p><strong>End:</strong> {event.end.toLocaleDateString()}</p>
          </div>
        ) : (
          <p>No event selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationShowDialog;
