import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const IdleTimeOutModal = ({
  showModal,
  handleClose,
  handleLogout,
  remainingTime,
}) => {
  return (
    // <Modal show={showModal} onHide={handleClose}>
    <Modal show={showModal}>
      {/* <Modal.Header closeButton> */}
      <Modal.Header>
        <Modal.Title className="ml-5">
          Your session has been expired !
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>You Will Get Timed Out. You want to stay?</Modal.Body> */}
      {/* <Modal.Body>You Will be Logout</Modal.Body> */}
      <Modal.Footer style={{ marginRight: "16vw" }}>
        <Button variant="primary" onClick={handleLogout}>
          OKAY
        </Button>
        {/* <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Stay
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};
