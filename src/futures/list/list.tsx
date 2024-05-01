import { useGetListQuery } from "../../shared/api/api"

export const List = () => {
    // const [initDataUnsafe, initData] = useInitData();
    const d = useGetListQuery()
    const { data, error, isFetching, isError, isLoading, isSuccess, status } = d

    return (
        <div>
            LIST
            <code>
                {JSON.stringify({ status, error, isFetching, isError, isLoading, isSuccess }, null, 4)}
            </code>
            {JSON.stringify(data, null, 4)}
        </div>
    )
}