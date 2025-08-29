http://localhost:3001/seller-dashboard/account"use client";

import { useState, useEffect } from "react";
import { LoggedInHeader } from "@/components/site/LoggedInHeader";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Volume2,
  VolumeX,
  Check
} from "lucide-react";
import { useRouter } from "next/navigation";

interface NotificationSettings {
  inboxMessages: boolean;
  orderMessages: boolean;
  orderUpdates: boolean;
  ratingReminders: boolean;
  buyerBriefs: boolean;
  general: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    inboxMessages: true,
    orderMessages: true,
    orderUpdates: true,
    ratingReminders: true,
    buyerBriefs: true,
    general: true
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Play sound effect when sound is toggled on
  const playTestSound = () => {
    if (soundEnabled) {
      // Create a simple notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    setHasUnsavedChanges(true);
    
    // Play sound when turning on
    if (newSoundState) {
      setTimeout(playTestSound, 100);
    }
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    // Here you would normally save to your backend
    console.log("Saving settings:", { soundEnabled, notificationSettings });
    
    setHasUnsavedChanges(false);
    setShowSaveSuccess(true);
    
    // Play success sound if sound is enabled
    if (soundEnabled) {
      setTimeout(() => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C note
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E note
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G note
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      }, 100);
    }
    
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const notificationTypes = [
    { key: 'inboxMessages' as keyof NotificationSettings, label: 'Inbox Messages', description: 'New messages from buyers and sellers' },
    { key: 'orderMessages' as keyof NotificationSettings, label: 'Order Messages', description: 'Updates about your active orders' },
    { key: 'orderUpdates' as keyof NotificationSettings, label: 'Order Updates', description: 'Status changes and delivery notifications' },
    { key: 'ratingReminders' as keyof NotificationSettings, label: 'Rating Reminders', description: 'Reminders to rate completed orders' },
    { key: 'buyerBriefs' as keyof NotificationSettings, label: 'Buyer Briefs', description: 'New requirements from buyers' },
    { key: 'general' as keyof NotificationSettings, label: 'General', description: 'Important platform updates and announcements' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <LoggedInHeader />
      
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-green-400">Settings</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl">
          <div className="w-full">
            <div className="bg-transparent">
              <div className="mb-6">
                <h2 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">NOTIFICATIONS</h2>
                <p className="text-gray-500 text-sm">
                  For important updates regarding your AI Market activity, certain notifications cannot be disabled.
                </p>
              </div>
              <div className="space-y-8">
                {/* Notification Settings Table */}
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-3 gap-4 pb-3 border-b border-gray-700">
                    <h3 className="text-white font-medium">Type</h3>
                    <h3 className="text-white font-medium text-center">Email</h3>
                    <h3 className="text-white font-medium text-center">Push</h3>
                  </div>

                  {notificationTypes.map((notification) => (
                    <div key={notification.key} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-800 last:border-b-0">
                      <div>
                        <h4 className="text-white font-medium">{notification.label}</h4>
                        <p className="text-gray-400 text-sm">{notification.description}</p>
                      </div>
                      
                      {/* Email Toggle */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleNotification(notification.key)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                            notificationSettings[notification.key]
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-600 bg-transparent hover:border-gray-500"
                          }`}
                        >
                          {notificationSettings[notification.key] && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </button>
                      </div>

                      {/* Push Toggle (same as email for simplicity) */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleNotification(notification.key)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                            notificationSettings[notification.key]
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-600 bg-transparent hover:border-gray-500"
                          }`}
                        >
                          {notificationSettings[notification.key] && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real-time Notifications Section */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-400 font-medium uppercase tracking-wider text-sm">REAL-TIME NOTIFICATIONS</h3>
                    <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">?</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Enable/disable real-time notifications</span>
                      <div className="flex items-center gap-3">
                        <div 
                          onClick={toggleSound}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            soundEnabled ? "bg-green-500" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              soundEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </div>
                        <button className="text-blue-400 text-sm font-medium cursor-pointer">Try Me!</button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white">Enable/disable sound</span>
                      <div className="flex items-center gap-3">
                        <div 
                          onClick={toggleSound}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            soundEnabled ? "bg-green-500" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              soundEnabled ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </div>
                        <button
                          onClick={toggleSound}
                          className="p-1 hover:bg-gray-800 rounded transition-colors cursor-pointer"
                        >
                          {soundEnabled ? (
                            <Volume2 className="h-4 w-4 text-white" />
                          ) : (
                            <VolumeX className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    {showSaveSuccess && (
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <Check className="h-4 w-4" />
                        Settings saved successfully!
                      </div>
                    )}
                    <Button
                      onClick={saveSettings}
                      disabled={!hasUnsavedChanges}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
