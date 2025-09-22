interface DisclaimerProps {
  text: string
}

export default function Disclaimer({ text }: DisclaimerProps) {
  return (
    <div className="text-center">
      <p className="text-xs text-gray-300 leading-relaxed max-w-2xl mx-auto">
        {text}
      </p>
    </div>
  )
}