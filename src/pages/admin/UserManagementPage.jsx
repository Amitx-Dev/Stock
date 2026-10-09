import React, { useState } from 'react';
import { initialUsers } from '../../data/mockUsers';
import { DataTable } from '../../components/common/DataTable';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { StatCard } from '../../components/common/StatCard';
import { useToast } from '../../context/ToastContext';
import { Users, UserPlus, Edit3, Trash2, Shield, UserCheck, AlertCircle, Mail } from 'lucide-react';

export const UserManagementPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const { showToast } = useToast();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Trader',
    status: 'Active'
  });
  const [formErrors, setFormErrors] = useState({});

  const openAddModal = () => {
    setSelectedUser(null);
    setFormData({ name: '', email: '', role: 'Trader', status: 'Active' });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openDeleteDialog = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (selectedUser) {
      // Update
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, ...formData } : u
        )
      );
      showToast('User updated successfully', 'success');
    } else {
      // Create
      const newUser = {
        id: `USR-00${users.length + 1}`,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: 'Never',
        tradesCount: 0
      };
      setUsers((prev) => [newUser, ...prev]);
      showToast('User created successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    showToast('User deleted successfully', 'success');
    setIsDeleteOpen(false);
  };

  // KPI Calculations
  const totalCount = users.length;
  const adminCount = users.filter((u) => u.role === 'Admin').length;
  const traderCount = users.filter((u) => u.role === 'Trader').length;
  const activeCount = users.filter((u) => u.status === 'Active').length;

  const columns = [
    {
      header: 'User Profile',
      key: 'name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center shrink-0">
            {row.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-400 font-mono">{row.id}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Email Address',
      key: 'email',
      sortable: true,
      render: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 font-mono">
          {row.email}
        </span>
      )
    },
    {
      header: 'Role',
      key: 'role',
      sortable: true,
      render: (row) => (
        <Badge variant={row.role.toLowerCase() === 'admin' ? 'admin' : 'trader'} size="sm">
          {row.role}
        </Badge>
      )
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (row) => {
        let variant = 'success';
        if (row.status === 'Inactive') variant = 'danger';
        if (row.status === 'Pending') variant = 'warning';
        return <Badge variant={variant} size="sm">{row.status}</Badge>;
      }
    },
    {
      header: 'Created Date',
      key: 'createdAt',
      sortable: true,
      render: (row) => <span className="text-xs text-slate-500 font-mono">{row.createdAt}</span>
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => openEditModal(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-brand-700 hover:bg-brand-50 dark:hover:bg-brand-950/50 transition-colors"
            title="Edit user"
            aria-label={`Edit ${row.name}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => openDeleteDialog(row)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            title="Delete user"
            aria-label={`Delete ${row.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            User Accounts & Roles
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage authenticated platform users, grant administration privileges, and view onboarding status.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={totalCount.toString()}
          subtitle="All registered accounts"
          icon={Users}
        />
        <StatCard
          title="Active Traders"
          value={traderCount.toString()}
          subtitle="Client demat portfolios"
          icon={UserCheck}
          iconBg="bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
        />
        <StatCard
          title="Super Admins"
          value={adminCount.toString()}
          subtitle="Full console access"
          icon={Shield}
          iconBg="bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
        />
        <StatCard
          title="Active Status"
          value={activeCount.toString()}
          subtitle="Verified KYC profiles"
          icon={AlertCircle}
          iconBg="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
        />
      </div>

      {/* User DataTable */}
      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        searchPlaceholder="Search users by name..."
        filterKey="role"
        filterLabel="Role"
        filterOptions={[
          { label: 'Admin', value: 'Admin' },
          { label: 'Trader', value: 'Trader' }
        ]}
        itemsPerPage={5}
        emptyMessage="No users matching your filters"
      />

      {/* Add / Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? 'Edit User Profile' : 'Add New User'}
        description={
          selectedUser
            ? `Modify details and permissions for ${selectedUser.name}`
            : 'Enter account details to provision a new platform user.'
        }
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Chandra"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                formErrors.name
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
              }`}
            />
            {formErrors.name && (
              <p className="text-xs text-trade-red mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. user@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                formErrors.email
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
              }`}
            />
            {formErrors.email && (
              <p className="text-xs text-trade-red mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role Permission
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Trader">Trader (Standard)</option>
                <option value="Admin">Admin (Full Access)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Account Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-brand-700 hover:bg-brand-800 text-white rounded-xl shadow-sm transition-all"
            >
              {selectedUser ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Confirm User Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to permanently delete user{' '}
            <strong className="text-slate-900 dark:text-white">{selectedUser?.name}</strong> (
            <span className="font-mono text-xs">{selectedUser?.email}</span>)?
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60">
            ⚠️ This will invalidate their active session and permanently revoke their access and security tokens.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsDeleteOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteUser}
              className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm transition-all"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
