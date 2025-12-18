"use client";

import React, { useEffect, useState } from "react";
import { Package, User, Clock, CheckCircle, XCircle } from "lucide-react";
import { FaChevronDown, FaFilter } from "react-icons/fa6";
import Image from "next/image";
import { getOffers,acceptOffer,rejectOffer,} from "@/services/escrow";
import { EscrowOffer, EscrowStatus } from "@/types/escrow";

/* -------------------- STATUS COLORS -------------------- */
const getStatusColor = (status: EscrowStatus) => {
  switch (status) {
    case "accepted":
    case "success":
      return "bg-green-100 text-green-800";
    case "pending":
    case "in_escrow":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
    case "cancelled":
    case "failed":
      return "bg-red-100 text-red-800";
    case "disputed":
      return "bg-orange-100 text-orange-800";
    case "abandoned":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/* -------------------- COMPONENT -------------------- */
const EscrowRequests: React.FC = () => {
  const [orders, setOrders] = useState<EscrowOffer[]>([]);
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState<EscrowStatus | "all">("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<EscrowOffer | null>(null);

  /* -------------------- FETCH OFFERS -------------------- */
  const fetchOffers = async () => {
    setLoading(true);
    const res = await getOffers();
    if (res) setOrders(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  /* -------------------- FILTER -------------------- */
  const filteredOrders = orders.filter((o) =>
    statusFilter === "all" ? true : o.status === statusFilter
  );

  /* -------------------- MODAL HANDLERS -------------------- */
  const openModal = (order: EscrowOffer) => {
    setCurrentOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentOrder(null);
  };

  /* -------------------- ACTIONS -------------------- */
  const handleAccept = async () => {
    if (!currentOrder) return;
    const ok = await acceptOffer(currentOrder.id);
    if (ok) {
      closeModal();
      fetchOffers();
    }
  };

  const handleReject = async () => {
    if (!currentOrder) return;
    const ok = await rejectOffer(currentOrder.id);
    if (ok) {
      closeModal();
      fetchOffers();
    }
  };

  /* -------------------- PRICE -------------------- */
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  /* -------------------- ACTION BUTTON LOGIC -------------------- */
  const renderAction = (order: EscrowOffer) => {
    /** BUYER */
    if (order.user_type === "buyer") {
      if (order.status === "in_escrow" && order.payment_link) {
        return (
          <button
            onClick={() => window.open(order.payment_link, "_blank")}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Make Payment
          </button>
        );
      }

      return (
        <span
          className={`inline-block text-xs px-3 py-1 rounded-full ${getStatusColor(
            order.status
          )}`}
        >
          {order.status.replace("_", " ")}
        </span>
      );
    }

    /** SELLER */
    if (order.user_type === "seller" && order.status === "pending") {
      return (
        <button
          onClick={() => openModal(order)}
          className="w-full bg-[#39B54A] text-white px-4 py-2 rounded-lg hover:bg-[#188727]"
        >
          Manage Escrow
        </button>
      );
    }

    return null;
  };

  /* -------------------- UI -------------------- */
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Escrow Requests</h2>

      {/* FILTER */}
      <div className="flex items-center gap-3 mb-6 bg-white p-4 rounded-lg border">
        <FaFilter />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as EscrowStatus | "all")
          }
          className="border px-3 py-1 rounded-lg"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="in_escrow">In Escrow</option>
          <option value="success">Success</option>
        </select>
      </div>

      {/* GRID */}
      {loading ? (
        <p>Loading...</p>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center ">
          <p>No escrow requests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-white hover:shadow-md"
            >
              {/* IMAGE */}
              <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                {order.product.images?.length ? (
                  <Image
                    src={order.product.images[0]}
                    className="w-full h-full object-cover"
                    alt={order.user_type}
                    width={50} 
                    height={50}
                  />
                ) : (
                  <Package className="w-10 h-10 text-gray-400" />
                )}
              </div>

              {/* TITLE */}
              <h3 className="font-semibold mb-1">
                {order.product.title}
              </h3>

              {/* USER */}
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                <User className="w-3 h-3" />
                {order.user_type === "seller"
                  ? order.buyer.first_name
                  : order.seller.first_name}
              </div>

              {/* AMOUNT & STATUS */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-green-600">
                  {formatPrice(order.amount)}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.replace("_", " ")}
                </span>
              </div>

              {/* DATE */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <Clock className="w-3 h-3" />
                {new Date(order.created_at).toLocaleDateString()}
              </div>

              {/* ACTION */}
              {renderAction(order)}
            </div>
          ))}
        </div>
      )}

      {/* MODAL (SELLER ONLY) */}
      {modalOpen && currentOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Manage Escrow</h3>
              <button onClick={closeModal}>
                <XCircle />
              </button>
            </div>

            <p className="text-sm mb-2">
              Product: {currentOrder.product.title}
            </p>
            <p className="text-sm mb-4">
              Amount: {formatPrice(currentOrder.amount)}
            </p>

            <div className="space-y-3">
              <button
                onClick={handleAccept}
                className="w-full bg-green-600 text-white py-2 rounded-lg"
              >
                <CheckCircle className="inline w-4 h-4 mr-1" />
                Accept Offer
              </button>

              <button
                onClick={handleReject}
                className="w-full bg-red-600 text-white py-2 rounded-lg"
              >
                <XCircle className="inline w-4 h-4 mr-1" />
                Reject Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscrowRequests;
