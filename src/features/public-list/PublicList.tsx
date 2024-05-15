import { Spin } from "antd"
import { List } from "../../entities/list/list"
import { useGetPublicWishesQuery } from "../../shared/api/api"
import { useEffect } from "react"

export const PublicList = () => {
    const d = useGetPublicWishesQuery({ limit: 5 })
    const { data, error, isError, isLoading, status } = d

    useEffect(() => {
        d.refetch()
    }, [d.refetch])

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
            <Spin tip="Loading" />
        )
    }

    if (!data) {
        return <p>
            ***
        </p>
    }

    return (
        <List title="Публичный список" list={data} />
    )
}