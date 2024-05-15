import { List as AntList, Space } from "antd"
import { User, Wish } from "../../shared/api/api"
import { UserOutlined } from "@ant-design/icons"
import React, { ReactNode } from "react"

type Props = {
    title: string
    list: Array<Wish & { user?: User }>
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
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

    return (
        <AntList
            header={<div>{title}</div>}
            bordered
            dataSource={list}
            renderItem={(item, index) => (
                <AntList.Item key={item.id} actions={item?.user ? [
                    <IconText icon={UserOutlined} text={`${item?.user?.name} ${item?.user?.lastName}`} key="list-vertical-star-o" />,

                ]: undefined}>
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