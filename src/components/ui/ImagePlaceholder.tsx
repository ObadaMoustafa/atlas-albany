interface ImagePlaceholderProps {
  label: string
  className?: string
  recommendedSize?: string
}

export default function ImagePlaceholder({
  label,
  className = '',
  recommendedSize = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center bg-brand-dark border-2 border-dashed border-brand-red/30 rounded-lg overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent" />
      <div className="text-center p-6 z-10">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-brand-red/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-brand-red/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        <p className="text-sm text-white/40 font-mono">[ IMAGE: {label} ]</p>
        {recommendedSize && (
          <p className="text-xs text-white/20 mt-1 font-mono">{recommendedSize}</p>
        )}
      </div>
    </div>
  )
}
