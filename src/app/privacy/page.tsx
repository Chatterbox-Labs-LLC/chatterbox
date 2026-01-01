import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4 prose dark:prose-invert">
      <Link href="/" className="text-primary hover:underline mb-8 inline-block">← Back to home</Link>
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">Last updated: January 1, 2026</p>
      
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, use our chat services, or communicate with us.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, and to develop new ones.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">3. Data Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.</p>
        </div>
      </section>
    </div>
  )
}
