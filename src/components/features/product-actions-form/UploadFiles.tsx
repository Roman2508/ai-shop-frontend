import React from 'react'
import { Trash2 } from 'lucide-react'

import getPhotoUrl from '@/utils/get-photo-url'
import { Button } from '@/components/ui/common/Button'

interface IUploadFilesProps {
  files: File[]
  isMulti?: boolean
  buttonText?: string
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const UploadFiles: React.FC<IUploadFilesProps> = ({
  files,
  setFiles,
  isMulti = true,
  buttonText = 'Завантажити фото',
}) => {
  const fileRef = React.useRef<HTMLInputElement>(null)

  const handleChangeUpload = async (event: any) => {
    const _event = event as React.ChangeEvent<HTMLInputElement>

    const filesLength = _event.target.files ? _event.target.files.length : 0

    if (files.length + filesLength > 5) {
      alert('Не можна завантажити більше 5 файлів')
    }
    if (!filesLength) {
      alert('Виберіть файл')
    }

    // @ts-ignore
    setFiles((prev) => {
      if (isMulti) {
        const newFiles = _event.target.files ? Array.from(_event.target.files) : []
        return [...prev, ...newFiles]
      } else {
        const newFile = _event.target.files ? _event.target.files : []
        return newFile
      }
    })
  }

  const onRemoveFile = (index: number) => {
    if (!window.confirm('Ви дійсно хочете видалити це фото?')) return

    setFiles((prev) => {
      return prev.filter((_, elIdx) => elIdx !== index)
    })
  }

  return (
    <div className="mb-[30]">
      {isMulti && <h4 className="font-semibold mb-[20]">Фото</h4>}

      <div className={`flex flex-col flex-wrap gap-[26] ${isMulti ? 'w-full' : 'w-[150]'}`}>
        <div className={`flex gap-[10] h-[150] border border-border rounded-[10] ${isMulti ? 'w-full' : 'w-[150]'}`}>
          {isMulti &&
            Array.from(files).map((f, index) => {
              const imageUrl = typeof f === 'string' ? f : URL.createObjectURL(f)

              return (
                <div className="w-[150] h-[150] relative" key={index}>
                  {f && (
                    <>
                      <div
                        className="w-full h-full absolute cursor-pointer flex justify-center items-center group"
                        onClick={() => onRemoveFile(index)}
                      >
                        <Trash2 className="h-14 w-14 stroke-black bg-primary rounded-lg p-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      {/* @ts-ignore */}
                      <img src={imageUrl} className="w-full h-full object-cover" />
                    </>
                  )}
                </div>
              )
            })}

          {!isMulti && (
            <div className="w-[150] h-[150] relative">
              {files[0] && (
                <img
                  src={typeof files[0] === 'string' ? getPhotoUrl(files[0], 'users') : URL.createObjectURL(files[0])}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </div>

        <Button
          variant="secondary"
          type="button"
          className="w-[200]"
          onClick={() => {
            if (!fileRef.current) return
            fileRef.current.click()
          }}
        >
          {buttonText}
        </Button>

        <input ref={fileRef} onChange={handleChangeUpload} type="file" className="hidden" multiple={isMulti} />
      </div>
    </div>
  )
}

export default UploadFiles
