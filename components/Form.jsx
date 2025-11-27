'use client';

import { useState } from 'react';

export default function Form({
  fields,
  onSubmit,
  initialData = {},
  submitLabel = 'Submit',
  loading = false,
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name} className="block font-semibold mb-2">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              required={field.required}
              className={`form-control w-full ${
                errors[field.name] ? 'border-red-500' : ''
              }`}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className={`form-control w-full ${
                errors[field.name] ? 'border-red-500' : ''
              }`}
            >
              <option value="">-- Select {field.label} --</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              className="w-4 h-4"
            />
          ) : (
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className={`form-control w-full ${
                errors[field.name] ? 'border-red-500' : ''
              }`}
            />
          )}

          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={submitting || loading}
        className="btn btn-primary w-full"
      >
        {submitting || loading ? 'Submitting...' : submitLabel}
      </button>
    </form>
  );
}
