'use client'

import { useChatStore } from '@/store/use-chat-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { 
  MessageSquare, 
  Hash, 
  Settings, 
  Plus, 
  Search, 
  Bell, 
  HelpCircle,
  Send,
  UserCircle
} from 'lucide-react'
import { useState } from 'react'

export default function ChatPage() {
  const { messages, addMessage } = useChatStore()
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    addMessage({ 
      id: Date.now(), 
      text: input, 
      sender: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    })
    setInput('')
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - Workspaces */}
      <div className="w-[72px] bg-muted/50 border-r flex flex-col items-center py-4 gap-4 overflow-y-auto">
        <Separator className="w-8" />
        <div className="w-12 h-12 bg-muted rounded-[24px] flex items-center justify-center hover:bg-primary/20 hover:rounded-xl transition-all cursor-pointer">
          <Plus className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Sidebar - Channels */}
      <div className="w-60 bg-muted/20 border-r flex flex-col overflow-hidden">
        <header className="h-12 px-4 flex items-center justify-between border-b shadow-sm shrink-0">
          <h2 className="font-bold truncate">Acme Workspace</h2>
          <Settings className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </header>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-4">
            <div>
              <div className="flex items-center justify-between px-2 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Channels</span>
                <Plus className="w-3 h-3 cursor-pointer" />
              </div>
              <div className="space-y-0.5">
                {['general', 'engineering', 'marketing', 'random'].map((channel) => (
                  <div key={channel} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer group">
                    <Hash className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{channel}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between px-2 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Direct Messages</span>
                <Plus className="w-3 h-3 cursor-pointer" />
              </div>
              <div className="space-y-0.5">
                {['George Holmes', 'Sarah Chen', 'Alex Rivera'].map((user) => (
                  <div key={user} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer group">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
        <footer className="p-3 bg-muted/10 border-t flex items-center gap-2 shrink-0">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback><UserCircle /></AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold truncate">You</p>
            <p className="text-[10px] text-muted-foreground truncate">#1234</p>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
        </footer>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 px-4 flex items-center justify-between border-b shadow-sm shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-bold">general</h3>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Bell className="w-5 h-5 cursor-pointer hover:text-foreground" />
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2" />
              <Input placeholder="Search" className="h-8 w-40 pl-8 bg-muted/50 border-none text-xs" />
            </div>
            <HelpCircle className="w-5 h-5 cursor-pointer hover:text-foreground" />
          </div>
        </header>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Hash className="w-8 h-8 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Welcome to #general!</h1>
              <p className="text-muted-foreground">This is the start of the #general channel.</p>
              <Button variant="link" size="sm" className="mt-2">Edit Channel</Button>
            </div>

            {messages.map((m) => (
              <div key={m.id} className="flex gap-4 group hover:bg-muted/30 -mx-4 px-4 py-1 transition-colors">
                <Avatar className="w-10 h-10 mt-1 shrink-0">
                  <AvatarImage src="" />
                  <AvatarFallback>{m.sender[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="font-bold hover:underline cursor-pointer">{m.sender}</span>
                    <span className="text-[10px] text-muted-foreground">{m.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 break-words">{m.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <footer className="p-4 shrink-0">
          <div className="bg-muted/30 rounded-lg p-1 flex flex-col">
            <div className="flex items-center px-2 py-1 gap-1">
              <Plus className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground bg-muted/50 rounded-full p-1" />
              <Input 
                placeholder="Message #general" 
                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-9"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1 px-2">
            Tip: Press Enter to send messages
          </p>
        </footer>
      </div>
    </div>
  )
}
