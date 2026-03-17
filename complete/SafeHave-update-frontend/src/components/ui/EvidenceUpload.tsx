import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Eye, EyeOff, Shield, X, Image } from 'lucide-react';
import { Button } from './button';

interface EvidenceUploadProps {
  onFilesChange: (files: File[]) => void;
  className?: string;
}

export const EvidenceUpload: React.FC<EvidenceUploadProps> = ({
  onFilesChange,
  className = '',
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewBlurred, setPreviewBlurred] = useState(true);
  const [autoRedactFaces, setAutoRedactFaces] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Upload Area */}
      <div
        className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-[#C15B3E]"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDFDF5]">
          <Upload className="h-8 w-8 text-[#C15B3E]" />
        </div>
        <h3 className="mb-2 text-lg font-bold text-slate-900">
          Upload Evidence
        </h3>
        <p className="mb-4 text-sm text-slate-600">
          Photos, videos, documents - all encrypted automatically
        </p>
        <Button type="button" variant="outline" size="sm">
          Choose Files
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* Privacy Controls */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 rounded-2xl bg-slate-50 p-6"
        >
          <h4 className="flex items-center gap-2 font-bold text-slate-900">
            <Shield className="h-4 w-4 text-[#C15B3E]" />
            Privacy Controls
          </h4>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={previewBlurred}
                onChange={(e) => setPreviewBlurred(e.target.checked)}
                className="h-4 w-4 rounded text-[#C15B3E]"
              />
              <span className="text-sm font-medium text-slate-700">
                Blur preview for safety
              </span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={autoRedactFaces}
                onChange={(e) => setAutoRedactFaces(e.target.checked)}
                className="h-4 w-4 rounded text-[#C15B3E]"
              />
              <span className="text-sm font-medium text-slate-700">
                Auto-redact faces in images
              </span>
            </label>
          </div>
        </motion.div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-900">
              Uploaded Files ({files.length})
            </h4>
            <button
              type="button"
              onClick={() => setPreviewBlurred(!previewBlurred)}
              className="flex items-center gap-2 text-sm text-[#C15B3E] hover:text-[#DDA15E]"
            >
              {previewBlurred ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
              {previewBlurred ? 'Show' : 'Hide'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative"
              >
                <div
                  className={`aspect-square overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-100 ${previewBlurred ? 'blur-sm' : ''} `}
                >
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Evidence preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Image className="h-8 w-8 text-slate-400" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>

                <p className="mt-2 truncate text-xs text-slate-600">
                  {file.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
