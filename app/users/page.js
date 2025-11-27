'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[{ label: 'Dashboard', href: '/admin/dashboard' }, { label: 'Users' }]}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Users Management</h1>
        <Link href="/users/create" className="btn btn-primary">
          Add New User
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <EmptyState message="No users found" />
      ) : (
        <Table
          columns={columns}
          data={users}
          onDelete={handleDelete}
          editLink={(id) => `/users/${id}`}
        />
      )}
    </div>
  );
}
