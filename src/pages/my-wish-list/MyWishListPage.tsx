import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "shared/config/routes";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { useGetPersonalWishesQuery } from "shared/api/api";
import { List } from "entities/list/list";


export const MyWishListPage = () => {
    const navigate = useNavigate()
    const { data, isLoading, isError } = useGetPersonalWishesQuery()
    
    const handleBackClick = () => {
        navigate(ROUTE_PATH.home)
    }
    
      return (
        <div>
          <BackButton onClick={handleBackClick} />

          {isLoading ? 'Loading' : isError ? 'Error' : data ? <List list={data} /> : '***'}
        </div>
      )
}