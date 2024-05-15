import { BrowserRouter } from "react-router-dom";
import config from "shared/config/environment";
import { Suspense, useState } from "react";
import Spinner from "../../shared/ui/spinner";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

export const withUserData = (component: () => React.ReactNode) => () => {
  const [initDataUnsafe] = useInitData()
  const [loading, setLoading] = useState(true)

  getAuthData

  if (loading) {

  }

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
      <Suspense fallback={<Spinner delay={300} size="large" />}>{component()}</Suspense>
    </BrowserRouter>
  )
};


const UserLoader = ({ userId }: { userId: string }) => {
  const 
}