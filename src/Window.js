import React from 'react';
import ReactModal from 'react-modal';
import './Window.css';

ReactModal.setAppElement('#root');

function Window({ image, onClose }) {
  return (
    <ReactModal isOpen={!!image} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <div className="modal-content">
        <h2>{image["alt"]}</h2>
        <img src={image["src"]} alt={image["alt"]} className="modal-image" />
        <p>作者：{image["作者"]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源地：{image["来源地"]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年代：{image["年代"]}</p>
        <p className='description'>描述：{image["描述_ZN"]}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </ReactModal>
  );
}

export default Window;
