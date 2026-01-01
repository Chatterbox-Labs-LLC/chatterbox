'use client'

import { Button } from '@/components/ui/button'
import { MessageSquare, ArrowRight, Globe, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Log in
            </Link>
            <Button asChild size="sm">
              <Link href="/onboarding">Get chatterbox free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Your team&apos;s entire <br />
            <span className="text-primary">conversation, in one place.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Chatterbox is the workspace where teams communicate, collaborate, and grow. 
            Beautifully simple, incredibly powerful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button asChild size="lg" className="h-12 px-8 text-lg font-medium rounded-full">
              <Link href="/onboarding">
                Get chatterbox free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg font-medium rounded-full">
              Request a demo
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 text-left mt-24">
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Team First</h3>
              <p className="text-muted-foreground leading-relaxed">
                Organize your team into channels, groups, or direct messages. Scale from 2 to 2,000.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground leading-relaxed">
                Built for speed with real-time updates and an interface that stays out of your way.
              </p>
            </div>
            <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Work Anywhere</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sync seamlessly across desktop, mobile, and web. Your messages follow you.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/help" className="hover:text-primary transition-colors">Help</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Chatterbox Labs LLC.
          </p>
        </div>
      </footer>
    </div>
  )
}
