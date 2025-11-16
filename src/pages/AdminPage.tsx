import { useState } from 'react';
import ChallengeBuilder from '../components/admin/ChallengeBuilder';
import ChallengeList from '../components/admin/ChallengeList';
import { Button } from '../components/ui/Button';

type AdminView = 'builder' | 'list';

const AdminPage = () => {
  const [currentView, setCurrentView] = useState<AdminView>('builder');

  const handleBackToGame = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handleBackToGame}
              className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              ← Back to Game
            </button>
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-400">Create and manage escape game challenges</p>
        </div>

        {/* Navigation */}
        <div className="mb-6 flex gap-4">
          <Button
            onClick={() => setCurrentView('builder')}
            variant={currentView === 'builder' ? 'primary' : 'secondary'}
          >
            Challenge Builder
          </Button>
          <Button
            onClick={() => setCurrentView('list')}
            variant={currentView === 'list' ? 'primary' : 'secondary'}
          >
            Challenge List
          </Button>
        </div>

        {/* Content */}
        {currentView === 'builder' && (
          <div>
            <ChallengeBuilder />
          </div>
        )}

        {currentView === 'list' && (
          <div>
            <ChallengeList />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
