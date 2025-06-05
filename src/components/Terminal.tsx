import { useState } from 'react'
import { X, Terminal as TerminalIcon } from 'lucide-react'
import { Button } from './ui/button'

interface TerminalProps {
  onClose: () => void
}

export function Terminal({ onClose }: TerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([
    'WebContainer Terminal v1.0.0',
    'Note: Limited to browser-compatible commands',
    ''
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newHistory = [...history, `$ ${input}`]
    
    // Simulate command responses
    if (input === 'help') {
      newHistory.push(
        'Available commands:',
        '  help     - Show this help message',
        '  clear    - Clear terminal',
        '  pwd      - Print working directory',
        '  ls       - List directory contents',
        '  echo     - Display message',
        ''
      )
    } else if (input === 'clear') {
      setHistory(['WebContainer Terminal v1.0.0', ''])
      setInput('')
      return
    } else if (input === 'pwd') {
      newHistory.push('/home/project', '')
    } else if (input === 'ls') {
      newHistory.push('src  public  package.json  README.md', '')
    } else if (input.startsWith('echo ')) {
      newHistory.push(input.substring(5), '')
    } else {
      newHistory.push(`Command not found: ${input}`, '')
    }

    setHistory(newHistory)
    setInput('')
  }

  return (
    <div className="h-64 bg-zinc-950 border-t border-zinc-700 flex flex-col">
      <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 border-b border-zinc-700">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-zinc-300">Terminal</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-auto font-mono text-sm">
        {history.map((line, i) => (
          <div key={i} className="text-zinc-300 whitespace-pre-wrap">
            {line}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-zinc-300 mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-zinc-300 outline-none"
            placeholder="Type a command..."
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}