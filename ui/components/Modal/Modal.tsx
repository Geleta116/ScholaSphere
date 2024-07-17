"use client"
import { useEffect } from "react";
import { ReactPortal } from "./ReactPortal";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

function Modal({ children, isOpen, handleClose }: Props) {
  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <button
              onClick={handleClose}
              className=" text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              Close
            </button>
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </>
    </ReactPortal>
  );
}

export default Modal;
