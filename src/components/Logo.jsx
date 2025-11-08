import React from 'react';

function Logo({ size = 'md', inline = false }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const containerClass = inline
    ? `${sizes[size]} inline-block`
    : `${sizes[size]} mx-auto mb-4`;

  return (
    <div className={containerClass}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Integrated Share + Link Design */}
        {/* The circles are now hollow (link-like) and connected (share-like) */}

        {/* Top Center Circle - Hollow to represent link */}
        <circle cx="50" cy="30" r="8" fill="none" stroke="#000000" strokeWidth="4" />

        {/* Bottom Left Circle - Hollow to represent link */}
        <circle cx="28" cy="65" r="8" fill="none" stroke="#000000" strokeWidth="4" />

        {/* Bottom Right Circle - Hollow to represent link */}
        <circle cx="72" cy="65" r="8" fill="none" stroke="#000000" strokeWidth="4" />

        {/* Connection Lines - Share network */}
        <line
          x1="46"
          y1="36"
          x2="32"
          y2="59"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="54"
          y1="36"
          x2="68"
          y2="59"
          stroke="#000000"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Small link chain symbol integrated at the top */}
        <g transform="translate(50, 15)">
          {/* Two small interlocking circles representing a chain link */}
          <circle cx="-5" cy="0" r="3.5" fill="none" stroke="#000000" strokeWidth="2" />
          <circle cx="5" cy="0" r="3.5" fill="none" stroke="#000000" strokeWidth="2" />
          {/* Small connecting line between them */}
          <line
            x1="-1.5"
            y1="0"
            x2="1.5"
            y2="0"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

export default Logo;

