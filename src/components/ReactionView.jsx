import React from "react"
import moods from "./moods"
import { TrashIcon } from "@heroicons/react/20/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReactionView({ reaction, onDelete }) {
  const selectedMood = moods.find(mood => mood.value === reaction.mood?.value)
 return (
  <div className="overflow-hidden text-white py-4 px-5 w-[300px] shadow-lg rounded-lg bg-gray-900 focus-within:border-indigo-700 focus-within:ring-1 focus-within:ring-indigo-700">
    <div className="flex justify-between">
      <p className="font-semibold text-base mb-3">
      {reaction.user}
      </p>
      <button type="button" onClick={() => onDelete(reaction.value)}>
        <TrashIcon
            className="h-5 w-5 text-indigo-700 hover:text-indigo-800"
            aria-hidden="true"
          />
      </button>
    </div>

    <p className="italic text-sm mb-6">
    {reaction.comment}
    </p>
    {reaction.mood && <div className="flex items-center">
      <div
        className={classNames(
          reaction.mood.bgColor,
          'w-8 h-8 rounded-full flex items-center justify-center'
        )}
      >
        <selectedMood.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
      </div>
      <span className="ml-3 block truncate font-medium">{reaction.mood.name}</span>
    </div>}
  </div>
 )
}