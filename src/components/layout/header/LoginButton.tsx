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

const LoginButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 cursor-pointer">
              <img
                width="16px"
                height="16px"
                src="https://www.pngfind.com/pngs/m/110-1102927_create-your-profile-user-icon-white-color-hd.png"
              />
            </span>

            <Button variant="icon" size="icon" className="pl-5 w-[120]">
              Увійти
            </Button>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Вхід в особистий кабінет</DialogTitle>
            <LoginForm />
            {/* <RegisterForm /> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginButton
