'use client'
import { z } from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import UploadFiles from './UploadFiles'
import { Input } from '../../ui/common/Input'
import { Button } from '../../ui/common/Button'
import { Textarea } from '../../ui/common/Textarea'
import { PHONE_BRAND_NAMES } from '@/constants/product-filters'
import { MultiSelect } from '@/components/ui/common/MultiSelect'
import { useAddProductPhotoMutation, useCreateProductMutation } from '@/graphql/generated/output'
import { Form, FormItem, FormField, FormMessage, FormControl, FormDescription } from '@/components/ui/common/Form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/common/Select'
import { formSchema, defaultValues, mainCharacteristicsInputsData, mainCharacteristicsSelectData } from './form-helpers'

/* 
        price: z.number
        brand: z.string()
        ram: z.number
        builtInMemory: z.number
        frontCamera: z.number
        mainCamera: z.number
        screenDiagonal: z.number
        simCount: z.number
        simFormat: z.string()
        os: z.string()
        processorName: z.string()
        processorCores: z.string()
        battery: z.number
        materials: z.string()
        deliverySet: z.string()
        color: z.string()
    */

const CreateProductForm = () => {
  const [files, setFiles] = React.useState<File[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [uploadFiles] = useAddProductPhotoMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const [createProduct] = useCreateProductMutation()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const deliverySet = values.deliverySet.join(' / ')
      const product = await createProduct({ variables: { data: { ...values, deliverySet } } })
      if (product.data) {
        const productId = product.data.createProduct.id
        await Promise.all(
          files.map(async (el) => {
            await uploadFiles({ variables: { productId, file: el } })
          })
        )
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">Основна інформація</h4>

          <div className="flex flex-wrap gap-[26]">
            <FormField
              name="brand"
              control={form.control}
              render={({ field }) => {
                const { onChange: onValueChange, ...rest } = field
                return (
                  <FormItem>
                    <FormDescription>Бренд</FormDescription>
                    <FormControl>
                      <Select {...rest} onValueChange={onValueChange}>
                        <SelectTrigger className="h-[50] px-[20] w-[440]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {PHONE_BRAND_NAMES.map((brand) => (
                              <SelectItem value={brand.key} key={brand.key}>
                                {brand.label_ua}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Ціна</FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      variant="primary"
                      placeholder="Вкажіть ціну товара"
                      className="h-[50] px-[20] w-[440]"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormDescription>Опис</FormDescription>
                  <FormControl>
                    <Textarea
                      className="h-[50] px-[20] border border-border bg-card"
                      placeholder="Вкажіть опис товара"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <UploadFiles files={files} setFiles={setFiles} />

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">Головні характеристики</h4>

          <div className="flex flex-wrap gap-[26]">
            {mainCharacteristicsInputsData.map((input) => (
              <FormField
                key={input.key}
                control={form.control}
                name={input.key}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormDescription>{input.label}</FormDescription>
                      <FormControl>
                        <Input
                          {...field}
                          variant="primary"
                          type={input.type}
                          placeholder={input.placeholder}
                          className="h-[50] px-[20] w-[280]"
                          onChange={(e) => {
                            if (input.type === 'number') {
                              field.onChange(Number(e.target.value))
                            } else {
                              field.onChange(e.target.value)
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
        </div>

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">Головні характеристики</h4>

          <div className="flex flex-wrap gap-[26]">
            {mainCharacteristicsSelectData.map((select) => (
              <FormField
                key={select.key}
                control={form.control}
                name={select.key}
                render={({ field }) => {
                  const { onChange: onValueChange, ...rest } = field

                  if (select.key === 'simFormat' || select.key === 'deliverySet') {
                    const options = select.items.map((el) => ({ value: el.label, label: el.label }))
                    return (
                      <FormItem>
                        <FormDescription>{select.label}</FormDescription>
                        <FormControl>
                          <MultiSelect
                            className="h-[50] px-[20] w-[440]"
                            onValueChange={onValueChange}
                            variant="inverted"
                            options={options}
                            placeholder=""
                            animation={2}
                            maxCount={3}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  } else {
                    return (
                      <FormItem>
                        <FormDescription>{select.label}</FormDescription>
                        <FormControl>
                          {/* @ts-ignore */}
                          <Select {...rest} onValueChange={onValueChange}>
                            <SelectTrigger className="h-[50] px-[20] w-[440]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {select.items.map((item) => (
                                  <SelectItem key={item.key} value={item.key}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                }}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-[260]" disabled={isLoading}>
          Зберегти
        </Button>
      </form>
    </Form>
  )
}

export default CreateProductForm
