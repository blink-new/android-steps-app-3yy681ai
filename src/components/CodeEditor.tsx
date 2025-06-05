import { useState, useEffect } from 'react'
import { FileCode } from 'lucide-react'

interface CodeEditorProps {
  activeFile: string | null
}

export function CodeEditor({ activeFile }: CodeEditorProps) {
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState('javascript')

  useEffect(() => {
    if (activeFile) {
      // Determine language from file extension
      const ext = activeFile.split('.').pop()?.toLowerCase()
      switch (ext) {
        case 'js':
        case 'jsx':
          setLanguage('javascript')
          break
        case 'ts':
        case 'tsx':
          setLanguage('typescript')
          break
        case 'css':
          setLanguage('css')
          break
        case 'html':
          setLanguage('html')
          break
        case 'json':
          setLanguage('json')
          break
        default:
          setLanguage('plaintext')
      }
    }
  }, [activeFile])

  if (!activeFile) {
    return (
      <div className="flex-1 bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <FileCode className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-500">Select a file to start editing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-zinc-900 flex flex-col">
      <div className="bg-zinc-800 border-b border-zinc-700 px-4 py-2">
        <div className="text-sm text-zinc-300">{activeFile}</div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full bg-transparent text-zinc-300 font-mono text-sm focus:outline-none resize-none"
          placeholder={`// Start coding in ${language}...`}
          spellCheck={false}
        />
      </div>
    </div>
  )
}