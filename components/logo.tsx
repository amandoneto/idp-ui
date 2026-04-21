"use client"

import React from 'react'

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 100"
      className={className}
    >
      <defs>
        <linearGradient id="rehvalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
      </defs>

      <text
        x="5"
        y="60"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="56"
        fontWeight="900"
        fill="url(#rehvalGradient)"
        letterSpacing="-1.5"
      >
        REHVAL
      </text>

      <text
        x="8"
        y="82"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#64748b"
        letterSpacing="1.5"
      >
        TALENT ASSESSMENT &amp; DEVELOPMENT
      </text>
    </svg>
  )
}
