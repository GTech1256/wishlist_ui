import { List } from "../../entities/list/list"
import { useGetListQuery } from "../../shared/api/api"

export const MyList = () => {

    const d = useGetListQuery()
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

    return (
        <List list={data!} />
    )
}