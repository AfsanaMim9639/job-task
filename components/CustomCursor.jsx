// components/CustomCursor.jsx
'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [particles, setParticles] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrameId

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Create new particle
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        size: Math.random() * 8 + 4,
        life: 1
      }

      setParticles(prev => [...prev.slice(-30), newParticle])
    }

    // Animate particles
    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({ ...p, life: p.life - 0.02 }))
          .filter(p => p.life > 0)
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />

      {/* Particle trail */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}

      <style jsx>{`
        .cursor-glow {
          position: fixed;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(0, 212, 255, 0.6) 0%,
            rgba(0, 102, 255, 0.4) 30%,
            rgba(147, 51, 234, 0.3) 60%,
            transparent 100%
          );
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          filter: blur(8px);
          animation: pulse 2s ease-in-out infinite;
        }

        .cursor-particle {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          filter: blur(2px);
          animation: float 0.5s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            transform: translate(-50%, -50%) scale(0.5);
          }
        }

        /* Hide default cursor */
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}