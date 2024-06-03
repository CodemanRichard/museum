import React from 'react';
import './Buttons.css';

const Collection = ({ changeFigure }) => {
    const handleClick1 = () => {
        changeFigure(1);
    };

    const handleClick2 = () => {
        changeFigure(2);
    };

    const handleClick3 = () => {
        changeFigure(3);
    }

    const handleClick4 = () => {
        changeFigure(4);
    };

    const handleClick5 = () => {
        changeFigure(5);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className='button' onClick={handleClick1}>馆藏</button>
            <button className='button' onClick={handleClick2}>关键词</button>
            <button className='button' onClick={handleClick3}>生产年代</button>
            <button className='button' onClick={handleClick4}>尺寸</button>
            <button className='button' onClick={handleClick5}>分类/材质/技法</button>
        </div>
    );
}

export default Collection;