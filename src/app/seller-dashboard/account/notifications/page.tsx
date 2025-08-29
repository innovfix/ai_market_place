'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Button } from '@/components/ui/button';

interface NotificationSettings {
  inboxMessages: boolean;
  orderMessages: boolean;
  orderUpdates: boolean;
  ratingReminders: boolean;
  buyerBriefs: boolean;
  general: boolean;
}

export default function NotificationsPage() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    inboxMessages: true,
    orderMessages: true,
    orderUpdates: true,
    ratingReminders: true,
    buyerBriefs: true,
    general: true,
  });

  const notificationTypes = [
    { key: 'inboxMessages' as const, label: 'Inbox Messages', description: 'New messages from buyers and sellers' },
    { key: 'orderMessages' as const, label: 'Order Messages', description: 'Updates about your active orders' },
    { key: 'orderUpdates' as const, label: 'Order Updates', description: 'Status changes and delivery notifications' },
    { key: 'ratingReminders' as const, label: 'Rating Reminders', description: 'Reminders to rate completed orders' },
    { key: 'buyerBriefs' as const, label: 'Buyer Briefs', description: 'New requirements from buyers' },
    { key: 'general' as const, label: 'General', description: 'Important platform updates and announcements' },
  ];

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setHasUnsavedChanges(true);
  };

  const toggleSound = () => {
    setSoundEnabled((s) => !s);
    setHasUnsavedChanges(true);
  };

  const save = () => {
    // Simulate save
    console.log('Saved notification settings', { settings, soundEnabled });
    setHasUnsavedChanges(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <Link href="/seller-dashboard/account" className="hover:underline">Settings</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Notifications</span>
        </div>

        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <p className="text-gray-400 mt-2">Set how you'd like to receive notifications.</p>

        {/* Types table */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl mt-6">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">NOTIFICATIONS</h2>
              <p className="text-gray-500 text-sm">For important updates regarding your AI Market activity, certain notifications cannot be disabled.</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-800">
              <h3 className="text-white font-medium">Type</h3>
              <h3 className="text-white font-medium text-center">Email</h3>
              <h3 className="text-white font-medium text-center">Push</h3>
            </div>

            <div className="divide-y divide-gray-800">
              {notificationTypes.map((n) => (
                <div key={n.key} className="grid grid-cols-3 gap-4 py-4">
                  <div>
                    <h4 className="text-white font-medium">{n.label}</h4>
                    <p className="text-gray-400 text-sm">{n.description}</p>
                  </div>
                  {/* Email toggle */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleSetting(n.key)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        settings[n.key] ? 'bg-blue-600 border-blue-600' : 'border-gray-600 bg-transparent hover:border-gray-500'
                      }`}
                    >
                      {settings[n.key] && (
                        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      )}
                    </button>
                  </div>
                  {/* Push toggle (same) */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleSetting(n.key)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        settings[n.key] ? 'bg-blue-600 border-blue-600' : 'border-gray-600 bg-transparent hover:border-gray-500'
                      }`}
                    >
                      {settings[n.key] && (
                        <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time section */}
        <div className="bg-gray-950 border border-gray-800 rounded-xl mt-6 p-6">
          <div className="flex items-center gap-2">
            <h3 className="text-gray-400 font-medium uppercase tracking-wider text-sm">REAL-TIME NOTIFICATIONS</h3>
            <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center"><span className="text-white text-xs">?</span></div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Enable/disable real-time notifications</span>
              <div
                onClick={toggleSound}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${soundEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white">Enable/disable sound</span>
              <div
                onClick={toggleSound}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${soundEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            {showSaveSuccess && (
              <div className="text-green-400 text-sm">Settings saved!</div>
            )}
            <Button onClick={save} disabled={!hasUnsavedChanges}>Save Changes</Button>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/seller-dashboard/account" className="text-blue-400 hover:underline">Back to account</Link>
        </div>
      </div>
    </div>
  );
}
