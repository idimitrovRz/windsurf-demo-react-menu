import styles from './InfoTab.module.css'
import type { InfoModel } from '../../model/types'
import { formatMoneyAmount } from '../../model/format'

type InfoTabProps = Readonly<{
  infoModel: InfoModel
}>

export function InfoTab(props: InfoTabProps) {
  const { infoModel } = props

  return (
    <div className={styles.root}>
      {infoModel.symbols.map((symbol) => (
        <div key={symbol.id} className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.icon} aria-hidden="true" />
            <div className={styles.name}>{symbol.name}</div>
          </div>

          <div className={styles.payouts}>
            {symbol.payouts.map((payout) => (
              <div key={payout.count} className={styles.payoutRow}>
                <div className={styles.count}>{payout.count}x</div>
                <div className={styles.value}>{formatMoneyAmount(payout.payout)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
