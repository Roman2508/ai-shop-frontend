'use client'

import * as React from 'react'
import { Moon, MoonIcon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/common/DropdownMenu'
import { Button } from '@/components/ui/common/Button'

export function ThemeToggler() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="static">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => setTheme('light')}>Світла</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Темна</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>Системна</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
