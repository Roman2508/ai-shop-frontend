import { ProductModel } from '@/graphql/generated/output'

type ProductType = {
  brand: string
  ram: number
  builtInMemory: number
  color: string
}

const getProductTitle = (product?: ProductType) => {
  if (product) {
    return `${product.brand}, ${product.ram}/${product.builtInMemory} ГБ, ${product.color}`
  }

  return ''
}

export default getProductTitle
