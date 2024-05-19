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
        <p>作者：{image.author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源地：{image.source}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年代：{image.period}</p>
        <p>{image.description}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </ReactModal>
  );
}

export default Window;
