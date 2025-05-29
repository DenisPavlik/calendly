"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm({ un }: { un?: string | null }) {
  const [username, setUsername] = useState(un || "");
  const router = useRouter();

  async function handlesubmit(ev: FormEvent) {
    ev.preventDefault();

    try {
      const response = await axios.put("/api/profile", { username });

      if (response.status === 200) {
        toast.success("Profile saved!");
        router.refresh();
      }
    } catch (error: any) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        toast.error("Unauthorized or bad request.");
      } else if (error.response?.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }
  return (
    <form onSubmit={handlesubmit} className="mx-auto max-w-xs mt-8">
      <label>
        <span>Username</span>
        <input
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <div className="text-center">
        <button type="submit" className="btn bg-blue-500 text-white !px-8">
          Save
        </button>
      </div>
    </form>
  );
}
