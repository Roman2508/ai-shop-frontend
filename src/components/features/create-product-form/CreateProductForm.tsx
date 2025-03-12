"use client";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  formSchema,
  defaultValues,
  mainCharacteristicsInputsData,
  mainCharacteristicsSelectData,
} from "./form-helpers";
import { Input } from "../../ui/common/Input";
import { Button } from "../../ui/common/Button";
import { Textarea } from "../../ui/common/Textarea";
import { useUploadFileMutation } from "@/graphql/generated/output";
import { Form, FormItem, FormField, FormMessage, FormControl, FormDescription } from "@/components/ui/common/Form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/common/Select";

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
  const fileRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const [file, setFile] = React.useState<FileList | []>([]);
  const [upload] = useUploadFileMutation({ variables: { file } });

  const handleChangeUpload = async (event: any) => {
    const _event = event as React.ChangeEvent<HTMLInputElement>;

    if (_event.target.files?.length) {
      // const formData = new FormData();

      // for (let i = 0; i < _event.target.files.length; i++) {
      //   formData.append("file", _event.target.files[0]);
      // }

      setFile(_event.target.files);

      // formData.append("file", _event.target.files[0]);
      // setFile(_event.target.files[0]);
    }
  };

  const aaaaaa = () => {
    console.log("click", file);
    upload({ variables: { file } });
  };

  console.log(file);

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
                const { onChange: onValueChange, ...rest } = field;
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
                            <SelectItem value="samsung">samsung</SelectItem>
                            <SelectItem value="xiaomi">xiaomi</SelectItem>
                            <SelectItem value="iphone">iphone</SelectItem>
                            <SelectItem value="meizu">meizu</SelectItem>
                            <SelectItem value="motorola">motorola</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
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

        <div className="border-b pb-[40] mb-[30]">
          <h4 className="font-semibold mb-[20]">Фото</h4>

          <div className="flex flex-wrap gap-[26]">
            <div className="flex gap-[10] w-full h-[150] border border-border rounded-[10]">
              {Array.from(file).map((f, index) => (
                <div className="w-[150] h-[150]" key={index}>
                  <img src={f ? URL.createObjectURL(f) : ""} className="w-full h-full object-cover" />
                </div>
              ))}
              {/* {file && (
                <div className="w-[150] h-[150] mr-[10]">
                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                // <img src="https://www.shutterstock.com/image-vector/no-image-available-icon-template-600nw-1036735678.jpg" />
                </div>
              )} */}
            </div>

            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                if (!fileRef.current) return;
                fileRef.current.click();
              }}
            >
              Завантажити фото
            </Button>
            <input ref={fileRef} onClick={handleChangeUpload} type="file" className="hidden" multiple />
            <Button onClick={aaaaaa} type="button" variant="outline">
              Upload
            </Button>
          </div>
        </div>

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
                            if (input.type === "number") {
                              field.onChange(Number(e.target.value));
                            } else {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
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
                  const { onChange: onValueChange, ...rest } = field;
                  return (
                    <FormItem>
                      <FormDescription>{select.label}</FormDescription>
                      <FormControl>
                        <Select {...field} onValueChange={onValueChange}>
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
                  );
                }}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-[260]">
          Зберегти
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
