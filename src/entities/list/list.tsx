import { List as AntList, Space, Tooltip } from "antd"
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

  // Create our number formatter.
const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

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
            actions.push(<IconText icon={WalletOutlined} text={formatter.format(item.price)} key="list-vertical-price" />)
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
                        title={
                            <Tooltip title={item.title}>
                                <p className={styles.cutText} title={item.title}>{index + 1}. {item.title}</p>
                            </Tooltip>
                        }
                        description={
                            <Tooltip title={item.description ?? undefined}>
                                <p className={styles.cutText}>{item.description}</p>
                            </Tooltip>
                    }
                    />
                </AntList.Item>
            )}
            />
    )
}