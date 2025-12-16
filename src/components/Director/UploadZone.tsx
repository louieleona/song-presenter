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
      className="border-2 border-dashed border-luxury-300 rounded-2xl p-8 text-center hover:border-accent-blue hover:bg-accent-blue/5 transition-all duration-200 cursor-pointer group"
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
      <div className="w-12 h-12 rounded-2xl bg-luxury-100 group-hover:bg-accent-blue/10 flex items-center justify-center mx-auto mb-3 transition-colors">
        <svg className="w-6 h-6 text-luxury-500 group-hover:text-accent-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <p className="text-callout text-luxury-700 font-medium mb-1">
        Drop files here or click to browse
      </p>
      <p className="text-caption text-luxury-500">
        Supports .md and .json files
      </p>
    </div>
  );
}
