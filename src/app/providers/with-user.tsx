import { BrowserRouter } from "react-router-dom";
import config from "shared/config/environment";
import { Suspense } from "react";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { Spin } from "antd";

export const withUserData = (component: () => React.ReactNode) => () => {
  const [initDataUnsafe] = useInitData()
  // const [loading, setLoading] = useState(true)

  // if (loading) {

  // }

  const userId = initDataUnsafe?.user?.id

  if (userId === undefined) {
    return (
      <div>
        userID отсутствует
      </div>
    )
  }


  return (
    <BrowserRouter basename={config.BASENAME}>
      <Suspense fallback={<Spin delay={300} size="large" />}>{component()}</Suspense>
    </BrowserRouter>
  )
};
