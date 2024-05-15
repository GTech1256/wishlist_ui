import { List } from "../../entities/list/list"
import { useGetPersonalWishesQuery } from "../../shared/api/api"

export const MyList = () => {

    const d = useGetPersonalWishesQuery({ limit: 5 })
    const { data, error, isError, isLoading, status } = d

    if (isError) {
        console.log({ error, status })
        return (
            <div>
                <p>Ошибка получения списка Желаний</p>
            </div>
        )
    }


    if (isLoading) {
        return (
            <div>
                <p>Загрузка списка Желаний</p>
            </div>
        )
    }

    if (!data) {
        return <p>
            ***
        </p>
    }

    return (
        <List list={data} />
    )
}