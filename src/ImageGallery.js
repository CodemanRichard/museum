import React from 'react';
import './ImageGallery.css';

function ImageGallery({ images, onImageClick }) {
  return (
    <div className="image-gallery">
      {images.map(image => (
        <img
          key={image.id}
          src={image.src}
          alt={image.alt}
          onClick={() => onImageClick(image)}
          className="gallery-image"
        />
      ))}
    </div>
  );
}

export default ImageGallery;
