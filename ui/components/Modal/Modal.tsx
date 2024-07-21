"use client";
import { useEffect, useRef } from "react";
import { ReactPortal } from "./ReactPortal";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

function Modal({ children, isOpen, handleClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="fixed inset-0 backdrop-blur-sm z-50"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3"
          >
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </>
    </ReactPortal>
  );
}

export default Modal;
