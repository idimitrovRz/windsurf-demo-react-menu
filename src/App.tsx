import './App.css'
import { useMemo, useState } from 'react'
import { CasinoMenu } from './components/CasinoMenu/CasinoMenu'
import { HamburgerButton } from './components/CasinoMenu/components/HamburgerButton/HamburgerButton'
import type {
  AutoplayRulesState,
  GameSettingsState,
  HistoryModel,
  HistoryMode,
  IsoDate,
} from './components/CasinoMenu/model/types'
import { todayIsoDate } from './components/CasinoMenu/model/history'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'game' | 'autoplay' | 'info' | 'history'>('game')

  const [settings, setSettings] = useState<GameSettingsState>({
    sound: true,
    backgroundSound: true,
    quickSpin: false,
    batterySaver: false,
  })

  const [autoplayRules, setAutoplayRules] = useState<AutoplayRulesState>({
    stopOnBalanceDecrease: { amount: 0, currency: 'EUR' },
    stopOnSingleWin: { amount: 0, currency: 'EUR' },
    stopOnBalanceIncrease: { amount: 0, currency: 'EUR' },
  })

  const [historyMode, setHistoryMode] = useState<HistoryMode>('current')
  const [selectedDate, setSelectedDate] = useState<IsoDate>(todayIsoDate())

  const historyModel = useMemo<HistoryModel>(() => {
    const sampleEntry = {
      id: 'entry-1',
      timestampMs: Date.now(),
      title: 'Spin',
      delta: { amount: 1.5, currency: 'EUR' as const },
    }

    return {
      mode: historyMode,
      selectedDate,
      entriesByDate: {
        current: {
          [selectedDate]: [sampleEntry],
        },
        all: {
          [selectedDate]: [sampleEntry, { ...sampleEntry, id: 'entry-2', title: 'Bonus' }],
        },
      },
    }
  }, [historyMode, selectedDate])

  return (
    <div className="appRoot">
      <div className="demoCard">
        <div className="demoHeader">
          <h1 className="demoTitle">Casino Menu Demo</h1>
          <HamburgerButton isOpen={isOpen} onClick={() => setIsOpen(true)} />
        </div>

        <div className="demoRow">
          <span>Initial tab:</span>
          <select value={activeTab} onChange={(e) => setActiveTab(e.target.value as typeof activeTab)}>
            <option value="game">game</option>
            <option value="autoplay">autoplay</option>
            <option value="info">info</option>
            <option value="history">history</option>
          </select>
        </div>

        <div className="demoRow">
          <span>Selected history date:</span>
          <code>{selectedDate}</code>
        </div>
      </div>

      <CasinoMenu
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        initialTab={activeTab}
        settings={settings}
        onSettingsChange={setSettings}
        autoplayRules={autoplayRules}
        onAutoplayRulesChange={setAutoplayRules}
        historyModel={historyModel}
        onDateChange={setSelectedDate}
        onHistoryModeChange={setHistoryMode}
      />
    </div>
  )
}

export default App
