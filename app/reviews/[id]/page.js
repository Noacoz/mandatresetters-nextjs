'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Form from '@/components/Form';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ReviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchReview();
  }, [id]);

  const fetchReview = async () => {
    try {
      const res = await fetch(`/api/reviews/${id}`);
      if (res.ok) {
        const data = await res.json();
        setReview(data);
      } else {
        setReview(null);
      }
    } catch (error) {
      console.error('Error fetching review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/reviews');
      }
    } catch (error) {
      console.error('Error updating review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      try {
        await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
        router.push('/reviews');
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!review) return <p>Review not found</p>;

  const fields = [
    {
      name: 'rating',
      label: 'Rating',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: '1 - Poor' },
        { value: '2', label: '2 - Fair' },
        { value: '3', label: '3 - Good' },
        { value: '4', label: '4 - Very Good' },
        { value: '5', label: '5 - Excellent' },
      ],
    },
    { name: 'comment', label: 'Comment', type: 'textarea', required: false },
  ];

  return (
    <div className="container py-8 max-w-2xl">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/admin/dashboard' },
          { label: 'Reviews', href: '/reviews' },
          { label: `Review #${review.id}` },
        ]}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit Review</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
      <Form
        fields={fields}
        initialData={review}
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Update Review"
      />
    </div>
  );
}
