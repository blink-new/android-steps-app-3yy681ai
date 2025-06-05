import { Terminal, Play, Folder, Settings } from 'lucide-react'
import { Button } from './ui/button'

interface HeaderProps {
  onToggleTerminal: () => void
}

export function Header({ onToggleTerminal }: HeaderProps) {
  return (
    <header className="bg-zinc-800 border-b border-zinc-700 h-12 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="font-semibold text-white">Bolt.diy</span>
        </div>
        
        <div className="text-xs text-zinc-400">
          WebContainer Environment
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleTerminal}
          className="text-zinc-300 hover:text-white hover:bg-zinc-700"
        >
          <Terminal className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-300 hover:text-white hover:bg-zinc-700"
        >
          <Play className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-300 hover:text-white hover:bg-zinc-700"
        >
          <Folder className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-300 hover:text-white hover:bg-zinc-700"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}