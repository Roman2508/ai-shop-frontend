import React from 'react'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import { useUploadFileMutation } from '@/graphql/generated/output'

interface IUploadFilesProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const UploadFiles: React.FC<IUploadFilesProps> = ({ files, setFiles }) => {
  const fileRef = React.useRef<HTMLInputElement>(null)

  const [upload] = useUploadFileMutation({ variables: { file: files } })

  const handleChangeUpload = async (event: any) => {
    const _event = event as React.ChangeEvent<HTMLInputElement>

    const filesLength = _event.target.files ? _event.target.files.length : 0

    if (files.length + filesLength > 5) {
      alert('Не можна завантажити більше 5 файлів')
    }

    setFiles((prev) => {
      const newFiles = _event.target.files ? Array.from(_event.target.files) : []
      return [...prev, ...newFiles]
    })
  }

  const onRemoveFile = (index: number) => {
    if (!window.confirm('Ви дійсно хочете видалити це фото?')) return

    setFiles((prev) => {
      return prev.filter((_, elIdx) => elIdx !== index)
    })
  }

  return (
    <div className="border-b pb-[40] mb-[30]">
      <h4 className="font-semibold mb-[20]">Фото</h4>

      <div className="flex flex-wrap gap-[26]">
        <div className="flex gap-[10] w-full h-[150] border border-border rounded-[10]">
          {Array.from(files).map((f, index) => (
            <div className="w-[150] h-[150] relative" key={index}>
              <div
                className="w-full h-full absolute cursor-pointer flex justify-center items-center group"
                onClick={() => onRemoveFile(index)}
              >
                <Trash2 className="h-14 w-14 stroke-black bg-primary rounded-lg p-[10] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <img src={f ? URL.createObjectURL(f) : ''} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            if (!fileRef.current) return
            fileRef.current.click()
          }}
        >
          Завантажити фото
        </Button>

        <input ref={fileRef} onChange={handleChangeUpload} type="file" className="hidden" multiple />
      </div>
    </div>
  )
}

export default UploadFiles
