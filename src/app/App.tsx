import { MainButton, useInitData, useShowPopup, WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import './App.css'
import { List } from '../futures/list/list';
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';


const Content = () => {
  const showPopup = useShowPopup();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  return <MainButton text="SHOW POPUP" onClick={handleClick} />;
};

// https://github.com/vkruglikov/react-telegram-web-app?tab=readme-ov-file#hooks

function App() {
  // const [count, setCount] = useState(0)

  // const [initDataUnsafe] = useInitData();
  const [initDataUnsafe, initData] = useInitData();


  useEffect(() => {
    if (initDataUnsafe?.user?.id) {
      sessionStorage.setItem('userId', initDataUnsafe.user.id.toString())
    } else {

      sessionStorage.removeItem('userId')
    }
  }, [initDataUnsafe])

  return (
    <Provider store={store}>
      
      <WebAppProvider
        options={{
          smoothButtonsTransition: true,
        }}
      >
        <div style={{ width: '200px' }}>

          Hello

          <br />


          <h3>initDataUnsafe:</h3>
          <code>
            {JSON.stringify(initDataUnsafe, null, 4)}
          </code>

          <h3>initData</h3>
          <code>
            {JSON.stringify(initData, null, 4)}
          </code>
        </div>

        <List />

        <Content />
      </WebAppProvider>
    </Provider>
  )
}

export default App
