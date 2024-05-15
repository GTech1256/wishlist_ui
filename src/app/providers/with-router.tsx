import { BrowserRouter } from "react-router-dom";
import config from "shared/config/environment";
import { Suspense } from "react";
import { Spin } from "antd";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter basename={config.BASENAME}>
      <Suspense fallback={<Spin delay={300} size="large" />}>{component()}</Suspense>
    </BrowserRouter>
  );
