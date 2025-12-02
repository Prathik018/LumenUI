"use client";

import {
  useState,
  useRef,
  useCallback,
  type DragEvent,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, File as FileIcon, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FileStatus = "idle" | "dragging" | "uploading" | "error";

interface FileError {
  message: string;
  code: string;
}

interface FileUploadProps {
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: FileError) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  currentFile?: File | null;
  onFileRemove?: () => void;
  uploadDelay?: number;
  validateFile?: (file: File) => FileError | null;
  className?: string;
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_STEP_SIZE = 5;
const FILE_SIZES = [
  "Bytes",
  "KB",
  "MB",
  "GB",
  "TB",
  "PB",
  "EB",
  "ZB",
  "YB",
] as const;

const formatBytes = (bytes: number, decimals = 2): string => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const unit = FILE_SIZES[i] || FILE_SIZES[FILE_SIZES.length - 1];
  return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${unit}`;
};

const UploadIllustration = ({ isActive }: { isActive: boolean }) => (
  <motion.div
    className={cn(
      "relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/10 via-sky-400/5 to-transparent",
      "border border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.25)]"
    )}
    animate={{
      scale: isActive ? [1, 1.05, 1] : 1,
      boxShadow: isActive
        ? [
            "0 0 0 0 rgba(56,189,248,0.4)",
            "0 0 0 12px rgba(56,189,248,0)",
            "0 0 0 0 rgba(56,189,248,0)",
          ]
        : "0 0 0 0 rgba(0,0,0,0)",
    }}
    transition={
      isActive
        ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        : { duration: 0.2 }
    }
  >
    <motion.div
      animate={{
        y: isActive ? [-2, 2, -2] : 0,
      }}
      transition={
        isActive
          ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
    >
      <UploadCloud className="h-7 w-7 text-sky-500" />
    </motion.div>
  </motion.div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="mt-3 w-full rounded-full bg-slate-200/70 dark:bg-slate-800/70 h-1.5 overflow-hidden">
    <motion.div
      className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    />
  </div>
);

export default function FileUpload({
  onUploadSuccess = () => {},
  onUploadError = () => {},
  acceptedFileTypes = [],
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  currentFile: initialFile = null,
  onFileRemove = () => {},
  uploadDelay = 2000,
  validateFile = () => null,
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [status, setStatus] = useState<FileStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<FileError | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    };
  }, []);

  const validateFileSize = useCallback(
    (file: File): FileError | null => {
      if (file.size > maxFileSize) {
        return {
          message: `File size exceeds ${formatBytes(maxFileSize)}`,
          code: "FILE_TOO_LARGE",
        };
      }
      return null;
    },
    [maxFileSize]
  );

  const validateFileType = useCallback(
    (file: File): FileError | null => {
      if (!acceptedFileTypes?.length) return null;

      const fileType = file.type.toLowerCase();
      if (
        !acceptedFileTypes.some((type) => fileType.match(type.toLowerCase()))
      ) {
        return {
          message: `File type must be ${acceptedFileTypes.join(", ")}`,
          code: "INVALID_FILE_TYPE",
        };
      }
      return null;
    },
    [acceptedFileTypes]
  );

  const handleError = useCallback(
    (error: FileError) => {
      setError(error);
      setStatus("error");
      onUploadError?.(error);

      setTimeout(() => {
        setError(null);
        setStatus("idle");
        setProgress(0);
        setFile(null);
      }, 3000);
    },
    [onUploadError]
  );

  const simulateUpload = useCallback(
    (uploadingFile: File) => {
      let currentProgress = 0;

      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }

      uploadIntervalRef.current = setInterval(() => {
        currentProgress += UPLOAD_STEP_SIZE;

        if (currentProgress >= 100) {
          if (uploadIntervalRef.current) {
            clearInterval(uploadIntervalRef.current);
          }
          setProgress(100);
          setTimeout(() => {
            setStatus("idle");
            setProgress(0);
            onUploadSuccess?.(uploadingFile);
          }, 400);
        } else {
          setStatus((prevStatus) => {
            if (prevStatus === "uploading") {
              setProgress(currentProgress);
              return "uploading";
            }
            if (uploadIntervalRef.current) {
              clearInterval(uploadIntervalRef.current);
            }
            return prevStatus;
          });
        }
      }, uploadDelay / (100 / UPLOAD_STEP_SIZE));
    },
    [onUploadSuccess, uploadDelay]
  );

  const handleFileSelect = useCallback(
    (selectedFile: File | null) => {
      if (!selectedFile) return;

      setError(null);

      const sizeError = validateFileSize(selectedFile);
      if (sizeError) {
        handleError(sizeError);
        return;
      }

      const typeError = validateFileType(selectedFile);
      if (typeError) {
        handleError(typeError);
        return;
      }

      const customError = validateFile?.(selectedFile);
      if (customError) {
        handleError(customError);
        return;
      }

      setFile(selectedFile);
      setStatus("uploading");
      setProgress(0);
      simulateUpload(selectedFile);
    },
    [simulateUpload, validateFileSize, validateFileType, validateFile, handleError]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus((prev) => (prev !== "uploading" ? "dragging" : prev));
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus((prev) => (prev === "dragging" ? "idle" : prev));
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (status === "uploading") return;
      setStatus("idle");
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) handleFileSelect(droppedFile);
    },
    [status, handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      handleFileSelect(selectedFile || null);
      if (e.target) e.target.value = "";
    },
    [handleFileSelect]
  );

  const triggerFileInput = useCallback(() => {
    if (status === "uploading") return;
    fileInputRef.current?.click();
  }, [status]);

  const resetState = useCallback(() => {
    setFile(null);
    setStatus("idle");
    setProgress(0);
    onFileRemove?.();
  }, [onFileRemove]);

  const isDragging = status === "dragging";
  const isUploading = status === "uploading";
  const hasFile = !!file;

  return (
    <div
      className={cn("relative w-full max-w-md mx-auto", className)}
      role="complementary"
      aria-label="File upload"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-800/80",
          "bg-gradient-to-b from-slate-50/80 via-slate-50/40 to-slate-100/60",
          "dark:from-slate-900/80 dark:via-slate-900/50 dark:to-slate-950/80",
          "shadow-sm"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_55%)]" />
        <div className="relative p-4">
          <div
            className={cn(
              "relative flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-950/60 px-4 py-5 cursor-pointer transition-colors",
              isDragging && "border-sky-400 bg-sky-50/60 dark:bg-sky-950/40"
            )}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              onChange={handleFileInputChange}
              accept={acceptedFileTypes?.join(",")}
              aria-label="File input"
            />

            <div className="flex flex-col items-center gap-3 text-center">
              <UploadIllustration isActive={isDragging || isUploading} />

              {!hasFile && !isUploading && (
                <>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      Drag & drop a file, or click to browse
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {acceptedFileTypes?.length
                        ? `${acceptedFileTypes
                            .map((t) => t.split("/")[1])
                            .join(", ")
                            .toUpperCase()}`
                        : "SVG, PNG, JPG or GIF"}{" "}
                      {maxFileSize && `• up to ${formatBytes(maxFileSize)}`}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 px-4 py-1.5 text-xs font-medium shadow-sm hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                  >
                    <span>Choose file</span>
                    <UploadCloud className="h-3.5 w-3.5" />
                  </button>
                </>
              )}

              {(hasFile || isUploading) && (
                <div className="w-full space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-sky-500/10 p-1.5">
                      <FileIcon className="h-4 w-4 text-sky-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
                        {file?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatBytes(file?.size || 0)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-medium text-sky-500">
                        {isUploading ? `${Math.round(progress)}%` : "Ready"}
                      </span>
                      {isUploading ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            resetState();
                          }}
                          className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            resetState();
                          }}
                          className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>

                  <ProgressBar progress={isUploading ? progress : 100} />
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-3 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-600 dark:text-rose-300"
              >
                <XCircle className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{error.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

FileUpload.displayName = "FileUpload";
