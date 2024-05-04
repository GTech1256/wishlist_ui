import { useInitData, WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';


// https://github.com/vkruglikov/react-telegram-web-app?tab=readme-ov-file#hooks

function App() {
  // const [count, setCount] = useState(0)

  // const [initDataUnsafe] = useInitData();
  const [initDataUnsafe] = useInitData();


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
        <RouterProvider router={router} />
      </WebAppProvider>
    </Provider>
  )
}

export default App
