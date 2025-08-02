import React from 'react';
import { 
  Typography, 
  Box, 
  Grid
} from '@mui/material';
import { 
  Science, 
  Timeline, 
  ShowChart, 
  Memory
} from '@mui/icons-material';

export default function FeatureOverview() {
  const features = [
    {
      icon: <Science />,
      title: "Quantum Simulation",
      description: "Hawking radiation via qubit-transport model"
    },
    {
      icon: <Timeline />,
      title: "Page Curve",
      description: "Entanglement entropy evolution"
    },
    {
      icon: <ShowChart />,
      title: "Real-time Analysis",
      description: "Monitor entropy changes step-by-step"
    },
    {
      icon: <Memory />,
      title: "Circuit View",
      description: "Explore quantum circuits for each step"
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      {/* Black Hole Visualization */}
      <Box sx={{
        position: 'relative',
        height: 300,
        mb: 4,
        borderRadius: 4,
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.9) 60%, #000 100%)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 50px rgba(255, 0, 0, 0.3)'
      }}>
        {/* Central Black Hole */}
        <Box sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #000 0%, #000 50%, rgba(255, 0, 0, 0.5) 100%)',
          boxShadow: '0 0 60px rgba(255, 0, 0, 0.8), inset 0 0 30px rgba(0, 0, 0, 0.9)',
          animation: 'pulse 2s ease-in-out infinite',
          position: 'relative',
          zIndex: 3,
          '@keyframes pulse': {
            '0%, 100%': { 
              transform: 'scale(1)', 
              boxShadow: '0 0 60px rgba(255, 0, 0, 0.8), inset 0 0 30px rgba(0, 0, 0, 0.9)' 
            },
            '50%': { 
              transform: 'scale(1.2)', 
              boxShadow: '0 0 80px rgba(255, 0, 0, 1), inset 0 0 40px rgba(0, 0, 0, 1)' 
            }
          }
        }} />
        
        {/* Orbiting Particles */}
        {[...Array(16)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: `hsl(${i * 22.5}, 100%, 70%)`,
              boxShadow: `0 0 12px hsl(${i * 22.5}, 100%, 70%)`,
              animation: `orbit ${2 + i * 0.1}s linear infinite`,
              transformOrigin: 'center',
              '@keyframes orbit': {
                '0%': { 
                  transform: `rotate(${i * 22.5}deg) translateX(${120 + i * 8}px) rotate(-${i * 22.5}deg)`,
                  opacity: 0.9
                },
                '50%': { 
                  transform: `rotate(${i * 22.5 + 180}deg) translateX(${120 + i * 8}px) rotate(-${i * 22.5 + 180}deg)`,
                  opacity: 1
                },
                '100%': { 
                  transform: `rotate(${i * 22.5 + 360}deg) translateX(${120 + i * 8}px) rotate(-${i * 22.5 + 360}deg)`,
                  opacity: 0.9
                }
              }
            }}
          />
        ))}
        
        {/* Gravitational Lensing Effect */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent, rgba(255, 0, 0, 0.2), transparent, rgba(255, 255, 255, 0.1), transparent)',
          animation: 'rotate 8s linear infinite',
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          }
        }} />
        
        {/* Hawking Radiation Particles */}
        {[...Array(12)].map((_, i) => (
          <Box
            key={`hawking-${i}`}
            sx={{
              position: 'absolute',
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: '#ffffff',
              boxShadow: '0 0 6px #ffffff',
              animation: `hawking ${1.5 + i * 0.2}s ease-out infinite`,
              '@keyframes hawking': {
                '0%': { 
                  transform: `translate(${Math.cos(i * 30 * Math.PI / 180) * 50}px, ${Math.sin(i * 30 * Math.PI / 180) * 50}px)`,
                  opacity: 1
                },
                '100%': { 
                  transform: `translate(${Math.cos(i * 30 * Math.PI / 180) * 200}px, ${Math.sin(i * 30 * Math.PI / 180) * 200}px)`,
                  opacity: 0
                }
              }
            }}
          />
        ))}
      </Box>

      <Box sx={{ 
        textAlign: 'center', 
        mb: 2,
        p: 2,
        borderRadius: 4,
        background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.08) 0%, rgba(255, 255, 255, 0.08) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ff0000 0%, #ffffff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
            zIndex: 1
          }}
        >
          Quantum Black-Hole Simulator
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            fontWeight: 400,
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
            zIndex: 1,
            opacity: 0.8,
            color: '#ffffff'
          }}
        >
          Explore Hawking radiation through quantum circuit dynamics
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        maxWidth: 800,
        mx: 'auto'
      }}>
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              cursor: 'pointer',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 0, 0, 0.2)',
                transform: 'translateX(8px)',
                boxShadow: '0 8px 32px rgba(255, 0, 0, 0.15)'
              }
            }}
          >
            <Box sx={{
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.15) 0%, rgba(255, 255, 255, 0.15) 100%)',
              color: '#ff0000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 56,
              height: 56,
              flexShrink: 0
            }}>
              {React.cloneElement(feature.icon, { sx: { fontSize: 24 } })}
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 600,
                  mb: 0.5,
                  color: '#ffffff',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.1rem'
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  lineHeight: 1.5,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  color: '#ffffff'
                }}
              >
                {feature.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 