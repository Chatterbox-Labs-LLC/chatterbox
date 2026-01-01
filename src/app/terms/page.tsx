import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4 prose dark:prose-invert">
      <Link href="/" className="text-primary hover:underline mb-8 inline-block">← Back to home</Link>
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-4">Last updated: January 1, 2026</p>
      
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">1. Terms</h2>
          <p>By accessing chatterbox, you are agreeing to be bound by these terms of service, all applicable laws and regulations.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on chatterbox for personal, non-commercial transitory viewing only.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">3. Disclaimer</h2>
          <p>The materials on chatterbox are provided on an 'as is' basis. Chatterbox Labs LLC makes no warranties, expressed or implied.</p>
        </div>
      </section>
    </div>
  )
}
