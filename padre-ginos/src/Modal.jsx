import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children, show, onHide }) => {
  const [modalShow, setModalShow] = useState(show || false);

  const modalRef = useRef(null);

  const handleClose = () => {
    setModalShow(false);
    onHide();
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }

  const onClick = (e) => {
    if (e.target?.id === 'modal') {
      handleClose();
    }
  }

  if (!modalRef.current) {
    modalRef.current = document.createElement('div');
    modalRef.current.classList.add('modal-inner');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');

    try {
      modalRoot.appendChild(modalRef.current);
    } catch (e) {
      console.error(e);
    }

    return () => {
      modalRoot.removeChild(modalRef.current);
    }

  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const { signal } = ac;

    window.addEventListener('keydown', onKeyDown, { signal });
    window.addEventListener('click', onClick, { signal });

    return () => {
      ac.abort();
    }

  }, [show]);

  if (!modalShow) return null;

  return createPortal(
    <div>
      {children}
      <button onClick={handleClose}>Close</button>
    </div>,
    modalRef.current
  )
}
