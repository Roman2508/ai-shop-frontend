import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/common/Dialog'
import LoginForm from '@/components/features/LoginForm'
import RegisterForm from '@/components/features/RegisterForm'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'

const LoginButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonWithIcon text="Увійти" iconSrc="/icons/user.png" buttonVariant="static" classNames="h-[36]" />
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
