import './App.css';
import Map from './map.js';
import WordCloud from './wordCloud.js';
import Collection from './collection.js';
import Figures from './figures.js';
import { useState } from 'react';

function App() {
  const [props, setProps] = useState('the V&A');
  const changeProps = (newProps) => {
    setProps(newProps);
  }

  //图表展示窗口的图 1 2 3
  const [figure, setFigure] = useState(1);
  const changeFigure = (newFigure) => {
    setFigure(newFigure);
  }

  return (
    <>
    <div className='irregular-box box1'>logo与标题</div>
    <div className='irregular-box box2'><Map changeProps={changeProps}/></div>
    <div className='irregular-box box3'>藏品展示</div>
    <div className='irregular-box box4'><Collection changeFigure={changeFigure}/></div>
    <div className='irregular-box box5'><WordCloud changeFigure={changeFigure}/></div>
    <div className='irregular-box box6'>生产年代</div>
    <div className='irregular-box box7'><Figures museumName={props} figureNo={figure}/></div>
    <div className='irregular-box box8'>文物随机对比</div>
    </>
  );
}

export default App;
