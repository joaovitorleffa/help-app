import React, { useState, createContext, ReactNode, useContext } from 'react';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  cep: string;
  number: string;
  city: string;
  district: string;
  password: string;
  confirmPassword: string;
}

interface SignUpStepsContextData {
  formData: FormData;
  clearFormData: () => void;
  serializeFormData: (data: Partial<FormData>) => void;
}

interface SignUpStepsProviderData {
  children: ReactNode;
}

const SignUpStepsContext = createContext({} as SignUpStepsContextData);

function SignUpStepsProvider({ children }: SignUpStepsProviderData) {
  const [formData, setFormData] = useState({} as FormData);

  function serializeFormData(data: Partial<FormData>) {
    setFormData({ ...formData, ...data });
  }

  function clearFormData() {
    setFormData({} as FormData);
  }

  return (
    <SignUpStepsContext.Provider value={{ formData, serializeFormData, clearFormData }}>
      {children}
    </SignUpStepsContext.Provider>
  );
}

function useSignUpSteps() {
  const context = useContext(SignUpStepsContext);

  return context;
}

export { SignUpStepsProvider, useSignUpSteps };
