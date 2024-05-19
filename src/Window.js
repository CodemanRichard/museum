import React from 'react';
import ReactModal from 'react-modal';
import './Window.css';

ReactModal.setAppElement('#root');

function Window({ image, onClose }) {
  return (
    <ReactModal isOpen={!!image} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <div className="modal-content">
        <h2>{image.alt}</h2>
        <img src={image.src} alt={image.alt} className="modal-image" />
        <p>{image.description}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </ReactModal>
  );
}

export default Window;
