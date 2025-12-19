import styles from './AutoplayTab.module.css'
import { AUTOPLAY_SLIDERS } from '../../model/config'
import type { AutoplayRulesState } from '../../model/types'
import { formatMoneyAmount, withAmount } from '../../model/format'
import { Slider } from '../../components/Slider/Slider'

type AutoplayTabProps = Readonly<{
  autoplayRules: AutoplayRulesState
  onAutoplayRulesChange: (next: AutoplayRulesState) => void
}>

export function AutoplayTab(props: AutoplayTabProps) {
  const { autoplayRules, onAutoplayRulesChange } = props

  return (
    <div className={styles.root}>
      <div className={styles.stopLabel}>STOP AUTOPLAY</div>

      {AUTOPLAY_SLIDERS.map((slider) => {
        const current = autoplayRules[slider.id]

        return (
          <Slider
            key={slider.id}
            id={`casino-${slider.id}`}
            label={slider.label}
            min={slider.min.amount}
            max={slider.max.amount}
            value={current.amount}
            dragStep={slider.dragStep}
            keyboardStep={slider.keyboardStep}
            keyboardStepLarge={slider.keyboardStepLarge}
            formatValue={(amount) => formatMoneyAmount(withAmount(current, amount))}
            onChange={(nextAmount) =>
              onAutoplayRulesChange({
                ...autoplayRules,
                [slider.id]: withAmount(current, nextAmount),
              })
            }
          />
        )
      })}
    </div>
  )
}
