'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (!email) {
      router.push('/signup')
    }
  }, [email, router])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else {
      setResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleVerify = async () => {
    if (otp.length !== 6) return

    setIsVerifying(true)
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email as string,
        token: otp,
        type: 'signup',
      })

      if (error) throw error

      toast.success('Email verified successfully!')
      router.push('/chat')
    } catch (error: any) {
      toast.error(error.message || 'Invalid verification code')
      setOtp('')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setResendDisabled(true)
    setCountdown(60)
    
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      
      // First, trigger Supabase to resend the OTP
      const { error: supabaseError } = await supabase.auth.resend({
        type: 'signup',
        email: email as string,
      })

      if (supabaseError) throw supabaseError

      // Then send our custom email via Resend
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      if (!response.ok) throw new Error('Failed to send email')

      toast.success('Verification code resent!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend code')
      setResendDisabled(false)
      setCountdown(0)
    }
  }

  return (
    <div className="w-full max-w-[450px]">
      <Card className="border shadow-lg bg-card text-center">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Verify your email</CardTitle>
          <CardDescription className="text-muted-foreground">
            We&apos;ve sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            onComplete={handleVerify}
            disabled={isVerifying}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button 
            className="w-full h-11 text-base" 
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Email'}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">
            Didn&apos;t receive a code?{' '}
            <button
              onClick={handleResend}
              disabled={resendDisabled}
              className="text-primary font-medium hover:underline disabled:opacity-50 disabled:no-underline"
            >
              {resendDisabled ? `Resend in ${countdown}s` : 'Resend code'}
            </button>
          </div>
          <Link href="/signup" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Back to signup
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Suspense fallback={
        <div className="w-full max-w-[450px]">
          <Card className="border shadow-lg bg-card text-center">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Loading...</CardTitle>
            </CardHeader>
          </Card>
        </div>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  )
}

