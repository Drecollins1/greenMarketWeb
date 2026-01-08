import ApiFetcher from "@/utils/apis";
import { toast } from "react-toastify";
import { UsersResponse, UsersParams, User } from "@/types/user";

export const UserService = {
  /**
   * Get all users with pagination and filters
   */
  async getUsers(params?: UsersParams): Promise<UsersResponse> {
    try {
      const response = await ApiFetcher.get<UsersResponse>('/users', { params });
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
      throw error;
    }
  },

  /**
   * Get a single user by ID
   */
  async getUserById(id: number): Promise<User> {
    try {
      const response = await ApiFetcher.get<User>(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch user');
      throw error;
    }
  },

  /**
   * Create a new user
   */
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response = await ApiFetcher.post<User>('/users', userData);
      toast.success('User created successfully');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create user');
      throw error;
    }
  },

  /**
   * Update an existing user
   */
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response = await ApiFetcher.put<User>(`/users/${id}`, userData);
      toast.success('User updated successfully');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update user');
      throw error;
    }
  },

  /**
   * Delete a user
   */
  async deleteUser(id: number): Promise<void> {
    try {
      await ApiFetcher.delete(`/users/${id}`);
      toast.success('User deleted successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
      throw error;
    }
  },

  /**
   * Restore a soft-deleted user
   */
  async restoreUser(id: number): Promise<User> {
    try {
      const response = await ApiFetcher.put<User>(`/users/${id}/restore`);
      toast.success('User restored successfully');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to restore user');
      throw error;
    }
  },

  /**
   * Get users with specific filters (helper method)
   */
  async getFilteredUsers(filters: UsersParams): Promise<UsersResponse> {
    return this.getUsers(filters);
  },

  /**
   * Search users by name, email, or phone
   */
  async searchUsers(query: string, params?: Omit<UsersParams, 'search'>): Promise<UsersResponse> {
    return this.getUsers({
      ...params,
      search: query,
    });
  },
};