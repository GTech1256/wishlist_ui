import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "shared/config/routes";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { useGetPersonalWishesQuery } from "shared/api/api";
import { List } from "entities/list/list";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";


export const MyWishListPage = () => {
    const navigate = useNavigate()
    const { data, isLoading, isError } = useGetPersonalWishesQuery()
    // const [mutate, data] = useDeleteWishMutation()
    
    const handleBackClick = () => {
        navigate(ROUTE_PATH.home)
    }

    // const handleDeleteClick = () => {
    //   mutate()
    // }
    
      return (
        <div>
          <BackButton onClick={handleBackClick} />

          {isLoading ? 'Loading' : isError ? 'Error' : data ? <List title="Личный список" list={data} buttons={[<Button type="primary" icon={<DeleteOutlined />} danger ghost />]} /> : '***'}
        </div>
      )
}