import { Item } from "../../shared/api/api"

type Props = {
    list: Array<Item>
}

export const List = ({ list }: Props) => {
    // const [initDataUnsafe, initData] = useInitData();

    if (list.length === 0) {
        return (
            <div>
                <p>Список Желаний пусть</p>
                <button>Добавить первое Желание</button>
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