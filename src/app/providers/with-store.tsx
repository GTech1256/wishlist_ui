import { Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { Spin } from "antd";

export const withStore = (component: () => React.ReactNode) => () =>
  (
    <Provider store={store}>
      <Suspense fallback={<Spin delay={300} size="large" />}>{component()}</Suspense>
    </Provider>
  );
