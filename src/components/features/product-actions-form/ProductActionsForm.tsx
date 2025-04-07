"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProductModel,
  useCreateProductMutation,
  useUpdateProductMutation,
  useAddProductPhotoMutation,
  useRemoveProductPhotoMutation,
} from "@/graphql/generated/output";
import UploadFiles from "./UploadFiles";
import { Input } from "../../ui/common/Input";
import { Button } from "../../ui/common/Button";
import getPhotoUrl from "@/utils/get-photo-url";
import { Textarea } from "../../ui/common/Textarea";
import { PHONE_BRAND_NAMES } from "@/constants/product-filters";
import { MultiSelect } from "@/components/ui/common/MultiSelect";
import { Form, FormItem, FormField, FormMessage, FormControl, FormDescription } from "@/components/ui/common/Form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/common/Select";
import {
  formSchema,
  defaultValues,
  mainCharacteristicsInputsData,
  mainCharacteristicsSelectData,
} from "./form-helpers";

interface IProductActionsFormProps {
  id?: string | string[];
  product?: ProductModel;
}

const ProductActionsForm: React.FC<IProductActionsFormProps> = ({ id, product }) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [uploadFile] = useAddProductPhotoMutation();
  const [removeFile] = useRemoveProductPhotoMutation();

  const [createProduct] = useCreateProductMutation({
    onCompleted(data) {
      toast.success("Створено новий");
    },
    onError(error) {
      if (error.message) toast.error(error.message);
      else toast.error("Помилка при створенні товару");
    },
  });

  const [updateProduct] = useUpdateProductMutation({
    onCompleted(data) {
      toast.success("Товар було оновлено");
    },
    onError(error) {
      if (error.message) toast.error(error.message);
      else toast.error("Помилка при оновленні товару");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onCreateProduct = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const deliverySet = values.deliverySet.join(" / ");
      const product = await createProduct({ variables: { data: { ...values, deliverySet } } });
      if (product.data) {
        const productId = product.data.createProduct.id;
        await Promise.all(
          files.map(async (el) => {
            await uploadFile({ variables: { productId, file: el } });
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateProduct = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!product) return;
      setIsLoading(true);
      const deliverySet = values.deliverySet.join(" / ");
      const data = { ...values, deliverySet, productId: product.id };
      await updateProduct({ variables: { data } });

      const newImages = files
        .map((el) => (el.name ? el.name : String(el).split("/").pop()))
        .filter((el) => !!el) as string[];

      const oldImages = product.images;

      const addedImages = newImages.filter((img) => !oldImages.includes(img));
      const removedImages = oldImages.filter((img) => !newImages.includes(img));

      if (addedImages.length) {
        await Promise.all(
          addedImages.map(async (el) => {
            const file = files.find((f) => f.name === el);
            if (file) {
              await uploadFile({ variables: { productId: product.id, file } });
            }
          })
        );
      }

      if (removedImages.length) {
        await Promise.all(
          removedImages.map(async (el) => {
            await removeFile({ variables: { productId: product.id, filename: el } });
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (product) {
      onUpdateProduct(values);
    } else {
      onCreateProduct(values);
    }
  };

  React.useEffect(() => {
    if (!product) return;

    form.reset({
      ...product,
      deliverySet: product.deliverySet ? product.deliverySet.split("/") : [],
    });

    const urls = product.images.map((el) => getPhotoUrl(el, "products"));
    // @ts-ignore
    setFiles(urls);
  }, [product]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="border-b pb-[40px] mb-[30px]">
          <h4 className="font-semibold mb-[20px]">Основна інформація</h4>

          <div className="flex flex-wrap gap-[26px]">
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
                        <SelectTrigger className="h-[50px] px-[20px] w-[440px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {PHONE_BRAND_NAMES.map((brand) => (
                              <SelectItem value={brand.label_ua} key={brand.label_ua}>
                                {brand.label_ua}
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
                      className="h-[50px] px-[20px] w-[440px]"
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
                      className="h-[50px] px-[20px] border border-border bg-card"
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

        <div className="border-b pb-[40px] mb-[30px]">
          <h4 className="font-semibold mb-[20px]">Головні характеристики</h4>

          <div className="flex flex-wrap gap-[26px]">
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
                          className="h-[50px] px-[20px] w-[280px]"
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

        <div className="border-b pb-[40px] mb-[30px]">
          <h4 className="font-semibold mb-[20px]">Додаткові параметри</h4>

          <div className="flex flex-wrap gap-[26px]">
            {mainCharacteristicsSelectData.map((select) => (
              <FormField
                key={select.key}
                control={form.control}
                name={select.key}
                render={({ field }) => {
                  const { onChange: onValueChange, ...rest } = field;

                  if (select.key === "simFormat" || select.key === "deliverySet") {
                    const options = select.items.map((el) => ({
                      value: el.label,
                      label: el.label,
                    }));

                    return (
                      <FormItem key={select.label}>
                        <FormDescription>{select.label}</FormDescription>
                        <FormControl>
                          <MultiSelect
                            defaultValue={rest.value as string[] | undefined}
                            className="h-[50px] px-[20px] w-[440px]"
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
                    );
                  } else {
                    return (
                      <FormItem key={select.key}>
                        <FormDescription>{select.label}</FormDescription>
                        <FormControl>
                          <Select {...rest} value={String(rest.value)} onValueChange={onValueChange}>
                            <SelectTrigger className="h-[50px] px-[20px] w-[440px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {select.items.map((item) => (
                                  <SelectItem key={item.key} value={item.key}>
                                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }
                }}
              />
            ))}
          </div>
        </div>

        <Button type="submit" className="w-[260px]" disabled={isLoading}>
          Зберегти
        </Button>
      </form>
    </Form>
  );
};

export default ProductActionsForm;
