import React from "react";
import {
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
} from "@heroicons/react/20/solid"
import Avatar from "./Avatar"
import { useLocalStorage } from "react-use"

export default function Widget({
  onToggleEditionMode,
  onClickProfile,
  isEditionMode,
}) {
  const [user] = useLocalStorage('reactor:user', '')
  return (
    <div className="inline-flex items-center rounded-md shadow-sm z-[9999]">
      {user && <button
        type="button"
        onClick={onToggleEditionMode}
        className={`relative h-full inline-flex items-center rounded-l-md border  ${
          isEditionMode
            ? "bg-green-700 border-green-600 hover:bg-green-800"
            : "bg-gray-900 border-gray-800 hover:bg-gray-800"
        } px-4 py-2 text-sm font-medium text-gray-50  focus:z-10 outline-0`}
      >
        {isEditionMode ? (
          <>
            <CheckIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-50"
              aria-hidden="true"
            />{" "}
            Done
          </>
        ) : (
          <>
            <ChatBubbleBottomCenterTextIcon
              className="h-5 w-5 text-indigo-700"
              aria-hidden="true"
            />
          </>
        )}
      </button>}
      <button
        type="button"
        onClick={onClickProfile}
        className={`group block flex-shrink-0 relative -ml-px items-center ${user ? 'rounded-r-md' : 'rounded-md'} border border-gray-800 bg-gray-900 px-3 py-2 text-sm font-medium text-gray-50 hover:bg-gray-800 focus:z-10 focus:outline-none focus:ring-0`}
      >
        <div className="flex items-center">
          <Avatar name={user} />  {!user && <span className="ml-2">Login to comment</span>}
        </div>
      </button>
    </div>
  );
}
