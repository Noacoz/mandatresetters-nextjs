'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';

export default function CreatePaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/payments');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'transactionId', label: 'Transaction ID', type: 'text', required: true },
    { name: 'amount', label: 'Amount', type: 'number', required: true },
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
          { label: 'Create' },
        ]}
      />
      <h1 className="text-4xl font-bold mb-6">Create Payment</h1>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create Payment"
      />
    </div>
  );
}
