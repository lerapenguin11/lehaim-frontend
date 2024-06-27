import React, { useEffect, useRef, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import LoginLayout from '../../layouts/LoginLayout/LoginLayout'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import styles from './register.module.css'
import { useRouter } from 'next/router'

const Register: NextPageWithLayout = () => {
    const [login, setLogin] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
        useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()

    const validate = () => {
        if (!login) {
            setErrorMessage('Укажите логин')
            return false
        } else if (!firstName) {
            setErrorMessage('Укажите имя')
            return false
        } else if (!lastName) {
            setErrorMessage('Укажите фамилию')
            return false
        } else if (!email) {
            setErrorMessage('Укажите email')
            return false
        } else if (!password) {
            setErrorMessage('Укажите пароль')
            return false
        } else if (!passwordConfirmation) {
            setErrorMessage('Укажите подтверждение пароля')
            return false
        } else if (password.length < 6) {
            setErrorMessage('Минимальная длина пароля - 6 символов')
            return false
        } else if (password !== passwordConfirmation) {
            setErrorMessage('Пароли не совпадают')
            return false
        }

        return true
    }

    const onRegisterButtonClick = async () => {
        if (!validate()) {
            document
                .getElementById('errorMessageRef')
                ?.scrollIntoView({ behavior: 'smooth' })

            return
        }

        setIsRegisterButtonDisabled(true)

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login,
                firstName,
                lastName,
                email,
                password,
            }),
        })
            .then((response) => {
                if (response.status === 409) {
                    setErrorMessage('Логин занят')
                }

                if (response.status === 201) {
                    router.push('/')
                }
            })
            .finally(() => {
                setIsRegisterButtonDisabled(false)
            })
    }

    const onReturnToLoginButtonClick = async () => {
        await router.push('/login')
    }

    return (
        <>
            <div className={styles.card}>
                <h3 className={styles.title}>Регистрация</h3>

                <label className={styles.field}>
                    Логин
                    <Input
                        value={login}
                        onTextChange={setLogin}
                        placeholder="login"
                    />
                </label>

                <label className={styles.field}>
                    Имя
                    <Input
                        value={firstName}
                        onTextChange={setFirstName}
                        placeholder="Ivan"
                    />
                </label>

                <label className={styles.field}>
                    Фамилия
                    <Input
                        value={lastName}
                        onTextChange={setLastName}
                        placeholder="Ivanov"
                    />
                </label>

                <label className={styles.field}>
                    Адрес электронной почты
                    <Input
                        value={email}
                        onTextChange={setEmail}
                        placeholder="ivanov@gmail.com"
                    />
                </label>

                <label className={styles.field}>
                    Пароль
                    <Input value={password} onTextChange={setPassword} />
                </label>

                <label className={styles.field}>
                    Подтверждение пароля
                    <Input
                        value={passwordConfirmation}
                        onTextChange={setPasswordConfirmation}
                    />
                </label>

                {errorMessage && (
                    <p id="errorMessageRef" className={styles.errorMessage}>
                        {errorMessage}
                    </p>
                )}

                <Button
                    disabled={isRegisterButtonDisabled}
                    onClick={onRegisterButtonClick}
                    text="Зарегистрироваться"
                />
                <Button
                    onClick={onReturnToLoginButtonClick}
                    variant="outline"
                    text="Вернуться к авторизации"
                />
            </div>
        </>
    )
}

Register.getLayout = (page) => <LoginLayout>{page}</LoginLayout>

export default Register
