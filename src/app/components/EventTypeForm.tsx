"use client";
import TimeSelect from "@/app/components/TimeSelect";
import { BookingTimes, EventType, WeekdayName } from "@/libs/types";
import axios from "axios";
import clsx from "clsx";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import EventTypeDelete from "./EventTypeDelete";
import MeetingUri from "./MeetingURI";
import { WeekdaysNames } from "@/libs/shared";

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default function EventTypeForm({
  doc,
  username = "",
}: {
  doc?: EventType;
  username?: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(doc?.title || "");
  const [description, setDescription] = useState(doc?.description || "");
  const [length, setLength] = useState(doc?.length || 30);
  const [bookingTimes, setBookingTimes] = useState<BookingTimes>(
    doc?.bookingTimes || ({} as BookingTimes)
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

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    try {
      const id = doc?._id;
      const request = id ? axios.put : axios.post;
      const data = {
        title,
        description,
        length,
        bookingTimes,
      };

      const response = await request("/api/event-types", { ...data, id });
      if (response.data) {
        router.push("/dashboard/event-types");
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to create event", err);
    }
  }

  return (
    <form className="p-2 bg-gray-200 rounded-lg mt-4" onSubmit={handleSubmit}>
      {doc && (
        <MeetingUri
          uri={`${process.env.NEXT_PUBLIC_URL as string}/${username}/${
            doc.uri
          }`}
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>
            <span>title</span>
            <input
              required
              type="text"
              placeholder="title"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </label>
          <label>
            <span>description</span>
            <textarea
              required
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
              value={length}
              onChange={(ev) => setLength(parseInt(ev.target.value))}
            />
          </label>
        </div>
        <div>
          <span className="label">availability:</span> <br />
          <div className="grid gap-2">
            {WeekdaysNames.map((weekday, index) => {
              const from = bookingTimes?.[weekday]?.from;
              const to = bookingTimes?.[weekday]?.to;
              const active = bookingTimes?.[weekday]?.active;
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
      <div className="flex justify-center gap-2">
        {doc && <EventTypeDelete id={doc._id} />}
        <button type="submit" className="btn bg-blue-600 text-white !px-6">
          <Save />
          Save
        </button>
      </div>
    </form>
  );
}
