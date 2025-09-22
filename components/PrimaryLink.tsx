interface PrimaryLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}

export default function PrimaryLink({ href, children, external = false, className = '' }: PrimaryLinkProps) {
  const linkProps = external 
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      href={href}
      {...linkProps}
      className={`text-lg font-light underline decoration-1 underline-offset-4 hover:no-underline transition-all duration-200 focus-ring ${className}`}
    >
      {children}
    </a>
  )
}