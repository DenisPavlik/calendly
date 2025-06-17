"use client";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EventTypeDelete({id}: {id:string | undefined}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    await axios.delete('/api/event-types?id=' + id);
    router.push('/dashboard/event-types');
    router.refresh();
  }
  return (
    <div>
      <button
        type="button"
        className="btn bg-red-600 text-white my-4"
        onClick={() => setShowConfirmation(true)}
      >
        <Trash2 />
        Delete
      </button>
      {showConfirmation && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
    <div className="bg-gray-200 p-6 rounded-lg shadow-xl">
      <h1 className="text-black text-xl mb-4">
        Are you sure that you want to delete this?
      </h1>
      <div className="flex items-center justify-center gap-4">
        <button
          className="btn bg-gray-600 text-white"
          onClick={() => setShowConfirmation(false)}
        >
          Cancel
        </button>
        <button onClick={() => handleDelete()} className="btn bg-red-600 text-white">Delete</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
