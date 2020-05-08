import React, {FC} from 'react'
import {RegisterModel} from "../shared/interface";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from 'react-router-dom'
import {useForm} from "../hooks/form.hook";
import jwt from 'jsonwebtoken'

export const RegisterPage: FC = () => {

    const history = useHistory()
    const initialValues = {
        email: '',
        username: '',
        password: ''
    }
    const {loading, request} = useHttp()

    const {form, generateInputs} = useForm<RegisterModel>(initialValues)


    const registerHandler = async (event: any) => {
        event.preventDefault()
        try {
            const response = await request('https://localhost:5001/api/account/register', "POST", {...form})

        } catch (e) {
            console.log('HERE ERROR', e)
        }
    }


    return (
        <>
            <div className="block-heading">
                <h2 className="text-info">Регистрация</h2>
                <p>Пожалуйста зарегистрируйтесь</p>
            </div>
            <form
                onSubmit={registerHandler}
            >
                {generateInputs((key: string) => {
                    if (key === 'password') {
                        return 'password'
                    }
                    return 'text'
                })}

                <button
                    disabled={loading}

                    className="btn btn-primary btn-block" type="submit">Register
                </button>
            </form>
        </>
    )
}
