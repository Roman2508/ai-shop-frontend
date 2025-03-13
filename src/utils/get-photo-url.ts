const getPhotoUrl = (url: string, type: 'products' | 'users') => {
  return `${process.env.NEXT_PUBLIC_SERVER_STATIC_URL}/uploads/${type}/${url}`
}

export default getPhotoUrl
