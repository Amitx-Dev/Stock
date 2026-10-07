import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { UserTable } from '../../components/admin/UserTable';
import { UserModal } from '../../components/admin/UserModal';
import { useTrading } from '../../context/TradingContext';

export const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { showToast } = useTrading();

  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      showToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (userData) => {
    if (userData.id) {
      await api.updateUser(userData);
      setUsers(prev => prev.map(u => (u.id === userData.id ? { ...u, ...userData } : u)));
      showToast(`User ${userData.name} updated successfully.`, 'success');
    } else {
      const created = await api.createUser(userData);
      setUsers(prev => [...prev, created]);
      showToast(`New user ${userData.name} created.`, 'success');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this user account?')) return;
    try {
      await api.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      showToast('User account removed.', 'info');
    } catch {
      showToast('Failed to delete user.', 'error');
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.updateUser({ ...user, status: newStatus });
      setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, status: newStatus } : u)));
      showToast(`User ${user.name} is now ${newStatus}.`, 'info');
    } catch {
      showToast('Failed to toggle status.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">User & Account Management</h2>
          <p className="text-xs text-slate-400">
            Control platform participants, allocate administrative roles, and enforce account suspensions.
          </p>
        </div>
      </div>

      <UserTable
        users={users}
        onAddUser={handleAddUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={editingUser}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};
