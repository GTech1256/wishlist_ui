import { PublicList } from "features/public-list/PublicList";
import { MainInfo } from "../../entities/main-info/MainInfo"
import { MainRoutes } from "../../entities/main-routes/MainRoutes"
import styles from './index.module.scss';

export const HomePage = () => {
    return (
        <div>
            <MainInfo />
            <div className={styles.mt16}>
                <MainRoutes />
            </div>
            <div className={styles.mt16}>
                <PublicList />
            </div>
        </div>
    )
}