import { List as AntList } from "antd"
import { Wish } from "../../shared/api/api"

type Props = {
    title: string
    list: Array<Wish>
}

export const List = ({ title, list }: Props) => {
    // const [initDataUnsafe, initData] = useInitData();

    if (list.length === 0) {
        return (
            <div>
                <p style={{ textAlign: 'center' }}>Список Желаний пусть</p>
            </div>
        )
    } 

    return (
        <AntList
            header={<div>{title}</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={list}
            renderItem={(item, index) => (
                <AntList.Item>
                    <AntList.Item.Meta
                        title={<p>{index + 1}. {item.title}</p>}
                        // title={<a href="https://ant.design">{item.title}</a>}
                        description={item.description}
                    />
                </AntList.Item>
            )}
            />
    )
}