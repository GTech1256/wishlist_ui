import { withRouter } from "./with-router";
import compose from "../../shared/lib/compose";
import { withStore } from "./with-store";

export const withProviders = compose<() => JSX.Element>(withStore, withRouter);
