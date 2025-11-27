'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PaymentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchPayment();
  }, [id]);

  const fetchPayment = async () => {
    try {
      const res = await fetch(`/api/payments/${id}`);
      const data = await res.json();
      setPayment(data);
    } catch (error) {
      console.error('Error fetching payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/payments');
      }
    } catch (error) {
      console.error('Error updating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/payments/${id}`, { method: 'DELETE' });
        router.push('/payments');
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!payment) return <p>Payment not found</p>;

  const fields = [
    {
      name: 'paymentType',
      label: 'Payment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'card', label: 'Card' },
        { value: 'transfer', label: 'Bank Transfer' },
        { value: 'cash', label: 'Cash' },
        { value: 'mobile', label: 'Mobile Money' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
        { value: 'failed', label: 'Failed' },
      ],
    },
    { name: 'referenceId', label: 'Reference ID', type: 'text', required: false },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Payments', href: '/payments' },
          { label: `#${payment.transactionId}` },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit Payment</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
      <Form
        fields={fields}
        initialData={payment}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update Payment"
      />
    </div>
  );
}
