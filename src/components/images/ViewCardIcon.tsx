import React from 'react'

type ViewCardIconProps = {
  className?: string
}

const ViewCardIcon: React.FC<ViewCardIconProps> = ({ className = '' }) => {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <rect width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="6.7998" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="13.5996" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="13.5996" y="6.79999" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="6.7998" y="6.79999" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect y="6.79999" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect y="13.6" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="6.7998" y="13.6" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="13.5996" y="13.6" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
    </svg>
  )
}

export default ViewCardIcon
