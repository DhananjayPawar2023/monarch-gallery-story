import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    if (typeof window.ethereum === "undefined") {
      toast.error("Please install MetaMask to connect your wallet");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
      toast.success("Wallet connected successfully");
    } catch (error) {
      toast.error("Failed to connect wallet");
      console.error(error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    toast.success("Wallet disconnected");
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAddress(accounts[0] || null);
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, isConnected: !!address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};
