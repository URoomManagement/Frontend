"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

interface Event {
  title: string;
  start: Date;
  end: Date;
}

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  eventList: Event[]
}

const DatePickerWithRange = ({
  className,
  date,
  setDate,
  eventList
}: DatePickerWithRangeProps) => {
  const disabledDates = eventList.map((event) => ({
    from: event.start,
    to: event.end,
  }));

  const handleDateSelect = (newRange: DateRange | undefined) => {
    console.log(newRange);
    if (!newRange) {
      console.log("here3");
      return;
    }
    const hasOverlap = disabledDates.some((disabledRange) => {
      const disabledStart = disabledRange.from;
      const disabledEnd = disabledRange.to;
  
      return (
        (newRange.from && newRange.from <= disabledEnd) &&
        (newRange.to && newRange.to >= disabledStart) 
      );
    });
  
    if (hasOverlap) {
      console.log("here2");
      alert("The selected range includes disabled dates!");
      setDate(undefined);
      return;
    }
    console.log("here");
    setDate(newRange);
  };
  
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[250px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            disabled={disabledDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerWithRange;
