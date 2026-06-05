'use client'

import { useRef, useState } from 'react'

import { Spinner } from '@heroui/react'
import axios from 'axios'
import { Image as ImageIcon, UploadCloud, X } from 'lucide-react'

interface MediaUploaderProps {
    label: string
    value: string // The current image URL
    onChange: (url: string) => void
}

export default function MediaUploader({
    label,
    value,
    onChange,
}: MediaUploaderProps) {
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setIsUploading(true)
            const formData = new FormData()
            formData.append('file', file)

            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 55000,
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                            (progressEvent.total ?? 1)
                    )
                    setUploadProgress(percent)
                },
            })

            if (response.data.url) {
                onChange(response.data.url)
            }
        } catch (error) {
            console.error('Upload failed', error)
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {value ? (
                <div className="relative w-full aspect-video bg-slate-100 rounded-xl overflow-hidden group border-2 border-transparent">
                    <img
                        src={value}
                        alt={label}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-white text-slate-800 rounded-full hover:bg-slate-200"
                        >
                            <UploadCloud size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white border-2 border-dashed border-default-200 rounded-xl p-6 text-center cursor-pointer hover:border-secondary transition-colors h-full flex flex-col items-center justify-center min-h-[120px]"
                >
                    {isUploading ? (
                        <>
                            <Spinner size="sm" color="accent" />{' '}
                            <span className="text-xs text-default-400">
                                {uploadProgress}%
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="w-10 h-10 bg-secondary-50 text-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                                <ImageIcon size={16} />
                            </div>
                            <span className="text-xs font-medium text-default-600">
                                {label}
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
