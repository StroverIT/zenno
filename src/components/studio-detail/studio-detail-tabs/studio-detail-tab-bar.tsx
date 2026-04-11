import type { TabKey } from './types';

type TabDef = { key: TabKey; label: string; count: number };

export function StudioDetailTabBar({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: TabDef[];
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
}) {
  return (
    <div className="mt-10 flex gap-1 overflow-x-auto border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`whitespace-nowrap border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.key
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
}
