import { MainInfo } from "../../entities/main-info/MainInfo"
import { MainRoutes } from "../../entities/main-routes/MainRoutes"
import { MyList } from "../../features/my-list/MyList"

export const HomePage = () => {
    return (
        <div>
            <MainInfo />
            <MainRoutes />
            <MyList />
        </div>
    )
}