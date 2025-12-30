// api/chat.ts
import ApiFetcher from "@/utils/apis";
import { toast } from "react-toastify";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

// GET MESSAGES FOR A RECEIVER
export const getMessages = async (receiverId: string): Promise<Message[] | null> => {
  try {
    const response = await ApiFetcher.get<{ data: Message[] }>(`/chats/messages/${receiverId}`);
    if (response?.data?.data) {
      return response.data.data;
    }
    toast.error("Failed to load messages");
    return null;
  } catch (error) {
    console.error("Error fetching messages:", error);
    toast.error("Error fetching messages");
    return null;
  }
};

// SEND MESSAGE
export const sendMessage = async (receiverId: string, text: string): Promise<Message | null> => {
  try {
    const response = await ApiFetcher.post<{ data: Message }>(`/chats/messages/${receiverId}`, {
      text,
    });
    if (response?.data?.data) {
      return response.data.data;
    }
    toast.error("Failed to send message");
    return null;
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error("Error sending message");
    return null;
  }
};
