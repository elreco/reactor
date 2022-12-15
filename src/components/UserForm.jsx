import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function UserForm({ onSubmit, onLogout }) {
  const [user] = useLocalStorage("reactor:user", "");
  const [pseudo, setPseudo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      pseudo,
    });
  };
  return !user ? (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="pseudo"
        className="block text-lg font-medium text-gray-700"
      >
        Your pseudo
      </label>
      <div className="my-5">
        <input
          type="text"
          name="pseudo"
          autoFocus
          id="pseudo"
          value={pseudo}
          onChange={(event) => setPseudo(event.target.value)}
          className="block w-full rounded-md p-3 border-gray-300 shadow-sm border outline-none focus:border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Your pseudo (ex: Elon Musk)"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  ) : (
    <div className="mx-2">
      <p className="mb-4">
        You are logged in as <span className="font-semibold">{user}</span>
      </p>
      <button
        type="button"
        onClick={onLogout}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
}
