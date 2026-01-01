'use client'

import { useChatStore } from '@/store/use-chat-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const { messages, addMessage } = useChatStore()
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    addMessage({ id: Date.now(), text: input, sender: 'user' })
    setInput('')
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
      <div className="w-full max-w-2xl border rounded-lg shadow-lg flex flex-col h-[600px] bg-card">
        <header className="p-4 border-b flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">chatterbox</h1>
        </header>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-muted-foreground mt-10">No messages yet. Start chatting!</p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="flex flex-col gap-1">
                  <div className="bg-secondary p-2 rounded-lg self-start max-w-[80%]">
                    {m.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <footer className="p-4 border-t flex gap-2">
          <Input 
            placeholder="Type a message..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </footer>
      </div>
    </main>
  )
}
