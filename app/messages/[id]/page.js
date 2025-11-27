'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function MessageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    try {
      const res = await fetch(`/api/messages/${id}`);
      const data = await res.json();
      setMessage(data);
      setStatus(data.status);
    } catch (error) {
      console.error('Error fetching message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        setMessage({ ...message, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/messages/${id}`, { method: 'DELETE' });
        router.push('/messages');
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!message) return <p>Message not found</p>;

  return (
    <div className="container py-8 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Messages', href: '/messages' },
          { label: `#${message.id}` },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Message Details</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">From</label>
          <p className="text-gray-700">{message.name} ({message.email})</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Subject</label>
          <p className="text-gray-700">{message.subject}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Message</label>
          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="text-sm text-gray-500">
          Received: {new Date(message.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
