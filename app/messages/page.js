'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import Table from '@/components/Table';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (messages.length === 0) return <EmptyState title="No Messages" />;

  const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  return (
    <div className="container py-8">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Messages' },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Contact Messages</h1>
      </div>
      <Table
        data={messages}
        columns={columns}
        onDelete={handleDelete}
        baseUrl="/messages"
      />
    </div>
  );
}
