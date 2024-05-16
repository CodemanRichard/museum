import React from 'react';
import './years.css';

const Years = ({ changeFigure }) => {
    const handleClick = () => {
        changeFigure(3);
        console.log('生产年代');
    };

    return (
        <button onClick={handleClick}>生产年代</button>
    );
}

export default Years;