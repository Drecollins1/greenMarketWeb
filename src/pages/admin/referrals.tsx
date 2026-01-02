'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Search, Wallet, Users, TrendingUp, AlertCircle, Gift } from 'lucide-react';

interface WithdrawalRequest {
  id: string;
  user: string;
  email: string;
  points: number;
  amount: number;
  bank: string;
  account: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface TopReferrer {
  id: string;
  name: string;
  referrals: number;
  pointsEarned: number;
}

const mockWithdrawals: WithdrawalRequest[] = [
  { id: '1', user: 'Adeline Enterprise', email: 'adeline@example.com', points: 2000, amount: 200, bank: 'GTBank', account: '0123456789', date: '2026-01-02', status: 'Pending' },
  { id: '2', user: 'Michael Brown', email: 'michael@example.com', points: 1500, amount: 150, bank: 'Access Bank', account: '9876543210', date: '2026-01-01', status: 'Approved' },
  { id: '3', user: 'Olajuwon Francis', email: 'olajuwon@example.com', points: 500, amount: 50, bank: 'Zenith Bank', account: '5555555555', date: '2025-12-30', status: 'Pending' },
];

const mockTopReferrers: TopReferrer[] = [
  { id: '1', name: 'Adeline Enterprise', referrals: 45, pointsEarned: 4500 },
  { id: '2', name: 'John Tractor Ltd', referrals: 32, pointsEarned: 3200 },
  { id: '3', name: 'Alice Oyekan', referrals: 28, pointsEarned: 2800 },
  { id: '4', name: 'Michael Brown', referrals: 20, pointsEarned: 2000 },
];

export default function AdminReferralsPage() {
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');
  const [showModal, setShowModal] = useState(false);

  const handleAction = (withdrawal: WithdrawalRequest, type: 'approve' | 'reject') => {
    setSelectedWithdrawal(withdrawal);
    setActionType(type);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedWithdrawal) return;

    const newStatus = actionType === 'approve' ? 'Approved' : 'Rejected';
    setWithdrawals(withdrawals.map(w =>
      w.id === selectedWithdrawal.id ? { ...w, status: newStatus } : w
    ));
    setShowModal(false);
  };

  const totalPointsIssued = 15200;
  const totalCashPaid = 1250;
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'Pending').reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Referral Program Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor referrals, review withdrawals, and manage rewards
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Points Issued</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalPointsIssued.toLocaleString()}</p>
            </div>
            <Gift className="w-10 h-10 text-amber-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cash Paid Out</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₦{totalCashPaid.toLocaleString()}</p>
            </div>
            <Wallet className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Withdrawals</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">₦{pendingWithdrawals}</p>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Referrers</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">127</p>
            </div>
            <Users className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Pending Withdrawals */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Pending Withdrawal Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Bank Details</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="text-center py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {withdrawals.filter(w => w.status === 'Pending').map((w) => (
                <tr key={w.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{w.user}</p>
                      <p className="text-sm text-gray-500">{w.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell text-sm text-gray-600">
                    {w.bank} • {w.account.slice(-4)}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold">₦{w.amount}</p>
                    <p className="text-xs text-gray-500">{w.points} points</p>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{w.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAction(w, 'approve')}
                        className="p-2 hover:bg-green-50 rounded-lg transition"
                        title="Approve"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </button>
                      <button
                        onClick={() => handleAction(w, 'reject')}
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                        title="Reject"
                      >
                        <XCircle className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Referrers */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Top Referrers</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockTopReferrers.map((ref, index) => (
              <div key={ref.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{ref.name}</p>
                    <p className="text-sm text-gray-500">{ref.referrals} successful referrals</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{ref.pointsEarned.toLocaleString()} points</p>
                  <p className="text-sm text-gray-500">₦{(ref.pointsEarned * 0.1).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showModal && selectedWithdrawal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4">
              {actionType === 'approve' ? 'Approve' : 'Reject'} Withdrawal?
            </h3>
            <div className="space-y-3 mb-6">
              <p><strong>User:</strong> {selectedWithdrawal.user}</p>
              <p><strong>Amount:</strong> ₦{selectedWithdrawal.amount} ({selectedWithdrawal.points} points)</p>
              <p><strong>Bank:</strong> {selectedWithdrawal.bank} • **{selectedWithdrawal.account.slice(-4)}</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-6 py-3 rounded-lg font-medium text-white ${
                  actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionType === 'approve' ? 'Approve & Pay' : 'Reject Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}