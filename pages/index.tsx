import type { NextPage } from 'next'
import Button from '../components/Button/Button'
import styles from './index.module.css'
import Input from '../components/Input/Input'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Home: NextPage = () => {
    const [searchInputValue, setSearchInputValue] = useState('')

    const router = useRouter()

    const onSearchButtonClick = () => {
        router.push(`/search?query=${searchInputValue}`)
    }

    return (
        <>
            <section className={styles.searchPatientSection}>
                <label className={styles.label}>Поиск пациентов</label>
                <Input
                    value={searchInputValue}
                    onTextChange={setSearchInputValue}
                    placeholder="Иванов Иван Иванович"
                />
                <Button
                    disabled={!searchInputValue.length}
                    onClick={onSearchButtonClick}
                    icon={
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.9111 14L8.01111 9.1C7.62222 9.41111 7.175 9.65741 6.66944 9.83889C6.16389 10.0204 5.62593 10.1111 5.05556 10.1111C3.64259 10.1111 2.44676 9.62176 1.46806 8.64306C0.489352 7.66435 0 6.46852 0 5.05556C0 3.64259 0.489352 2.44676 1.46806 1.46806C2.44676 0.489352 3.64259 0 5.05556 0C6.46852 0 7.66435 0.489352 8.64306 1.46806C9.62176 2.44676 10.1111 3.64259 10.1111 5.05556C10.1111 5.62593 10.0204 6.16389 9.83889 6.66944C9.65741 7.175 9.41111 7.62222 9.1 8.01111L14 12.9111L12.9111 14ZM5.05556 8.55556C6.02778 8.55556 6.85417 8.21528 7.53472 7.53472C8.21528 6.85417 8.55556 6.02778 8.55556 5.05556C8.55556 4.08333 8.21528 3.25694 7.53472 2.57639C6.85417 1.89583 6.02778 1.55556 5.05556 1.55556C4.08333 1.55556 3.25694 1.89583 2.57639 2.57639C1.89583 3.25694 1.55556 4.08333 1.55556 5.05556C1.55556 6.02778 1.89583 6.85417 2.57639 7.53472C3.25694 8.21528 4.08333 8.55556 5.05556 8.55556Z"
                                fill="white"
                            />
                        </svg>
                    }
                />
            </section>
        </>
    )
}

export default Home
