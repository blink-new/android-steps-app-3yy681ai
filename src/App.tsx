import { useState, useRef, useEffect } from 'react'
import { Settings, Upload, FolderOpen, GitBranch, Paperclip, Sparkles, Mic, ChevronDown, Send, Eye, EyeOff, CheckCircle, FileUp } from 'lucide-react'

// Mock list of AI models by provider
const aiModels = {
  openai: [
    { id: 'gpt-4o', name: 'GPT-4o (OpenAI Like)' },
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  ],
  anthropic: [
    { id: 'claude-3-opus', name: 'Claude 3 Opus' },
    { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
    { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
  ],
  groq: [
    { id: 'llama3-70b', name: 'LLaMA3 70b (Groq)' },
    { id: 'mixtral-8x7b', name: 'Mixtral 8x7b (Groq)' },
  ],
  xai: [
    { id: 'grok-2-vision', name: 'x-ai/grok-2-vision-1212' },
    { id: 'grok-1.5', name: 'Grok 1.5' },
  ],
  local: [
    { id: 'local-model-1', name: 'نموذج محلي 1 (غير متصل)' },
  ]
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [apiProvider, setApiProvider] = useState('openai')
  const [model, setModel] = useState(aiModels.openai[0].id)
  const [apiKey, setApiKey] = useState('')
  const [savedApiKey, setSavedApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [apiKeySaved, setApiKeySaved] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved API key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem(`apiKey-${apiProvider}`)
    if (storedKey) {
      setApiKey(storedKey)
      setSavedApiKey(storedKey)
      setApiKeySaved(true)
    }
  }, [apiProvider])

  const handleProviderChange = (newProvider: string) => {
    setApiProvider(newProvider)
    setModel(aiModels[newProvider as keyof typeof aiModels][0].id)
    setApiKey('') // Clear API key when provider changes
    setSavedApiKey('')
    setApiKeySaved(false)
    const storedKey = localStorage.getItem(`apiKey-${newProvider}`)
    if (storedKey) {
      setApiKey(storedKey)
      setSavedApiKey(storedKey)
      setApiKeySaved(true)
    }
  }

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(`apiKey-${apiProvider}`, apiKey)
      setSavedApiKey(apiKey)
      setApiKeySaved(true)
      // Show confirmation for a few seconds
      setTimeout(() => setApiKeySaved(false), 3000) 
    }
  }

  const quickActions = [
    {
      icon: Upload,
      label: 'Import Chat',
      description: 'استيراد محادثة سابقة',
      color: 'from-blue-500 to-cyan-500',
      action: () => console.log('Import Chat clicked')
    },
    {
      icon: FolderOpen,
      label: 'Import Folder',
      description: 'استيراد ملفات المشروع',
      color: 'from-green-500 to-emerald-500',
      action: () => console.log('Import Folder clicked')
    },
    {
      icon: GitBranch,
      label: 'Clone a Git Repo',
      description: 'البدء من مستودع',
      color: 'from-purple-500 to-pink-500',
      action: () => console.log('Clone Git Repo clicked')
    },
    {
      icon: FileUp,
      label: 'رفع نموذج محلي',
      description: 'تشغيل نموذج بدون انترنت',
      color: 'from-yellow-500 to-amber-500',
      action: () => fileInputRef.current?.click()
    }
  ]

  const examplePrompts = [
    "بناء تطبيق مهام باستخدام React و Tailwind",
    "إنشاء مدونة بسيطة باستخدام Astro",
    "إنشاء نموذج موافقة الكوكيز باستخدام Material UI"
  ]

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [prompt])

  const handleSendMessage = () => {
    if (!prompt.trim()) return
    setIsTyping(true)
    console.log(`Sending message with provider: ${apiProvider}, model: ${model}, prompt: ${prompt}`)
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Local model selected:', file.name);
      // Here you would typically process the file
      // For now, we'll just log it and potentially set it as a local model option
      setApiProvider('local');
      setModel(file.name); // Or a generated ID for it
      // You might want to add this file to a temporary list of local models
      // and update aiModels.local dynamically or have a dedicated state for uploaded models.
    }
  };

  const currentModels = aiModels[apiProvider as keyof typeof aiModels] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".gguf,.onnx" />
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative">
        <div className="h-6 bg-black/20 flex items-center justify-between px-4 text-xs text-white/60">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-2 bg-white/60 rounded-sm">
              <div className="w-3 h-full bg-green-500 rounded-sm"></div>
            </div>
            <span>100%</span>
          </div>
        </div>
        
        <div className="p-6 pt-8 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              AI Provider
            </label>
            <div className="relative">
              <select 
                value={apiProvider} 
                onChange={(e) => handleProviderChange(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 text-white p-3 rounded-lg backdrop-blur-sm appearance-none pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="openai">OpenAI Like</option>
                <option value="anthropic">Anthropic</option>
                <option value="groq">Groq</option>
                <option value="xai">X.AI / Grok</option>
                <option value="local">نموذج محلي</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              النموذج
            </label>
            <div className="relative">
              <select 
                value={model} 
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 text-white p-3 rounded-lg backdrop-blur-sm appearance-none pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                disabled={apiProvider === 'local' && !currentModels.find(m => m.id === model) && model !== ''}
              >
                {currentModels.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
                {apiProvider === 'local' && !currentModels.find(m => m.id === model) && model !== '' && (
                  <option value={model} disabled>{model} (مرفوع)</option>
                )}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {apiProvider !== 'local' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                {apiProvider === 'openai' ? 'OpenAI Like' : apiProvider.charAt(0).toUpperCase() + apiProvider.slice(1)} API Key:
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value)
                    setApiKeySaved(false) // Reset save status on change
                  }}
                  className="w-full bg-zinc-900/80 border border-zinc-700/50 text-white p-3 rounded-lg backdrop-blur-sm pr-24 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  placeholder="أدخل مفتاح API الخاص بك"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/50 transition-colors"
                    aria-label={showApiKey ? "إخفاء المفتاح" : "إظهار المفتاح"}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={handleSaveApiKey}
                    className={`h-8 w-8 flex items-center justify-center rounded-md hover:bg-zinc-800/50 transition-colors ${apiKeySaved && apiKey.trim() ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                    aria-label="حفظ المفتاح"
                    disabled={!apiKey.trim() || (apiKeySaved && apiKey === savedApiKey)}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button className="h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/50 transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className={`h-1 rounded-full transition-all duration-300 ${apiKeySaved && apiKey.trim() ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}></div>
              {apiKeySaved && apiKey.trim() && <p className="text-xs text-green-400 text-right">تم حفظ مفتاح API بنجاح!</p>}
            </div>
          )}
        </div>

        <div className="flex-1 p-6">
          <div className="bg-zinc-900/60 border border-zinc-700/50 p-6 rounded-xl backdrop-blur-md shadow-lg h-full flex flex-col">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="كيف يمكن لـ Bolt مساعدتك اليوم؟"
              className="w-full bg-transparent border-none text-white placeholder:text-zinc-400 resize-none flex-1 text-base leading-relaxed focus:ring-0 focus:outline-none"
              disabled={isTyping}
            />
            
            <div className="flex items-center justify-between pt-4 border-t border-zinc-700/50 mt-auto">
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

        <div className="p-6 space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="w-full p-5 flex items-center justify-start bg-zinc-900/60 border border-zinc-700/50 hover:bg-zinc-800/60 hover:border-zinc-600/50 rounded-xl backdrop-blur-md shadow-lg transition-all group active:scale-95"
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

        <div className="p-6 pt-0 pb-8">
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(example)}
                className="block w-full text-right text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-1 px-2 rounded hover:bg-zinc-800/30 active:bg-zinc-700/50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default App
