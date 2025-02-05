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
import SearchIcon from '@/components/images/SearchIcon'

const Search = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative cursor-pointer">
            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
              <SearchIcon />
            </span>

            <Input variant="static" placeholder="Пошук..." className="cursor-pointer pr-10 w-[340]" readOnly />
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="mb-[20]">Пошук</DialogTitle>

            {/* <Input variant="default" placeholder="Пошук..." className="pr-10 w-full" /> */}
            <div className="relative cursor-pointer">
              <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SearchIcon className="fill-muted-foreground" />
              </span>

              <Input variant="default" placeholder="Пошук..." className="pr-10 w-full" />
            </div>

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
