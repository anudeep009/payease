import React, { useEffect, useState } from 'react';
import { Search, Send, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  id: string;
}

export default function Payment() {
  const [balance, setBalance] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const fetchBalance = async () => {
    try {
      setBalanceLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/account/balance`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setBalance(response.data.balance);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error fetching balance');
    } finally {
      setBalanceLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setSearchLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/search`,
        {
          params: { query: searchTerm.trim() },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const usersList: User[] = response.data.users.map((user: any) => ({
          username: user.username,
          id: user.id,
        }));
        setUsers(usersList);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error searching users');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchUsers();
    } else {
      toast.error('Please enter a valid search term');
    }
  };

  const confirmTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && amount) {
      if (Number(amount) <= 0) {
        toast.error('Enter a valid amount greater than zero');
        return;
      }

      const isConfirmed = window.confirm(
        `Are you sure you want to transfer $${amount} to @${selectedUser.username}?`
      );

      if (!isConfirmed) return;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/account/transfer`,
          {
            toUserId: selectedUser.id,
            amount: amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success('Transaction successful');
          await fetchBalance();
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error.response?.data?.message || 'Error during transfer');
      } finally {
        setAmount('');
        setSelectedUser(null);
        setSearchTerm('');
        setUsers([]);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Balance Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-8 h-8" />
          <h2 className="text-xl font-semibold">Your Balance</h2>
        </div>
        <p className="text-3xl font-bold">
          {balanceLoading ? <span className="loader" /> : `$${balance.toFixed(2)}`}
        </p>
      </div>

      {/* Transfer Section */}
      <form onSubmit={confirmTransfer} className="p-6">
        <h3 className="text-lg font-semibold mb-4">Transfer Money</h3>

        {/* Search Recipients */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        {/* Users List */}
        {searchLoading ? (
          <p className="text-center text-gray-500">Searching...</p>
        ) : (
          searchTerm &&
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setSearchTerm('');
                setUsers([]);
              }}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                selectedUser?.id === user.id ? 'bg-blue-50' : ''
              }`}
            >
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          ))
        )}

        {/* Selected User */}
        {selectedUser && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center gap-3">
            <p className="text-sm text-gray-500">@{selectedUser.username}</p>
          </div>
        )}

        {/* Amount Input */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="amount"
              className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedUser || !amount}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
          Transfer Money
        </button>
      </form>
    </div>
  );
}
