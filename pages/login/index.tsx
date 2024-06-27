import React, { useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import styles from './login.module.css'
import { useRouter } from 'next/router'

const Login: NextPageWithLayout = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (errorMessage) {
            setErrorMessage(null)
        }
    }, [login, password])

    const onLoginButtonClick = async () => {
        setIsLoginButtonDisabled(true)

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login,
                password,
            }),
        })
            .then((response) => {
                if (response.status === 401) {
                    setErrorMessage('Неверный логин или пароль')
                }

                if (response.status === 200) {
                    router.push('/')
                }
            })
            .finally(() => {
                setIsLoginButtonDisabled(false)
            })
    }

    const onRegisterButtonClick = async () => {
        await router.push('/register')
    }

    return (
        <>
            <div className={styles.card}>
                <h3 className={styles.title}>Авторизация</h3>

                <label className={styles.field}>
                    Логин
                    <Input
                        variant="input-full-width"
                        value={login}
                        onTextChange={setLogin}
                        placeholder="Ivanov"
                    />
                </label>

                <label className={styles.field}>
                    Пароль
                    <Input
                        variant="input-full-width"
                        value={password}
                        onTextChange={setPassword}
                        type="password"
                    />
                </label>

                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}

                <Button
                    disabled={isLoginButtonDisabled}
                    text="Войти"
                    onClick={onLoginButtonClick}
                />

                <Button
                    variant="outline"
                    text="Зарегистрироваться"
                    onClick={onRegisterButtonClick}
                />
            </div>
        </>
    )
}

Login.getLayout = (page) => <LoginLayout>{page}</LoginLayout>

export default Login
