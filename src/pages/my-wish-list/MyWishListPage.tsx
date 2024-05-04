import Box from "shared/ui/box";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "shared/config/routes";


export const MyWishListPage = () => {
    const navigate = useNavigate()
    
    const handleBackClick = () => {
        navigate(ROUTE_PATH.home)
    }
    
      return (
        <Box>
            <Button onClick={handleBackClick}>Назад</Button>
        </Box>
      )
}