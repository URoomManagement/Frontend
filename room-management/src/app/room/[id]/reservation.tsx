import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePickerWithRange from "@/components/daterangepicker/DaterangePicker";
import { useState } from "react"
import { DateRange } from "react-day-picker"
import createReservationByRoomAndId from "@/fetch/createReservationByRoomAndUser";
import convertTime from "@/util/convertTime";
import { useToast } from "@/hooks/use-toast";

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface ReservationDialogProps {
  eventList: Event[];
  roomId: number;
}

interface ReservationRequest{
  roomId: number;
  userId: number;
  purpose: string;
  startedAt: Date;
  endedAt:Date;
}

const ReservationDialog: React.FC<ReservationDialogProps> = ({ eventList, roomId }) => {
  const [ purpose, setPurpose ] = useState("");
  const [ date, setDate ] = useState<DateRange | undefined>(undefined);
  const [isOpen, setIsOpen ] = useState(false);
  const { toast } = useToast();
  
  const handleProposeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurpose(event.target.value);
  };

  const handleReservedDialog = () => {
    const reservation: ReservationRequest = {
      roomId,
      userId: 1,
      purpose,
      startedAt: convertTime(date!.from as Date),
      endedAt: convertTime(date!.to as Date),
    };
    createReservationByRoomAndId(reservation)
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="border-2 border-gray-800" variant="outline">Reserve</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reservation</DialogTitle>
          <DialogDescription>
            Specify the date and purpose! 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Date
            </Label>
            <DatePickerWithRange 
              className="w-[200px]" 
              date={date} 
              setDate={setDate} 
              eventList={eventList}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Purpose
            </Label>
            <Input 
              id="username" 
              value={purpose} 
              onChange={handleProposeChange}
              className="col-span-3 w-[250px]" />
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="submit"
            onClick={handleReservedDialog}
          >
            Reserve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ReservationDialog;
