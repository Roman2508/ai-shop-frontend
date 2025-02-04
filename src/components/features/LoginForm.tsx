'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/common/Form'
import { Input } from '../ui/common/Input'
import { Button } from '../ui/common/Button'
import { Checkbox } from '../ui/common/Checkbox'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pt-[30] pb-[20]">
              <FormLabel>Логін</FormLabel>
              <FormControl>
                <Input placeholder="Вкажіть назву профіля" className="h-[50] px-[20] w-full" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="pb-[30]">
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input placeholder="Вкажіть назву профіля" className="h-[50] px-[20] w-full" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2 mb-[20]">
          <Checkbox id="terms" className="border border-primary" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Запам'ятати мене
          </label>
        </div>

        <Button type="submit" className="w-full">
          Увійти
        </Button>

        <div className="mt-[20] flex">
          <Button variant="link" type="button" className="w-full text-primary opacity-100">
            Забули пароль?
          </Button>

          <Button variant="link" type="button" className="w-full text-primary opacity-100">
            Зареєструватись
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm
