import { useEffect, useMemo, useState } from 'react'
import styles from './CasinoMenu.module.css'
import { Drawer } from './components/Drawer/Drawer'
import { Tabs } from './components/Tabs/Tabs'
import { DEFAULT_INFO_MODEL } from './model/config'
import type { CasinoMenuProps, CasinoMenuTabId } from './model/types'
import { GameSettingsTab } from './tabs/GameSettingsTab/GameSettingsTab'
import { AutoplayTab } from './tabs/AutoplayTab/AutoplayTab'
import { InfoTab } from './tabs/InfoTab/InfoTab'
import { HistoryTab } from './tabs/HistoryTab/HistoryTab'

const TAB_ORDER: ReadonlyArray<CasinoMenuTabId> = ['game', 'autoplay', 'info', 'history']

export function CasinoMenu(props: CasinoMenuProps) {
  const {
    isOpen,
    onRequestClose,
    initialTab,
    settings,
    onSettingsChange,
    autoplayRules,
    onAutoplayRulesChange,
    historyModel,
    onDateChange,
    onHistoryModeChange,
    infoModel,
  } = props

  const [activeTab, setActiveTab] = useState<CasinoMenuTabId>(initialTab ?? 'game')

  useEffect(() => {
    if (!initialTab) {
      return
    }

    setActiveTab(initialTab)
  }, [initialTab])

  useEffect(() => {
    if (TAB_ORDER.includes(activeTab)) {
      return
    }

    setActiveTab('game')
  }, [activeTab])

  const resolvedInfoModel = infoModel ?? DEFAULT_INFO_MODEL

  const tabItems = useMemo(
    () => [
      {
        id: 'game' as const,
        label: 'Game Settings',
        panel: (
          <GameSettingsTab settings={settings} onSettingsChange={onSettingsChange} />
        ),
      },
      {
        id: 'autoplay' as const,
        label: 'Autoplay Settings',
        panel: (
          <AutoplayTab
            autoplayRules={autoplayRules}
            onAutoplayRulesChange={onAutoplayRulesChange}
          />
        ),
      },
      {
        id: 'info' as const,
        label: 'Information',
        panel: <InfoTab infoModel={resolvedInfoModel} />,
      },
      {
        id: 'history' as const,
        label: 'History',
        panel: (
          <HistoryTab
            historyModel={historyModel}
            onDateChange={onDateChange}
            onHistoryModeChange={onHistoryModeChange}
          />
        ),
      },
    ],
    [
      autoplayRules,
      historyModel,
      onAutoplayRulesChange,
      onDateChange,
      onHistoryModeChange,
      onSettingsChange,
      resolvedInfoModel,
      settings,
    ],
  )

  return (
    <Drawer isOpen={isOpen} onRequestClose={onRequestClose} ariaLabel="Casino menu">
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>Menu</div>
          <button className={styles.closeButton} type="button" onClick={onRequestClose}>
            Close
          </button>
        </div>

        <Tabs
          activeTabId={activeTab}
          items={tabItems}
          onTabChange={setActiveTab}
        />
      </div>
    </Drawer>
  )
}
