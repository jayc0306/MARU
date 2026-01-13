
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import MindshareTracker from './components/MindshareTracker';
import MindshareArena from './components/MindshareArena';
import Events from './components/Events';
import InfoTab from './components/InfoTab';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile' | 'mindshare' | 'events' | 'arena' | 'info'>('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'profile':
        return <Profile />;
      case 'mindshare':
        return <MindshareTracker />;
      case 'arena':
        return <MindshareArena />;
      case 'events':
        return <Events />;
      case 'info':
        return <InfoTab />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout activeTab={currentPage} onTabChange={setCurrentPage}>
      {renderContent()}
    </Layout>
  );
};

export default App;
