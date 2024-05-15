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
import { useGetAuthDataQuery } from 'shared/api/api';

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const [initDataUnsafe] = useInitData();
  const auth = useGetAuthDataQuery()

  const { tg, platform, colorScheme } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  console.log({ auth })

  useEffect(() => {
    console.log({ ENV_ENV: environment.ENV }, 'environment.ENV')
    console.log("platform: ", platform);
    console.log("theme: ", colorScheme);

    if (environment.ENV === Env.Dev) {
      document.documentElement.classList.add("dev");
    }

    // document.body.classList.add(`theme-${colorScheme}`);
  }, [platform, colorScheme]);


  useEffect(() => {
    if (initDataUnsafe?.user?.id) {
      sessionStorage.setItem('userId', initDataUnsafe.user.id.toString())
    } else {

      sessionStorage.removeItem('userId')
    }
  }, [initDataUnsafe])

  return (
    <RouterProvider router={router} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
const Providers = ({ children }: { children: JSX.Element }) => (
  <Provider store={store}>
      
  <WebAppProvider
    options={{
      smoothButtonsTransition: true,
    }}
  >
    {children}
  </WebAppProvider>
</Provider>
)

// eslint-disable-next-line react-refresh/only-export-components
export default () => (
<Providers>
<App />
</Providers>
)

