import React from 'react';

const Collection = ({ changeFigure }) => {
    const handleClick = () => {
        changeFigure(1);
        console.log('馆藏');
    };

    return (
        <button onClick={handleClick}>馆藏</button>
    );
}

export default Collection;