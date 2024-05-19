import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "shared/config/routes";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { useDeleteWishMutation, useGetPersonalWishesQuery, Wish } from "shared/api/api";
import { List } from "entities/list/list";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useTelegram } from "app/hooks/telegram";


export const MyWishListPage = () => {
    const navigate = useNavigate()
    const { data, isLoading, isError, refetch } = useGetPersonalWishesQuery()
    const [deleteWishMutate, deleteData] = useDeleteWishMutation()
    const d = useTelegram()
    const handleBackClick = () => {
        navigate(ROUTE_PATH.home)
    }

    const handleDeleteClick = (item: Wish) => () => {
      d.showConfirm(`Вы точно хотите удалить желание ${item.title}?`, async (isConfirm) => {
        if (isConfirm) {
          await deleteWishMutate(item.id)
          refetch()
        }
      })
    }

    useEffect(() => {
      if (deleteData.error) {
        d.showAlert("Произошла ошибка удаления")
      }
    }, [deleteData.error, d])
    
    return (
      <div>
        <BackButton onClick={handleBackClick} />

        {isLoading ? 'Loading' : isError ? 'Error' : data ? <List title="Личный список" list={data} buttons={[(item) => <Button type="primary" icon={<DeleteOutlined />} danger ghost onClick={handleDeleteClick(item)} loading={deleteData.isLoading} />]} /> : '***'}
      </div>
    )
}