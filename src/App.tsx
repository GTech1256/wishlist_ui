import { MainButton, useShowPopup } from '@vkruglikov/react-telegram-web-app';
import './App.css'


const Content = () => {
  const showPopup = useShowPopup();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  return <MainButton text="SHOW POPUP" onClick={handleClick} />;
};

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      Hello

      <br />

      <Content />
    </div>
  )
}

export default App
