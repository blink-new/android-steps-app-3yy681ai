import { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-64 bg-zinc-800 border-r border-zinc-700 flex flex-col">
      <div className="p-3 border-b border-zinc-700">
        <h2 className="text-sm font-medium text-zinc-300">Explorer</h2>
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </aside>
  )
}