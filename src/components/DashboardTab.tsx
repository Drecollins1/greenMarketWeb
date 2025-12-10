"use client";
import React from "react";
import { Package, ShoppingCart } from "lucide-react";
import { formatWalletAmount } from "@/utils/func";
import { DashboardStats } from "@/services/dashboard";

interface Props {
  dashboardData: DashboardStats | null;
  loading: boolean;
  refresh: () => void;
  getActualProductCount: () => number;
}

const DashboardTab: React.FC<Props> = ({
  dashboardData,
  loading,
  refresh,
  getActualProductCount,
}) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          Refresh
          {loading && (
            <div className="w-4 h-4 border-2 border-[#39B54A] border-t-transparent rounded-full animate-spin"></div>
          )}
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-[#39B54A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Wallet */}
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Wallet</p>
              <p className="text-3xl font-bold text-green-700">
                {dashboardData
                  ? formatWalletAmount(dashboardData.wallet)
                  : "₦0.00"}
              </p>
            </div>

            {/* Products */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold">{getActualProductCount()}</p>
            </div>

            {/* Escrow */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Escrow Orders</p>
              <p className="text-3xl font-bold">
                {dashboardData?.escrow ?? 0}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardTab;
