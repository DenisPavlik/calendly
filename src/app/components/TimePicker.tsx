"use client";
import { shortWeekdays } from "@/libs/shared";
import { BookingTimes, WeekdayName } from "@/libs/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addDays,
  addMinutes,
  addMonths,
  endOfDay,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
  isLastDayOfMonth,
  isToday,
  startOfDay,
  subMonths,
} from "date-fns";
import clsx from "clsx";
import Link from "next/link";
import axios from "axios";
import { TimeSlot } from "nylas";
import Preloader from "./Preloader";

export default function TimePicker({
  bookingTimes,
  length,
  username,
  meetingUri,
}: {
  bookingTimes: BookingTimes;
  length: number;
  username: string;
  meetingUri: string;
}) {
  const currentDate = new Date();
  const [activeMonthDate, setActiveMonthDate] = useState(currentDate);
  const [activeYear, setActiveYear] = useState(activeMonthDate.getFullYear());
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    activeMonthDate.getMonth()
  );
  const [selectedDay, setSelectedDay] = useState<null | Date>(null);
  const [busySlots, setBusySlots] = useState<TimeSlot[]>([]);
  const [busySlotsLoaded, setBusySlotsLoaded] = useState(false);

  useEffect(() => {
    if (selectedDay) {
      setBusySlots([]);
      setBusySlotsLoaded(false);
      const params = new URLSearchParams();
      params.set("username", username);
      params.set("from", startOfDay(selectedDay).toISOString());
      params.set("to", endOfDay(selectedDay).toISOString());
      axios.get("/api/busy?" + params.toString()).then((response) => {
        setBusySlots(response.data);
        setBusySlotsLoaded(true);
      });
    }
  }, [selectedDay, username]);

  function checkBusySlots(time: Date) {
    const bookingFrom = time;
    const bookingTo = addMinutes(new Date(time), length);
    for (let busySlot of busySlots) {
      const busyFrom = new Date(parseInt(busySlot.startTime) * 1000);
      const busyTo = new Date(parseInt(busySlot.endTime) * 1000);
      if (isAfter(bookingTo, busyFrom) && isBefore(bookingTo, busyTo)) {
        return true;
      }
      if (isAfter(bookingFrom, busyFrom) && isBefore(bookingFrom, busyTo)) {
        return true;
      }
      if (isEqual(bookingFrom, busyFrom)) {
        return true;
      }
      if (isEqual(bookingFrom, busyTo)) {
        return true;
      }
    }
    return false;
  }

  const firstDayOfCurrentMonth = new Date(activeYear, activeMonthIndex, 1);
  const firstDayOfCurrentMonthWeekdayIndex = getDay(firstDayOfCurrentMonth);
  const emptyDaysCount =
    firstDayOfCurrentMonthWeekdayIndex === 0
      ? 6
      : firstDayOfCurrentMonthWeekdayIndex - 1;

  const emptyDaysArr = new Array(emptyDaysCount).fill("", 0, emptyDaysCount);

  const daysNumbers = [firstDayOfCurrentMonth];

  do {
    const lastAddedDay = daysNumbers[daysNumbers.length - 1];
    daysNumbers.push(addDays(lastAddedDay, 1));
  } while (!isLastDayOfMonth(daysNumbers[daysNumbers.length - 1]));

  const bookingHours = []; // array of our avaiable booking times
  let selectedDayConfig = null; // our selected day (from, to, active, _id)
  if (selectedDay) {
    const weekdayNameIndex = format(
      selectedDay,
      "EEEE"
    ).toLowerCase() as WeekdayName; // ("tusday")

    selectedDayConfig = bookingTimes?.[weekdayNameIndex];
    //our weekdayNameIndex day("tusday") => (from, to, active, _id);

    if (selectedDayConfig) {
      const [hoursFrom, minutesFrom] = selectedDayConfig.from.split(":"); // to get (hh:mm)
      const [hoursTo, minutesTo] = selectedDayConfig.to.split(":"); // to get (hh:mm)

      const selectedDayFrom = new Date(selectedDay);
      selectedDayFrom.setHours(parseInt(hoursFrom));
      selectedDayFrom.setMinutes(parseInt(minutesFrom));

      const selectedDayTo = new Date(selectedDay);
      selectedDayTo.setHours(parseInt(hoursTo));
      selectedDayTo.setMinutes(parseInt(minutesTo));

      let a = selectedDayFrom;

      do {
        if (!checkBusySlots(a)) {
          bookingHours.push(a);
        }

        a = addMinutes(a, 30);
      } while (isBefore(addMinutes(a, length), selectedDayTo));
    }
  }

  function prevMonth() {
    setActiveMonthDate((prev) => {
      const newActiveMonthDate = subMonths(prev, 1);
      setActiveYear(newActiveMonthDate.getFullYear());
      setActiveMonthIndex(newActiveMonthDate.getMonth());

      return newActiveMonthDate;
    });
  }

  function nextMonth() {
    setActiveMonthDate((prev) => {
      const newActiveMonthDate = addMonths(prev, 1);
      setActiveYear(newActiveMonthDate.getFullYear());
      setActiveMonthIndex(newActiveMonthDate.getMonth());
      return newActiveMonthDate;
    });
  }

  function handleDayClick(day: Date) {
    setSelectedDay(day);
  }

  return (
    <div className="flex justify-center">
      <div className="p-8">
        <div className="flex items-center">
          <span className="grow">
            {format(new Date(activeYear, activeMonthIndex, 1), "MMMM")}{" "}
            {activeYear}
          </span>

          <div className="flex items-center gap-1">
            <button onClick={prevMonth}>
              <ChevronLeft />
            </button>
            <button onClick={nextMonth}>
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="inline-grid grid-cols-7 gap-2 mt-2">
          {shortWeekdays.map((weekday, index) => (
            <div
              key={index}
              className="text-center uppercase text-sm text-gray-500 font-semibold"
            >
              {weekday}
            </div>
          ))}
          {emptyDaysArr.map((empty, index) => (
            <div key={index} />
          ))}
          {daysNumbers.map((n, index) => {
            const weekdayNameIndex = format(
              n,
              "EEEE"
            ).toLocaleLowerCase() as WeekdayName;
            const weekDayConfig = bookingTimes?.[weekdayNameIndex];
            const isActiveInBookingTimes = weekDayConfig?.active;
            const canBeBooked = isFuture(n) && isActiveInBookingTimes;
            const isSelected = selectedDay && isEqual(n, selectedDay);

            return (
              <div
                key={index}
                className="text-center text-sm text-gray-400 font-semibold"
              >
                <button
                  disabled={!canBeBooked}
                  className={clsx(
                    "rounded-full w-8 h-8 inline-flex items-center justify-center",
                    canBeBooked && !isSelected
                      ? "bg-blue-200 text-blue-700"
                      : "",
                    isToday(n) && !isSelected
                      ? "bg-gray-200 text-gray-500"
                      : "",
                    isSelected ? "bg-blue-500 text-white" : ""
                  )}
                  onClick={() => handleDayClick(n)}
                >
                  {format(n, "d")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {selectedDay && (
        <div className="py-8 w-48">
          <span className="pr-4">{format(selectedDay, "EEEE, MMMM d")}</span>
          <div className="grid gap-1.5 py-2 max-h-64 overflow-auto pr-2">
            {!busySlotsLoaded && <Preloader />}
            {busySlotsLoaded &&
              bookingHours.map((bookingTime, index) => (
                <div key={index}>
                  <Link
                    href={`/${username}/${meetingUri}/${bookingTime.toISOString()}`}
                    className="px-8 border-2 rounded-lg border-blue-600
                  text-blue-600 font-semibold hover:bg-blue-500 hover:text-white
                  hover:cursor-pointer duration-300"
                  >
                    {format(bookingTime, "HH:mm")}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
