import React from 'react'
import { useTranslations } from 'next-intl'

import LoginForm from '@/components/features/LoginForm'
import RegisterForm from '@/components/features/RegisterForm'
import ButtonWithIcon from '@/components/ui/custom/ButtonWithIcon'
import { Dialog, DialogTitle, DialogHeader, DialogTrigger, DialogContent } from '@/components/ui/common/Dialog'

const LoginButton = () => {
  const t = useTranslations('header')

  const [formType, setFromType] = React.useState<'login' | 'register'>('login')

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonWithIcon
            text={t('auth.loginBtn')}
            iconSrc="/icons/user.png"
            buttonVariant="static"
            classNames="h-[36]"
          />
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formType === 'login' ? t('auth.loginForm.title') : t('auth.registerForm.title')}</DialogTitle>
            {formType === 'login' ? (
              <LoginForm setFromType={setFromType} />
            ) : (
              <RegisterForm setFromType={setFromType} />
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoginButton
