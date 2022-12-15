import React from "react";
import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "react-use";
import { Transition, Popover } from "@headlessui/react";
import Widget from "./Widget";
import ReactionForm from "./ReactionForm";
import ReactionView from "./ReactionView";
import Avatar from "./Avatar";

export default function Reactor({ children }) {
  const [isEditionMode, setIsEditionMode] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [formPosition, setFormPosition] = useState({ left: 0, top: 0 });
  const [reactions, setReactions] = useLocalStorage("reactor:reactions", []);
  const [user] = useLocalStorage("reactor:user", "");

  const contentRef = useRef();
  const formRef = useRef();

  const toggleEditionMode = () => setIsEditionMode(!isEditionMode);

  const handlePostReaction = (data) => {
    setReactions([
      ...reactions,
      {
        left: formPosition.left,
        top: formPosition.top,
        user,
        mood: data.mood,
        comment: data.comment,
      },
    ]);
    setIsFormActive(false);
  };

  const toggleForm = (e) => {

    setFormPosition({
      left: e.pageX,
      top: e.pageY,
    });
    setIsFormActive(!isFormActive);
  };

  useEffect(() => {
    if (isEditionMode) {
      contentRef?.current?.addEventListener("click", toggleForm);
    }

    if (!isEditionMode) {
      contentRef?.current?.removeEventListener("click", toggleForm);
      setIsFormActive(false);
    }

    return () => contentRef?.current?.removeEventListener("click", toggleForm);
  }, [isEditionMode, isFormActive]);
  return (
    <div className="relative">
      <div className="fixed bottom-0 m-5 flex justify-center w-full">
        <Widget
          onToggleEditionMode={toggleEditionMode}
          isEditionMode={isEditionMode}
        />
      </div>

      {reactions.map((reaction, index) => (
        <div
          className="absolute z-[9999]"
          style={{ top: reaction.top, left: reaction.left }}
          key={index}
        >
          {isEditionMode ? (
            <Avatar name={reaction.user} />
          ) : (
            <Popover className="cursor-pointer z-[9999]">
              <Popover.Button as="div" className="transition-all hover:-translate-y-1">
                <Avatar name={reaction.user} />
              </Popover.Button>
              <Transition
                enter="transition-all duration-200 delay-100"
                enterFrom="opacity-0 translate-y-6"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel>
                  <div className="absolute left-9 -top-9 ml-5">
                    <ReactionView reaction={reaction} />
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          )}
        </div>
      ))}

      <div ref={formRef} style={formPosition} className="absolute z-[9999]">
        <Transition
          show={isFormActive}
          enter="transition-all duration-200 delay-100"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {isFormActive && <ReactionForm onSubmit={handlePostReaction} />}
        </Transition>
      </div>

      <div
        ref={contentRef}
        className={
          isEditionMode && !isFormActive ? "cursor-cell z-0" : "cursor-auto z-0"
        }
      >
        <div
          className={
            isEditionMode ? "pointer-events-none" : "pointer-events-auto"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
