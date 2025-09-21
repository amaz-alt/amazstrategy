import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { User, Mail, Briefcase, Link as LinkIcon } from 'lucide-react-native';

const brandColors = {
  light: '#f0fdf4',
  medium: '#16a34a',
};

interface LeadCaptureScreenProps {
  onSubmit: (data: { name: string; email: string; businessName: string; websiteOrSocial: string; }) => void;
}

const InputField = ({ icon: Icon, name, placeholder, value, onChange, error, ...props }: any) => (
  <View>
    <View style={styles.inputContainer}>
      <Icon style={styles.inputIcon} color="#9ca3af" size={20} />
      <TextInput
        style={[styles.input, error ? styles.inputError : {}]}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={(text) => onChange(name, text)}
        {...props}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

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

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const canSubmit = formData.name.trim() !== '' && formData.email.trim() !== '' && errors.email === '' && formData.businessName.trim() !== '';

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subtitle}>Tell us a bit about you and your business.</Text>
        </View>
        
        <View style={styles.form}>
          <InputField icon={User} name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
          <InputField icon={Mail} name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
          <InputField icon={Briefcase} name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} />
          <InputField icon={LinkIcon} name="websiteOrSocial" placeholder="Website or Social Media Link (Optional)" value={formData.websiteOrSocial} onChange={handleChange} />
          
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!canSubmit}
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.light,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 56,
    paddingLeft: 48,
    paddingRight: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    width: '100%',
    backgroundColor: brandColors.medium,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
