import { List as AntList, Space } from "antd"
import { User, Wish } from "../../shared/api/api"
import { UserOutlined, WalletOutlined } from "@ant-design/icons"
import React from "react"
import styles from "./list.module.scss"

type Item = Wish & { user?: User }

type Props = {
    title: string
    list: Array<Item>
}

const IconText = ({ icon, text }: { icon: React.FC; text: string | number }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

export const List = ({ title, list }: Props) => {
    if (list.length === 0) {
        return (
            <div>
                <p style={{ textAlign: 'center' }}>Список Желаний пусть</p>
            </div>
        )
    } 

    const getActions = (item: Item) => {
        const actions = []


        if (item?.price) {
            actions.push(<IconText icon={WalletOutlined} text={item.price} key="list-vertical-price" />)
        }

        if (item?.user) {
            actions.push(<IconText icon={UserOutlined} text={`${item?.user?.name} ${item?.user?.lastName}`} key="list-vertical-star-o" />)
        }


        return actions
    }

    return (
        <AntList
            header={<p>{title}</p>}
            bordered
            dataSource={list}
            renderItem={(item, index) => (
                <AntList.Item key={item.id} actions={getActions(item)}>
                    <AntList.Item.Meta
                        title={<p className={styles.cutText}>{index + 1}. {item.title}</p>}
                        // title={<a href="https://ant.design">{item.title}</a>}
                        description={<p className={styles.cutText}>{item.description}</p>}
                    />
                </AntList.Item>
            )}
            />
    )
}