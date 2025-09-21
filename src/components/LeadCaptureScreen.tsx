import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Briefcase, Link as LinkIcon } from 'lucide-react';

interface LeadCaptureScreenProps {
  onSubmit: (data: { name: string; email: string; businessName: string; websiteOrSocial: string; }) => void;
}

export const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    websiteOrSocial: ''
  });
  const [errors, setErrors] = useState({ email: '' });

  const validateEmail = (email: string) => {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const canSubmit = formData.name.trim() !== '' && formData.email.trim() !== '' && errors.email === '' && formData.businessName.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) {
      onSubmit(formData);
    }
  };

  const InputField = ({ icon: Icon, name, placeholder, type = 'text', value, onChange, error }: any) => (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-4 pl-12 border-2 rounded-lg focus:outline-none transition-colors ${error ? 'border-red-500' : 'border-gray-200 focus:border-brand-medium'}`}
      />
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Let's Get Started
          </h1>
          <p className="text-gray-600 text-sm">
            Tell us a bit about you and your business.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField icon={User} name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
          <InputField icon={Mail} name="email" placeholder="Your Email Address" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <InputField icon={Briefcase} name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} />
          <InputField icon={LinkIcon} name="websiteOrSocial" placeholder="Website or Social Media Link (Optional)" value={formData.websiteOrSocial} onChange={handleChange} />
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!canSubmit}
            className={`w-full bg-brand-medium text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg transition-all ${
              canSubmit ? 'hover:bg-brand-dark cursor-pointer' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
