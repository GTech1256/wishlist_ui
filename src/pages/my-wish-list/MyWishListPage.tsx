import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "shared/config/routes";
import { BackButton } from "@vkruglikov/react-telegram-web-app";


export const MyWishListPage = () => {
    const navigate = useNavigate()
    
    const handleBackClick = () => {
        navigate(ROUTE_PATH.home)
    }
    
      return (
        <BackButton onClick={handleBackClick} />
      )
}