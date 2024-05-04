import { useInitData, WebAppProvider } from '@vkruglikov/react-telegram-web-app';
// import './TG.css'
import './App.css'
import './index.scss'
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import environment from 'shared/config/environment';
import { Env } from 'types/enums/env';
import { useTelegram } from './hooks/telegram';

function App() {
  const [initDataUnsafe] = useInitData();

  const { tg, platform, colorScheme } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  useEffect(() => {
    console.log({ ENV_ENV: environment.ENV }, 'environment.ENV')
    console.log("platform: ", platform);
    console.log("theme: ", colorScheme);

    if (environment.ENV === Env.Dev) {
      document.documentElement.classList.add("dev");
    }

    document.body.classList.add(`theme-${colorScheme}`);
  }, [platform, colorScheme]);


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

