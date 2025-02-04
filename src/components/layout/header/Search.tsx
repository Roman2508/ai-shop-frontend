import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/common/Dialog'
import { Button } from '@/components/ui/common/Button'
import LoginForm from '@/components/features/LoginForm'
import RegisterForm from '@/components/features/RegisterForm'
import { Input } from '@/components/ui/common/Input'

const Search = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative">
            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
              <img
                width="16px"
                height="16px"
                src="https://icons.veryicon.com/png/o/miscellaneous/monochrome-icon-1/search-521.png"
              />
            </span>

            <Input variant="search" placeholder="Пошук..." className="pr-10 w-[340]" />
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-[20]">Пошук</DialogTitle>

            <Input variant="default" placeholder="Пошук..." className="pr-10 w-full" />

            <div className="min-h-[400]">
              <p className="pt-[30] text-center">Шукаємо...</p>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Search
