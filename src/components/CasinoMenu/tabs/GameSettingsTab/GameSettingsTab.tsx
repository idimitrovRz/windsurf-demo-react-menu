import styles from './GameSettingsTab.module.css'
import type { GameSettingsState } from '../../model/types'
import { Switch } from '../../components/Switch/Switch'

type GameSettingsTabProps = Readonly<{
  settings: GameSettingsState
  onSettingsChange: (next: GameSettingsState) => void
}>

export function GameSettingsTab(props: GameSettingsTabProps) {
  const { settings, onSettingsChange } = props

  return (
    <div className={styles.root}>
      <Switch
        id="casino-sound"
        label="Sound"
        checked={settings.sound}
        onCheckedChange={(next) => onSettingsChange({ ...settings, sound: next })}
      />
      <Switch
        id="casino-background-sound"
        label="Background Sound"
        checked={settings.backgroundSound}
        onCheckedChange={(next) =>
          onSettingsChange({ ...settings, backgroundSound: next })
        }
      />
      <Switch
        id="casino-quick-spin"
        label="Quick Spin"
        checked={settings.quickSpin}
        onCheckedChange={(next) => onSettingsChange({ ...settings, quickSpin: next })}
      />
      <Switch
        id="casino-battery-saver"
        label="Battery Saver"
        checked={settings.batterySaver}
        onCheckedChange={(next) =>
          onSettingsChange({ ...settings, batterySaver: next })
        }
      />
    </div>
  )
}
