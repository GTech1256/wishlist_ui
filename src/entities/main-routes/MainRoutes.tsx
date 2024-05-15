import { ROUTE_PATH } from "shared/config/routes"
import styles from "./MainRoutes.module.scss"
import { PlusCircleFilled, UnorderedListOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

export const MainRoutes = () => {
    return (
        <div className={styles.wrapper}>
            <Link className={styles.item} to={ROUTE_PATH.addWish}>
                <PlusCircleFilled className={styles.icon} />
                <span>Добавить Желание</span>
            </Link>
            {/* <a href="/public-list">
                Публичные Желания
            </a> */}
            <Link className={styles.item} to={ROUTE_PATH.myWishList}>
                <UnorderedListOutlined className={styles.icon} />
                <span>Мой список Желаний</span>
            </Link>
        </div>
    )
}