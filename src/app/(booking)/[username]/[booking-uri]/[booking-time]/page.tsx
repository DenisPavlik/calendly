"use client";
import axios from "axios";
import { format } from "date-fns";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
    "booking-time": string;
  };
};

export default function BookingFormPage(props: PageProps) {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const username = props.params.username;
  const bookingUri = props.params["booking-uri"];
  const bookingTime = new Date(
    decodeURIComponent(props.params["booking-time"])
  );

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const data = {
      guestEmail,
      guestName,
      guestNotes,
      username,
      bookingUri,
      bookingTime,
    };
    try {
      const response = await axios.post("/api/bookings", data);
      if (response.status === 201) {
        toast.success("Success! ✅");
        setConfirmed(true);
      }
    } catch (e: any) {
      console.error("Booking error:", e);
      const errorMsg = e.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
    }
  }
  return (
    <div className="text-left p-8 min-w-[400px]">
      <h2 className="mb-4 pb-2 border-b border-black/10 text-2xl font-bold text-gray-500">
        {format(bookingTime, "EEEE, MMMM, dd, HH:mm")}
      </h2>
      {confirmed && (
        <div className="text-center text-blue-600 pt-4">
          <h1 className="text-xl font-semibold ">Congratulations! 😃</h1>
          <h2 className="text-lg font-semibold">
            You just booked meeting with {username}
          </h2>
          <p className="text-gray-400 text-sm">
            Check google meet to view your upcoming meeting
          </p>
        </div>
      )}
      {!confirmed && (
        <form onSubmit={handleSubmit}>
          <label>
            <span>your name</span>
            <input
              type="text"
              placeholder="John Doe"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </label>
          <label>
            <span>your email</span>
            <input
              type="email"
              placeholder="test@example.com"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
          </label>
          <label>
            <span>any message?</span>
            <textarea
              placeholder="Hey, I just wanted to ...  (optional)"
              value={guestNotes}
              onChange={(e) => setGuestNotes(e.target.value)}
            />
          </label>
          <div className="text-right">
            <button type="submit" className="btn bg-blue-500 text-white">
              Confirm
            </button>
          </div>
        </form>
      )}
      {/* <pre>
        {JSON.stringify({ bookingTime, bookingUri, username }, null, 2)}
      </pre> */}
    </div>
  );
}
