import React from 'react';

export default function Navigation() {
  return (
    <div>
      <BottomNavigation
        onTabPress={newTab => setActiveTab({ activeTab: newTab.key })}
        renderTab={renderTab}
        tabs={tabs}
      />
    </div>
  );
}
