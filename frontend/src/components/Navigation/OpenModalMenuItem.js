import React from 'react';
import { useModal } from '../../context/Modal';
import './Modal.css'

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  modalType
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };

  return (
    <>
    {modalType === 'reserve' && <button onClick={onClick} className="reserveButton" id='reserve'>{itemText}</button>}

    {modalType !== 'reserve' && <li onClick={onClick} className='modalCursor'>{itemText}</li>}
    </>
  );
}

export default OpenModalMenuItem;
