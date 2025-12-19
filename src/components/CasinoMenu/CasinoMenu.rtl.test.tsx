import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useMemo, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { CasinoMenu } from './CasinoMenu'
import type {
  AutoplayRulesState,
  GameSettingsState,
  HistoryMode,
  HistoryModel,
  IsoDate,
} from './model/types'
import { todayIsoDate } from './model/history'

function Harness(
  props: Readonly<{ isOpen?: boolean; onRequestClose?: () => void; initialTab?: 'game' | 'history' }>,
) {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? true)
  const onRequestClose = props.onRequestClose ?? (() => setIsOpen(false))
  const [initialTab] = useState<'game' | 'history'>(props.initialTab ?? 'game')

  const [settings, setSettings] = useState<GameSettingsState>({
    sound: true,
    backgroundSound: false,
    quickSpin: false,
    batterySaver: false,
  })

  const [autoplayRules, setAutoplayRules] = useState<AutoplayRulesState>({
    stopOnBalanceDecrease: { amount: 0, currency: 'EUR' },
    stopOnSingleWin: { amount: 0, currency: 'EUR' },
    stopOnBalanceIncrease: { amount: 0, currency: 'EUR' },
  })

  const [historyMode, setHistoryMode] = useState<HistoryMode>('current')
  const [selectedDate] = useState<IsoDate>(todayIsoDate())

  const historyModel = useMemo<HistoryModel>(() => {
    const entry1 = {
      id: 'entry-1',
      timestampMs: 1,
      title: 'Spin',
      delta: { amount: 1, currency: 'EUR' as const },
    } as const

    const entry2 = {
      id: 'entry-2',
      timestampMs: 2,
      title: 'Bonus',
      delta: { amount: 2, currency: 'EUR' as const },
    } as const

    return {
      mode: historyMode,
      selectedDate,
      entriesByDate: {
        current: {
          [selectedDate]: [entry1],
        },
        all: {
          [selectedDate]: [entry1, entry2],
        },
      },
    }
  }, [historyMode, selectedDate])

  return (
    <CasinoMenu
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      initialTab={initialTab}
      settings={settings}
      onSettingsChange={setSettings}
      autoplayRules={autoplayRules}
      onAutoplayRulesChange={setAutoplayRules}
      historyModel={historyModel}
      onDateChange={() => {
        return
      }}
      onHistoryModeChange={setHistoryMode}
    />
  )
}

describe('CasinoMenu (RTL)', () => {
  it('closes on overlay click', async () => {
    const user = userEvent.setup()
    const onRequestClose = vi.fn()

    render(<Harness onRequestClose={onRequestClose} />)

    await user.click(screen.getByRole('button', { name: 'Close menu' }))
    expect(onRequestClose).toHaveBeenCalledTimes(1)
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const onRequestClose = vi.fn()

    render(<Harness onRequestClose={onRequestClose} />)

    await user.keyboard('{Escape}')
    expect(onRequestClose).toHaveBeenCalledTimes(1)
  })

  it('traps focus within the drawer', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const closeButton = screen.getByRole('button', { name: 'Close' })
    expect(closeButton).toHaveFocus()

    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(screen.getByRole('switch', { name: 'Battery Saver' })).toHaveFocus()

    await user.keyboard('{Tab}')
    expect(closeButton).toHaveFocus()
  })

  it('switches tabs and toggles settings', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const soundSwitch = screen.getByRole('switch', { name: 'Sound' })
    expect(soundSwitch).toHaveAttribute('aria-checked', 'true')

    await user.click(soundSwitch)
    expect(soundSwitch).toHaveAttribute('aria-checked', 'false')

    await user.click(screen.getByRole('tab', { name: 'Autoplay Settings' }))
    expect(screen.getByText('STOP AUTOPLAY')).toBeInTheDocument()

    await user.click(screen.getByRole('tab', { name: 'Information' }))
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })

  it('updates autoplay sliders via keyboard', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(screen.getByRole('tab', { name: 'Autoplay Settings' }))

    const slider = screen.getByRole('slider', { name: 'If balance decreases by' })
    slider.focus()

    await user.keyboard('{ArrowRight}')
    expect(slider).toHaveAttribute('aria-valuetext', '0.10 EUR')

    await user.keyboard('{Shift>}{ArrowRight}{/Shift}')
    expect(slider).toHaveAttribute('aria-valuetext', '1.10 EUR')
  })

  it('switches history mode via segmented control', async () => {
    const user = userEvent.setup()
    render(<Harness initialTab="history" />)

    expect(screen.getByText('Spin')).toBeInTheDocument()
    expect(screen.queryByText('Bonus')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'All Games' }))
    expect(screen.getByText('Bonus')).toBeInTheDocument()
  })
})
