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
import { addDays } from "date-fns"
import { useState } from "react"
import { DateRange } from "react-day-picker"

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface ReservationDialogProps {
  eventList: Event[];
}

const ReservationDialog: React.FC<ReservationDialogProps> = ({ eventList }) => {
  const [ purpose, setPurpose ] = useState("");
  const [ date, setDate ] = useState<DateRange | undefined>(undefined);
  const [isOpen, setIsOpen ] = useState(false);
  
  const handleProposeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurpose(event.target.value);
  };
  const handleReservedDialog = () => {
    alert("It is already reserved!");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Reservation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reservation</DialogTitle>
          <DialogDescription>
            Reserve
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
