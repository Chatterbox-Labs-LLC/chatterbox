'use client'

import Link from 'next/link'
import { useOnboardingStore, OnboardingStep } from '@/store/use-onboarding-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MessageSquare, User, Building2, ArrowRight, ArrowLeft } from 'lucide-react'

export default function OnboardingPage() {
  const { step, setStep, email, fullName, purpose, workspaceName, setField } = useOnboardingStore()

  const nextStep = (next: OnboardingStep) => setStep(next)

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">chatterbox</span>
        </Link>
      </div>

      <div className="w-full max-w-[450px]">
        {step === 'signup' && (
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center px-0">
              <CardTitle className="text-3xl font-bold">Create your account</CardTitle>
              <CardDescription className="text-lg">
                Enter your email to get started with chatterbox.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input 
                  id="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setField('email', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="px-0">
              <Button className="w-full h-12 text-lg" onClick={() => nextStep('purpose')}>
                Continue <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 'purpose' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">How will you use chatterbox?</h1>
              <p className="text-muted-foreground text-lg">We&apos;ll streamline your setup based on your answer.</p>
            </div>
            
            <RadioGroup 
              value={purpose} 
              onValueChange={(val) => setField('purpose', val as 'personal' | 'team' | 'school')}
              className="grid gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="personal" id="personal" className="peer sr-only" />
                <Label
                  htmlFor="personal"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <User className="mb-3 h-8 w-8 text-primary" />
                  <span className="text-lg font-semibold">For myself</span>
                  <p className="text-sm text-muted-foreground text-center mt-1">Write, plan, and get organized.</p>
                </Label>
              </div>
              
              <div className="relative">
                <RadioGroupItem value="team" id="team" className="peer sr-only" />
                <Label
                  htmlFor="team"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                >
                  <Building2 className="mb-3 h-8 w-8 text-primary" />
                  <span className="text-lg font-semibold">With my team</span>
                  <p className="text-sm text-muted-foreground text-center mt-1">Collaborate on your projects.</p>
                </Label>
              </div>
            </RadioGroup>

            <Button 
              className="w-full h-12 text-lg" 
              disabled={!purpose}
              onClick={() => nextStep('profile')}
            >
              Continue
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => nextStep('signup')}>
              <ArrowLeft className="mr-2 w-4 h-4" /> Back
            </Button>
          </div>
        )}

        {step === 'profile' && (
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center px-0">
              <CardTitle className="text-3xl font-bold">Set up your profile</CardTitle>
              <CardDescription className="text-lg">
                Let your team know who you are.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-0">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 cursor-pointer transition-colors">
                  <User className="w-10 h-10 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input 
                  id="name" 
                  placeholder="George Holmes" 
                  value={fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="px-0 flex flex-col gap-2">
              <Button className="w-full h-12 text-lg" onClick={() => nextStep('workspace')}>
                Continue
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => nextStep('purpose')}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 'workspace' && (
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center px-0">
              <CardTitle className="text-3xl font-bold">Create a workspace</CardTitle>
              <CardDescription className="text-lg">
                This is where your team&apos;s work lives.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-0">
              <div className="space-y-2">
                <Label htmlFor="workspace">Workspace name</Label>
                <Input 
                  id="workspace" 
                  placeholder="Acme Inc" 
                  value={workspaceName}
                  onChange={(e) => setField('workspaceName', e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="px-0 flex flex-col gap-2">
              <Button className="w-full h-12 text-lg" onClick={() => nextStep('complete')}>
                Launch chatterbox
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => nextStep('profile')}>
                <ArrowLeft className="mr-2 w-4 h-4" /> Back
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 'complete' && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Welcome to chatterbox, {fullName.split(' ')[0]}!</h1>
            <p className="text-muted-foreground text-lg">
              Your workspace <strong>{workspaceName}</strong> is ready. 
              Get ready to experience the best team communication.
            </p>
            <Button asChild className="w-full h-12 text-lg">
              <Link href="/chat">Go to my workspace</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
