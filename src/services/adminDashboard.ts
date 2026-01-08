import ApiFetcher from "@/utils/apis";
import { toast } from "react-toastify";
import { DashboardData } from "@/types/adminDashboard";

export const DashboardService = {
  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardData> {
    try {
      const response = await ApiFetcher.get<DashboardData>('/dashboard');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch dashboard data');
      throw error;
    }
  },

  /**
   * Get sales chart data (you'll need to implement this endpoint)
   */
  async getSalesChartData(timeRange: string): Promise<any> {
    try {
      const response = await ApiFetcher.get('/dashboard/sales', {
        params: { period: timeRange }
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch sales data');
      throw error;
    }
  },

  /**
   * Get recent products (you'll need to implement this endpoint)
   */
  async getRecentProducts(): Promise<string[]> {
    try {
      const response = await ApiFetcher.get('/dashboard/recent-products');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch recent products');
      throw error;
    }
  },
};