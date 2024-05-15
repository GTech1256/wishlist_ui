import { BrowserRouter } from "react-router-dom";
import config from "shared/config/environment";
import { Suspense } from "react";
import Spinner from "../../shared/ui/spinner";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter basename={config.BASENAME}>
      <Suspense fallback={<Spinner delay={300} size="large" />}>{component()}</Suspense>
    </BrowserRouter>
  );
