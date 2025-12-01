import React, { useRef } from 'react';

interface UploadZoneProps {
  onFilesSelected: (files: FileList) => void;
}

export default function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.json"
        multiple
        className="hidden"
        onChange={handleFileInput}
      />
      <p className="text-gray-600">
        Drop files here or click to browse
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Supports .md and .json files
      </p>
    </div>
  );
}
