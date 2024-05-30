import './App.css';
import Map from './map.js';
import Figures from './figures.js';
import { useState } from 'react';
import Gallery from './Gallery.js';
import Compare from './Compare.js';
import Title from './Title.js';
import Buttons from './Buttons.js';
import Years from './years.js'
import Collection from './collection.js'
import WordCloud from './wordcloud.js'

function App() {
  const [props, setProps] = useState('the V&A');
  const changeProps = (newProps) => {
    setProps(newProps);
  }

  // //图表展示窗口的图 1 2 3
  const [figure, setFigure] = useState(1);
  const changeFigure = (newFigure) => {
    setFigure(newFigure);
  }

  return (
    <>
    <div className='irregular-box box1'><Title museumName={props} changeProps={changeProps}/></div>
    <div className='irregular-box box2'><Map museumName={props} changeProps={changeProps}/></div>
    {/* <div className='irregular-box box3'><Gallery museumName={props}/></div> */}
    <div className='irregular-box box4'><Buttons changeFigure={changeFigure}/></div>
    <div className='irregular-box box4'><Collection museumName={props}/></div>
    <div className='irregular-box box5'><WordCloud museumName={props}/></div>
    <div className='irregular-box box6'><Years museumName={props}/></div>
    <div className='irregular-box box7'><Figures museumName={props}/></div>
    </>
  );
}

export default App;
