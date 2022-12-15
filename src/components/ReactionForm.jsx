import React from 'react'
import { Fragment, useState } from 'react'
import { FaceSmileIcon } from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'
import Avatar from './Avatar'
import { useLocalStorage } from 'react-use'
import moods from './moods'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReactionForm({ onSubmit }) {
  const [user] = useLocalStorage('reactor:user', '')
  const [mood, setMood] = useState(moods[5])
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      comment,
      mood
    })
  }
  return (
    <div className="flex items-start space-x-4">
      <div className="relative flex-shrink-0">
        <div className="relative z-10">
          <Avatar name={user} />
        </div>
        <div className="absolute m-auto inset-0 w-7 h-7 rounded-full bg-indigo-700 animate-ping-slow"></div>
      </div>
      <div className="min-w-[350px] flex-1">
        <form onSubmit={handleSubmit} className="relative">
          <div className="overflow-hidden shadow-lg rounded-lg bg-gray-900 focus-within:border-indigo-700 focus-within:ring-1 focus-within:ring-indigo-700">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              onChange={(event) => setComment(event.target.value)}
              className="bg-gray-900 p-5  border-0 text-white outline-0 block w-full resize-none py-3 focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              defaultValue={''}
            ></textarea>

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center">
              <div className="flex items-center">
                <Listbox value={mood} onChange={setMood}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="sr-only"> Your mood </Listbox.Label>
                      <div className="relative">
                        <Listbox.Button className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center">
                            {mood.value === null ? (
                              <span>
                                <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                <span className="sr-only"> Add your mood </span>
                              </span>
                            ) : (
                              <span>
                                <span
                                  className={classNames(
                                    mood.bgColor,
                                    'flex h-8 w-8 items-center justify-center rounded-full'
                                  )}
                                >
                                  <mood.icon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                </span>
                                <span className="sr-only">{mood.name}</span>
                              </span>
                            )}
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute text-white z-10 mt-1 -ml-6 w-60 rounded-lg bg-gray-900 py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                            {moods.map((mood) => (
                              <Listbox.Option
                                key={mood.value}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'bg-gray-800' : 'bg-gray-900',
                                    'relative cursor-pointer select-none py-2 px-3'
                                  )
                                }
                                value={mood}
                              >
                                <div className="flex items-center">
                                  <div
                                    className={classNames(
                                      mood.bgColor,
                                      'w-8 h-8 rounded-full flex items-center justify-center'
                                    )}
                                  >
                                    <mood.icon
                                      className={classNames(mood.iconColor, 'flex-shrink-0 h-5 w-5')}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <span className="ml-3 block truncate font-medium">{mood.name}</span>
                                </div>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}