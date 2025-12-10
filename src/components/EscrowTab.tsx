import React from "react";
import EscrowRequests from "@/components/EscrowOrders";

const EscrowTab = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Escrow Requests</h2>
      <EscrowRequests />
    </div>
  );
};

export default EscrowTab;
