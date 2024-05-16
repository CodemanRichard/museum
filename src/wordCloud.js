import React from 'react';

const WordCloud = ({ changeFigure }) => {
    const handleClick = () => {
        changeFigure(2);
        console.log('词云');
    };

    return (
        <button onClick={handleClick}>词云</button>
    );
}

export default WordCloud;