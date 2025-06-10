import React from "react";

const Modal = ({ children, isOpen, title, onClose }) => {
  if (!isOpen) return;

  return <div>Modal</div>;
};

export default Modal;
