import React from 'react'

type ViewRowsIconProps = {
  className?: string
}

const ViewRowsIcon: React.FC<ViewRowsIconProps> = ({ className = '' }) => {
  return (
    <svg width="20" height="17" viewBox="0 0 20 17" fill="none">
      <rect width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="6" width="14" height="3" fill="#CCD9E0" className={className} />
      <rect x="6" y="7" width="14" height="3" fill="#CCD9E0" className={className} />
      <rect y="6.79999" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect y="13.6" width="3.4" height="3.4" fill="#CCD9E0" className={className} />
      <rect x="6" y="14" width="14" height="3" fill="#CCD9E0" className={className} />
    </svg>
  )
}

export default ViewRowsIcon
