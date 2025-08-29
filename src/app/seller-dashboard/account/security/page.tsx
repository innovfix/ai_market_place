'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SellerDashboardHeader } from '@/components/site/SellerDashboardHeader';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SecurityPage() {
  // Change password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2FA state
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Alerts state
  const [loginAlerts, setLoginAlerts] = useState(true);

  const onSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;
    // TODO: call API
    console.log('Password updated');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const onToggle2FA = () => {
    setTwoFAEnabled(!twoFAEnabled);
  };

  const onLogoutAll = () => {
    // TODO: call API to revoke sessions
    console.log('Logged out of all sessions');
  };

  return (
    <div className="min-h-screen bg-black">
      <SellerDashboardHeader />
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <Link href="/seller-dashboard/account" className="hover:underline">Settings</Link>
          <span className="mx-2">/</span>
          <span className="text-white">Account security</span>
        </div>

        <h1 className="text-2xl font-bold text-white">Account security</h1>
        <p className="text-gray-400 mt-2">Update your password, manage 2FA, sessions and login alerts.</p>

        {/* Change Password */}
        <Card className="bg-gray-950 border border-gray-800 mt-6 p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-white mb-4">Change password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-200">Current password</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-black/60 border-gray-800 text-white placeholder:text-gray-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">New password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-black/60 border-gray-800 text-white placeholder:text-gray-500"
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-200">Confirm new password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-black/60 border-gray-800 text-white placeholder:text-gray-500"
                placeholder="Re-enter new password"
              />
            </div>
          </div>
          <div className="pt-4">
            <Button onClick={onSavePassword} disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}>
              Save Changes
            </Button>
          </div>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="bg-gray-950 border border-gray-800 mt-6 p-6 rounded-xl">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Two-factor authentication (2FA)</h2>
              <p className="text-gray-400 text-sm mt-1">Add an extra layer of security to your account.</p>
            </div>
            <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs ${twoFAEnabled ? 'bg-green-900/40 text-green-300' : 'bg-gray-800 text-gray-300'}`}>
              <span className={`inline-block h-2 w-2 rounded-full ${twoFAEnabled ? 'bg-green-400' : 'bg-gray-500'}`} />
              {twoFAEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>

          {!twoFAEnabled ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-200">Phone number (optional)</label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-black/60 border-gray-800 text-white placeholder:text-gray-500"
                  placeholder="+1 555 000 0000"
                />
              </div>
              <div className="md:col-span-2 text-sm text-gray-400">
                Use an authenticator app (Google Authenticator, Authy, etc.). You'll scan a QR code in the next step.
              </div>
              <div className="md:col-span-2">
                <Button onClick={onToggle2FA}>Enable 2FA</Button>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-400 mb-2">Authenticator secret (demo)</div>
                <div className="rounded-lg border border-gray-800 bg-black/60 p-4 text-gray-200 select-all">JBSWY3DPEHPK3PXP</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Recovery codes</div>
                <div className="rounded-lg border border-gray-800 bg-black/60 p-4 text-gray-200 space-y-1">
                  {['7H2K-9QPL','DW38-CKA2','PZ1F-LM9V','Q8RT-X1ZB','A7N3-DKQ5'].map(code => (
                    <div key={code} className="font-mono">{code}</div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 flex items-center gap-3">
                <Button variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700" onClick={onToggle2FA}>
                  Disable 2FA
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-200 hover:bg-gray-800">
                  Regenerate recovery codes
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Devices & Sessions */}
        <Card className="bg-gray-950 border border-gray-800 mt-6 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Devices & sessions</h2>
            <Button className="bg-red-600 hover:bg-red-500" onClick={onLogoutAll}>Log out of all sessions</Button>
          </div>
          <div className="mt-4 divide-y divide-gray-800">
            {[{ device:'Chrome on macOS', location:'Bengaluru, IN', last:'Just now (This device)' }, { device:'Safari on iPhone', location:'Bengaluru, IN', last:'2 days ago' }].map((s, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-white">{s.device}</div>
                  <div className="text-xs text-gray-400">{s.location} • {s.last}</div>
                </div>
                <Button variant="secondary" className="bg-gray-800 text-white hover:bg-gray-700">Log out</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Login alerts */}
        <Card className="bg-gray-950 border border-gray-800 mt-6 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Login alerts</h2>
              <p className="text-gray-400 text-sm">Get an email when a new device logs into your account.</p>
            </div>
            <div
              onClick={() => setLoginAlerts(!loginAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${loginAlerts ? 'bg-green-500' : 'bg-gray-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${loginAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
          </div>
        </Card>

        {/* Footer link */}
        <div className="mt-6">
          <Link href="/seller-dashboard/account" className="text-blue-400 hover:underline">Back to account</Link>
        </div>
      </div>
    </div>
  );
}
