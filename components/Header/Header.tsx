import { FC } from 'react'
import Link from '../Link/Link'
import Button from '../Button/Button'
import styles from './header.module.css'
import { useRouter } from 'next/router'

interface IProps {}

const Header: FC<IProps> = () => {
    const router = useRouter()

    const onLogoutButtonClick = () => {
        document.cookie = 'auth_token=;expires=' + new Date(0).toUTCString()

        router.replace('/login')
    }

    return (
        <header className={styles.container}>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}>
                    <Link href="/#" text="Пациенты" />
                    <Button
                        onClick={() => {
                            router.push('/patient')
                        }}
                        text="Добавить"
                    />
                </li>

                <li className={styles.menuItem}>
                    <Link href="/recommendations" text="Рекомендации" />
                    <Button
                        onClick={() => {
                            router.push('/recommendations/create-or-update')
                        }}
                        text="Добавить"
                    />
                </li>

                <li className={styles.menuItem}>
                    <button
                        onClick={onLogoutButtonClick}
                        className={styles.logoutButton}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="#0D72FF"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M6.66667 28C5.93333 28 5.30556 27.7389 4.78333 27.2167C4.26111 26.6944 4 26.0667 4 25.3333V6.66667C4 5.93333 4.26111 5.30556 4.78333 4.78333C5.30556 4.26111 5.93333 4 6.66667 4H16V6.66667H6.66667V25.3333H16V28H6.66667ZM21.3333 22.6667L19.5 20.7333L22.9 17.3333H12V14.6667H22.9L19.5 11.2667L21.3333 9.33333L28 16L21.3333 22.6667Z" />
                        </svg>
                    </button>
                </li>
            </ul>
        </header>
    )
}

export default Header
