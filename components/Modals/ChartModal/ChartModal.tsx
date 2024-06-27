import { FC, useEffect, useState } from 'react'
import BaseModal from '../BaseModal/BaseModal'
import { getAnalysisChart } from '../../../api/frontend'
import Image from 'next/image'
import styles from './chartModal.module.css'
import LoadingSpinner from '../../misc/LoadingSpinner/LoadingSpinner'

type Props = {
    analysisId: string
    onCloseClick: () => void
}

type ChartsData = {
    tCell: string
    bCell: string
    cPair: string
}

const ChartModal: FC<Props> = (props) => {
    const [chartsData, setChartsData] = useState<ChartsData | undefined>()
    const { analysisId, onCloseClick } = props

    useEffect(() => {
        ;(async () => {
            const chartTypes: ['t-cell', 'b-cell', 'c-pair'] = [
                't-cell',
                'b-cell',
                'c-pair',
            ]

            const [tCellBlob, bCellBlob, cPairBlob] = await Promise.all(
                chartTypes.map((chartType) =>
                    getAnalysisChart({
                        analysisId,
                        chartType,
                    })
                )
            )

            setChartsData({
                tCell: URL.createObjectURL(tCellBlob),
                bCell: URL.createObjectURL(bCellBlob),
                cPair: URL.createObjectURL(cPairBlob),
            })
        })()
    }, [])

    return (
        <BaseModal onCloseClick={onCloseClick}>
            {!chartsData && <LoadingSpinner />}

            {chartsData && (
                <>
                    <div className={styles.chart}>
                        <h2 className={styles.chartTitle}>
                            Основные параметры Т-клеточного звена
                        </h2>

                        <Image
                            width={300}
                            height={300}
                            alt="t-cell chart"
                            src={chartsData.tCell}
                        />
                    </div>

                    <div className={styles.chart}>
                        <h2 className={styles.chartTitle}>
                            Основные параметры B-клеточного звена
                        </h2>

                        <Image
                            width={300}
                            height={300}
                            alt="b-cell chart"
                            src={chartsData.bCell}
                        />
                    </div>

                    <div className={styles.chart}>
                        <h2 className={styles.chartTitle}>Цитокиновые пары</h2>

                        <Image
                            width={300}
                            height={300}
                            alt="c-pair chart"
                            src={chartsData.cPair}
                        />
                    </div>
                </>
            )}
        </BaseModal>
    )
}

export default ChartModal
