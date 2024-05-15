import { Suspense } from "react";
import Spinner from "../../shared/ui/spinner";
import { Provider } from "react-redux";
import { store } from "../store";

export const withStore = (component: () => React.ReactNode) => () =>
  (
    <Provider store={store}>
      <Suspense fallback={<Spinner delay={300} size="large" />}>{component()}</Suspense>
    </Provider>
  );
