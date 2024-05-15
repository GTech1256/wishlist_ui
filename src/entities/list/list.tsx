import { Wish } from "../../shared/api/api"

type Props = {
    list: Array<Wish>
}

export const List = ({ list }: Props) => {
    // const [initDataUnsafe, initData] = useInitData();

    if (list.length === 0) {
        return (
            <div>
                <p style={{ textAlign: 'center' }}>Список Желаний пусть</p>
            </div>
        )
    } 

    return (
        <div>
            {list.map(item => (
                <div>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    )
}