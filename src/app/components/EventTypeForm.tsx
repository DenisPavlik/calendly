"use client";
import TimeSelect from "@/app/components/TimeSelect";
import { BookingTimes, WeekdayName } from "@/libs/types";
import clsx from "clsx";
import { useState } from "react";

const WeekdaysNames: WeekdayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default function EventTypeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lenght, setLenght] = useState(30);
  const [bookingTimes, setBookingTimes] = useState<BookingTimes>(
    {} as BookingTimes
  );

  function handleBookingTimeChange(
    weekday: WeekdayName,
    val: string | boolean,
    prop: "from" | "to" | "active"
  ) {
    setBookingTimes((oldBookingTimes) => {
      const newBookingTimes: BookingTimes = { ...oldBookingTimes };
      if (!newBookingTimes[weekday]) {
        newBookingTimes[weekday] = {
          from: "00:00",
          to: "00:00",
          active: false,
        };
      }
      if (prop === "active" && typeof val === "boolean") {
        newBookingTimes[weekday].active = val;
      } else if (
        (prop === "from" || prop === "to") &&
        typeof val === "string"
      ) {
        newBookingTimes[weekday][prop] = val;
      }
      return newBookingTimes;
    });
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    alert('OK')
  }

  return (
    <form className="p-2 bg-gray-200 rounded-lg mt-4" onSubmit={handleSubmit}>
      create new event type:
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>
            <span>title</span>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </label>
          <label>
            <span>description</span>
            <textarea
              placeholder="description"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </label>
          <label>
            <span>enent lenght (minutes)</span>
            <input
              type="number"
              placeholder="30"
              value={lenght}
              onChange={(ev) => setLenght(parseInt(ev.target.value))}
            />
          </label>
        </div>
        <div>
          <span className="label">availability:</span> <br />
          <div className="grid gap-2">
            {WeekdaysNames.map((weekday, index) => {
              const from = bookingTimes?.[weekday]?.from;
              const to = bookingTimes?.[weekday]?.to;
              const active = bookingTimes?.[weekday]?.active
              return (
                <div key={index} className="grid grid-cols-2 items-center">
                  <label className="flex items-center gap-1 !mb-0 !p-0">
                    <input
                      type="checkbox"
                      value={1}
                      checked={bookingTimes?.[weekday]?.active}
                      onChange={(ev) =>
                        handleBookingTimeChange(
                          weekday,
                          ev.target.checked,
                          "active"
                        )
                      }
                    />
                    {capitalize(weekday)}
                  </label>
                  <div
                    className={clsx(
                      "inline-flex items-center gap-2 ml-2",
                      active ? "" : "opacity-40"
                    )}
                  >
                    <TimeSelect
                      value={from || "00:00"}
                      onChange={(val) =>
                        handleBookingTimeChange(weekday, val, "from")
                      }
                      step={30}
                    />
                    <span>-</span>
                    <TimeSelect
                      step={30}
                      value={to || "00:00"}
                      onChange={(val) =>
                        handleBookingTimeChange(weekday, val, "to")
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded-full"
        >
          Save
        </button>
      </div>
    </form>
  );
}
