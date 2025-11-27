'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/users');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        router.push('/users');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <p>User not found</p>;

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { value: 'customer', label: 'Customer' },
        { value: 'admin', label: 'Admin' },
      ],
    },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Users', href: '/users' },
          { label: user.name },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit User</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
      <Form
        fields={fields}
        initialData={user}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update User"
      />
    </div>
  );
}
