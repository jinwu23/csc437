import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Modal(props) {
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    // click was inside modal
    if (modalRef.current && modalRef.current.contains(e.target)) {
      return;
    }
    // click outside modal
    props.onCloseRequested();
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="h-screen w-screen bg-gray-500/20 absolute inset-0 flex justify-center items-center"
        onClick={handleOverlayClick}
      >
        <div ref={modalRef} className="bg-white relative p-4">
          <header className="flex justify-between mb-4">
            {props.headerLabel}
            <button aria-label="Close" onClick={props.onCloseRequested}>
              <FontAwesomeIcon icon={faX} />
            </button>
          </header>
          {props.children}
        </div>
      </div>
    </>
  );
}

export default Modal;
