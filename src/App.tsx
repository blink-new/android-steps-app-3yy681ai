import { useState, useRef, useEffect } from 'react'
import { Settings, Upload, FolderOpen, GitBranch, Paperclip, Sparkles, Mic, ChevronDown, Send, Eye, EyeOff } from 'lucide-react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [apiProvider, setApiProvider] = useState('openai')
  const [model, setModel] = useState('grok-2-vision')
  const [apiKey, setApiKey] = useState('••••••••')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const quickActions = [
    {
      icon: Upload,
      label: 'Import Chat',
      description: 'استيراد محادثة سابقة',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FolderOpen,
      label: 'Import Folder',
      description: 'استيراد ملفات المشروع',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: GitBranch,
      label: 'Clone a Git Repo',
      description: 'البدء من مستودع',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const examplePrompts = [
    "بناء تطبيق مهام باستخدام React و Tailwind",
    "إنشاء مدونة بسيطة باستخدام Astro",
    "إنشاء نموذج موافقة الكوكيز باستخدام Material UI"
  ]

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [prompt])

  const handleSendMessage = () => {
    if (!prompt.trim()) return
    
    setIsTyping(true)
    // Simulate API call
    setTimeout(() => {
      setIsTyping(false)
      setPrompt('')
    }, 2000)
  }

  const handleQuickPrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Mobile-first layout */}
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        
        {/* Status Bar Simulation */}
        <div className="h-6 bg-black/20 flex items-center justify-between px-4 text-xs text-white/60">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-2 bg-white/60 rounded-sm">
              <div className="w-3 h-full bg-green-500 rounded-sm"></div>
            </div>
            <span>100%</span>
          </div>
        </div>
        
        {/* Header Section */}
        <div className="p-6 pt-8 space-y-6">
          {/* Provider Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              AI Provider
            </label>
            <div className="relative">
              <select 
                value={apiProvider} 
                onChange={(e) => setApiProvider(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 text-white p-3 rounded-lg backdrop-blur-sm appearance-none pr-10"
              >
                <option value="openai">OpenAI Like</option>
                <option value="anthropic">Anthropic</option>
                <option value="groq">Groq</option>
                <option value="xai">X.AI / Grok</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Model Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              النموذج
            </label>
            <div className="relative">
              <select 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 text-white p-3 rounded-lg backdrop-blur-sm appearance-none pr-10"
              >
                <option value="grok-2-vision">x-ai/grok-2-vision-1212</option>
                <option value="gpt-4o-mini">GPT-4O Mini</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="grok-2">Grok 2</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* API Key */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              OpenAI Like API Key:
            </label>
            <div className="relative">
              <input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 text-white p-3 rounded-lg backdrop-blur-sm pr-20"
                placeholder="أدخل مفتاح API الخاص بك"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/50 transition-colors"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/50 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
          </div>
        </div>

        {/* Main Chat Input */}
        <div className="flex-1 p-6">
          <div className="bg-zinc-900/60 border border-zinc-700/50 p-6 rounded-xl backdrop-blur-md shadow-lg">
            <div className="space-y-4">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="كيف يمكن لـ Bolt مساعدتك اليوم؟"
                className="w-full bg-transparent border-none text-white placeholder:text-zinc-400 resize-none min-h-[100px] max-h-[200px] text-base leading-relaxed focus:ring-0 focus:outline-none"
                disabled={isTyping}
              />
              
              {/* Input Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-700/50">
                <div className="flex items-center space-x-4">
                  <button className="h-9 w-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full transition-colors">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button className="h-9 w-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full transition-colors">
                    <Sparkles className="h-4 w-4" />
                  </button>
                  <button className="h-9 w-9 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full transition-colors">
                    <Mic className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button className="h-9 w-9 flex items-center justify-center text-zinc-400 hover:text-white rounded-full transition-colors">
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={!prompt.trim() || isTyping}
                  >
                    {isTyping ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        جاري الإرسال
                      </>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="w-full p-5 flex items-center justify-start bg-zinc-900/60 border border-zinc-700/50 hover:bg-zinc-800/60 hover:border-zinc-600/50 rounded-xl backdrop-blur-md shadow-lg transition-all group"
            >
              <div className={`h-10 w-10 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-right flex-1">
                <div className="font-medium text-white text-right">{action.label}</div>
                <div className="text-sm text-zinc-400 text-right">{action.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Example Prompts */}
        <div className="p-6 pt-0 pb-8">
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(example)}
                className="block w-full text-right text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-1 px-2 rounded hover:bg-zinc-800/30"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom padding for safe area */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default App