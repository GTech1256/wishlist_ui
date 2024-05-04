import environment from "../../shared/config/environment";
import { Env } from "../../types/enums/env";

const tg = Telegram.WebApp;

export const TG_USER_ID = tg.initDataUnsafe?.user?.id;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onToggleMainButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  const onToggleBackButton = () => {
    if (tg.BackButton.isVisible) {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
    }
  };

  const isMobile = ["ios", "android"].includes(tg?.platform || "");

  return {
    onClose,
    onToggleMainButton,
    onToggleBackButton,
    tg,
    initData:
      environment.ENV === Env.Dev && import.meta.env.REACT_APP_INIT_DATA ? import.meta.env.REACT_APP_INIT_DATA : tg.initData,
    user: tg.initDataUnsafe?.user,
    userId: TG_USER_ID,
    queryId: tg.initDataUnsafe?.query_id,
    hash: tg.initDataUnsafe?.hash,
    platform: tg?.platform,
    isMobile: isMobile,
    isDesktop: !isMobile,
    version: tg?.version,
    colorScheme: tg?.colorScheme,
    isDark: tg?.colorScheme === "dark",
    MainButton: tg?.MainButton,
    BackButton: tg?.BackButton,
    showPopup: tg?.showPopup,
    showConfirm: tg?.showConfirm,
    showAlert: tg?.showAlert,
  };
}
