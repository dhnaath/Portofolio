interface TranscriptImageProps {
  src: string;
  alt: string;
}

export function TranscriptImage({ src, alt }: TranscriptImageProps) {
  return (
    <div className="w-full flex justify-center relative items-start -mt-[15pt]">
      <img
        src={src}
        alt={alt}
        fetchpriority="high"
        className="w-full max-h-[700px] object-contain mix-blend-multiply pointer-events-none select-none"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
