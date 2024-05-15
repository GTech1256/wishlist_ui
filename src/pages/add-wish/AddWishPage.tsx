import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import type { ObjectSchema } from "yup";
import Form from "shared/ui/form/Form";
import Box from "shared/ui/box";
import FormItem from "shared/ui/form/FormItem";
import Input from "shared/ui/input/Input";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "shared/config/routes";
import { BackButton, MainButton, useShowPopup } from "@vkruglikov/react-telegram-web-app";
import { useAddWishMutation } from "shared/api/api";
import { useEffect } from "react";
import { Checkbox } from "shared/ui/checkbox";

type AddWishForm = {
    title: string;
    description?: string;
    price?: number;
    image?: string;
    isPublic?: boolean;
}

const TEXT_SQL_MAX_LENGTH = 65_535
const INT_SQL_MIN_VALUE = -2_147_483_648
const INT_SQL_MAX_VALUE = 2_147_483_647

const addWishSchema: ObjectSchema<AddWishForm> = yup.object({
    title: yup.string().max(255).required(),
    description: yup.string().max(TEXT_SQL_MAX_LENGTH),
    price: yup.number().min(INT_SQL_MIN_VALUE).max(INT_SQL_MAX_VALUE),
    image: yup.string(),
    isPublic: yup.bool(),
});

export const AddWishPage = () => {
    const navigate = useNavigate()
    const showPopup = useShowPopup();
    const [updatePost, result] = useAddWishMutation()

    const nav = useNavigate()

    useEffect(() => {
            if (result.error) {

            showPopup({
                message: 'Произошла ошибка'
              });

              console.log(result.error)
            }
    }, [result.error])
    
    const form = useForm<AddWishForm>({
        resolver: yupResolver(addWishSchema),
        mode: "all",
        criteriaMode: "all",
        reValidateMode: "onChange",
        defaultValues: {
            isPublic: true
        }
      });

    const handleSubmit = () => {
        form.handleSubmit(async (data) => {
            await updatePost(data)

            

            showPopup({
                message: 'Данные отправлены',
              });
            form.reset()
            nav(ROUTE_PATH.home);
        }, (errr) => {
            console.log(errr)
            
        })()
    }

    const handleBackClick = () => {
        navigate(ROUTE_PATH.home)
    }
    
      return (
        <div>
            <BackButton onClick={handleBackClick} />
            <Form form={form}>

                <Box mb={16}>
                    <FormItem name="title" label="Название*" >
                        <Input  />
                    </FormItem>
                </Box>


                <Box mb={16}>
                    <FormItem name="description" label="Описание" >
                        <Input  />
                    </FormItem>
                </Box>


                <Box mb={16}>
                    <FormItem name="price" label="Цена" >
                        <Input type="number"  />
                    </FormItem>
                </Box>


                <Box mb={16}>
                    <FormItem name="isPublic" label="Публичное желание" >
                        <Checkbox  />
                    </FormItem>
                </Box>

                </Form>

                <MainButton text="Создать" onClick={handleSubmit} disabled={result.isLoading} />
        </div>
      )
}