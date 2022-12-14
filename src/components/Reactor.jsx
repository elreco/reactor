import { useEffect, useState } from "react";
import { Popover, Transition } from '@headlessui/react'

export default function Reactor({ children }) {
  const [isEditionMode, setIsEditionMode] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState({top: 0, bottom: 0});
  const handleClick = () => setIsEditionMode(!isEditionMode)

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click
      </button>
      {isEditionMode ?
        <Popover>
          <Popover.Button as="div">{children}</Popover.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel>Test</Popover.Panel>
          </Transition>
        </Popover> :
      children}
    </div>
  );
}
