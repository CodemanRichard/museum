import './App.css';
import Map from './map.js';

function App() {
  const [props, setProps] = useState('the V&A');
  const changeProps = (newProps) => {
    setProps(newProps);
  }
  return (
    <>
    <div className='irregular-box box1'>logo与标题</div>
    <div className='irregular-box box2'><Map changeProps={changeProps}/></div>
    <div className='irregular-box box3'>藏品展示</div>
    <div className='irregular-box box4'>馆藏</div>
    <div className='irregular-box box5'>词云</div>
    <div className='irregular-box box6'>生产年代</div>
    <div className='irregular-box box7'>图表展示窗口</div>
    <div className='irregular-box box8'>文物随机对比</div>
    </>
  );
}

export default App;
