import React, { useEffect } from "react";

const Modal = ({ modalContent, cls, closeModal, state }) => {
  useEffect(() => {
    let timeout = setTimeout(() => {
      closeModal();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state]);

  return (
    <div className={cls}>
      <h3>{modalContent}</h3>
    </div>
  );
};

export default Modal;
