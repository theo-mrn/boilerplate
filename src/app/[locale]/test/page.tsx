'use client';

import { useContactForm } from "@/hooks/useContactForm";

export default function TestPage() {
  const { formData, isSubmitting, handleSubmit, handleChange } = useContactForm();

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Test Formulaire de Contact</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          id="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          id="subject"
          placeholder="Sujet"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        
        <textarea
          id="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </button>
      </form>
    </div>
  );
} 


