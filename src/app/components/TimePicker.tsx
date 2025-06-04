"use client";
import { shortWeekdays } from "@/libs/shared";
import { BookingTimes, WeekdayName } from "@/libs/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  addDays,
  addMonths,
  format,
  getDay,
  isEqual,
  isFuture,
  isLastDayOfMonth,
  isToday,
  subMonths,
} from "date-fns";
import clsx from "clsx";

export default function TimePicker({
  bookingTimes,
}: {
  bookingTimes: BookingTimes;
}) {
  const currentDate = new Date();
  const [activeMonthDate, setActiveMonthDate] = useState(currentDate);
  const [activeYear, setActiveYear] = useState(activeMonthDate.getFullYear());
  const [activeMonthIndex, setActiveMonthIndex] = useState(
    activeMonthDate.getMonth()
  );
  const [selectedDay, setSelectedDay] = useState<null | Date>(null);

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

  let selectedDayConfig = null;
  if (selectedDay) {
    const weekdayNameIndex = format(
      selectedDay,
      "EEEE"
    ).toLocaleLowerCase() as WeekdayName;
    selectedDayConfig = bookingTimes?.[weekdayNameIndex];
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
    <div className="flex gap-4">
      <div className="">
        <div className="flex items-center">
          <span className="grow">
            {format(new Date(activeYear, activeMonthIndex, 1), "MMMM")}{" "}
            {activeYear}
          </span>
          <button onClick={prevMonth}>
            <ChevronLeft />
          </button>
          <button onClick={nextMonth}>
            <ChevronRight />
          </button>
          {/* {emptyDaysCount}
          {JSON.stringify(firstDayOfCurrentMonthWeekdayIndex)} */}
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
      <div className="max-w-3">
        <pre>{JSON.stringify(selectedDayConfig, null, 2)}</pre>
      </div>
    </div>
  );
}
