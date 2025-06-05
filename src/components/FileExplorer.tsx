import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react'
import { Button } from './ui/button'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  path: string
}

interface FileExplorerProps {
  onFileSelect: (path: string) => void
  activeFile: string | null
}

// Sample file structure
const fileTree: FileNode = {
  name: 'project',
  type: 'folder',
  path: '/',
  children: [
    {
      name: 'src',
      type: 'folder',
      path: '/src',
      children: [
        {
          name: 'components',
          type: 'folder',
          path: '/src/components',
          children: [
            { name: 'Header.tsx', type: 'file', path: '/src/components/Header.tsx' },
            { name: 'Sidebar.tsx', type: 'file', path: '/src/components/Sidebar.tsx' },
            { name: 'CodeEditor.tsx', type: 'file', path: '/src/components/CodeEditor.tsx' },
            { name: 'Terminal.tsx', type: 'file', path: '/src/components/Terminal.tsx' },
            { name: 'FileExplorer.tsx', type: 'file', path: '/src/components/FileExplorer.tsx' }
          ]
        },
        { name: 'App.tsx', type: 'file', path: '/src/App.tsx' },
        { name: 'main.tsx', type: 'file', path: '/src/main.tsx' },
        { name: 'index.css', type: 'file', path: '/src/index.css' }
      ]
    },
    {
      name: 'public',
      type: 'folder',
      path: '/public',
      children: [
        { name: 'favicon.svg', type: 'file', path: '/public/favicon.svg' },
        { name: 'vite.svg', type: 'file', path: '/public/vite.svg' }
      ]
    },
    { name: 'package.json', type: 'file', path: '/package.json' },
    { name: 'vite.config.ts', type: 'file', path: '/vite.config.ts' },
    { name: 'README.md', type: 'file', path: '/README.md' }
  ]
}

function FileTreeNode({ 
  node, 
  depth = 0, 
  onFileSelect, 
  activeFile 
}: { 
  node: FileNode
  depth?: number
  onFileSelect: (path: string) => void
  activeFile: string | null
}) {
  const [isExpanded, setIsExpanded] = useState(depth < 2)

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded)
    } else {
      onFileSelect(node.path)
    }
  }

  const isActive = activeFile === node.path

  return (
    <div>
      <Button
        variant="ghost"
        className={`
          w-full justify-start px-2 py-1 h-auto text-sm
          ${isActive ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-white'}
          hover:bg-zinc-700
        `}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' && (
          isExpanded ? (
            <ChevronDown className="w-4 h-4 mr-1" />
          ) : (
            <ChevronRight className="w-4 h-4 mr-1" />
          )
        )}
        {node.type === 'folder' ? (
          <Folder className="w-4 h-4 mr-2" />
        ) : (
          <File className="w-4 h-4 mr-2" />
        )}
        <span className="truncate">{node.name}</span>
      </Button>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode
              key={index}
              node={child}
              depth={depth + 1}
              onFileSelect={onFileSelect}
              activeFile={activeFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function FileExplorer({ onFileSelect, activeFile }: FileExplorerProps) {
  return (
    <div className="py-2">
      <FileTreeNode 
        node={fileTree} 
        onFileSelect={onFileSelect}
        activeFile={activeFile}
      />
    </div>
  )
}