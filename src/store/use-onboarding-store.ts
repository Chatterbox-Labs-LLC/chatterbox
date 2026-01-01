import { create } from 'zustand'

export type OnboardingStep = 'signup' | 'purpose' | 'profile' | 'workspace' | 'invite' | 'complete'

interface OnboardingState {
  step: OnboardingStep
  email: string
  fullName: string
  purpose: 'personal' | 'team' | 'school' | ''
  workspaceName: string
  workspaceIcon: string
  setStep: (step: OnboardingStep) => void
  setField: (field: keyof Omit<OnboardingState, 'setStep' | 'setField'>, value: string) => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 'signup',
  email: '',
  fullName: '',
  purpose: '',
  workspaceName: '',
  workspaceIcon: '',
  setStep: (step) => set({ step }),
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  reset: () => set({
    step: 'signup',
    email: '',
    fullName: '',
    purpose: '',
    workspaceName: '',
    workspaceIcon: '',
  }),
}))
