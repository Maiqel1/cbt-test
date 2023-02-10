import React from "react";
import Modal from "react-modal";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      borderRadius          : '24px',
      transform             : 'translate(-50%, -50%)',
      width                 : '760px',
      height                : '302px',
    }
  };


const ConfirmModal = ({ showModal, onClose, onConfirm }) => (

    
  <Modal isOpen={showModal} style={customStyles} onRequestClose={onClose}>
    <div className="submit-modal">
        <h4 className="text-center mt-3">Are you sure you want to submit?</h4>
        <h4 className="text-center my-5">This process is irreversible so you must be sure before proceeding.
Procced to submit?</h4>
      <div className="d-flex justify-content-center">
        <button onClick={onClose} className="btn btn-lg text-white bg-success me-5">
          Cancel
        </button>
        <button onClick={onConfirm} className="btn text-white btn-lg bg-danger ms-5">
          Submit
        </button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;
