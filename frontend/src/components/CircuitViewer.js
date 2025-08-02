import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { Memory, Error } from '@mui/icons-material';
import { getCircuit } from '../services/simulator';

export default function CircuitViewer({ step, params }) {
  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (step && params) {
      setLoading(true);
      setError(null);
      
      getCircuit(step, params)
        .then(data => {
          setCircuit(data);
        })
        .catch(err => {
          setError(err.message || 'Failed to load circuit');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [step, params]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#00d4ff',
            mb: 3,
          }} 
        />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Loading Quantum Circuit
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generating circuit diagram for emission step {step}...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Error sx={{ fontSize: 64, color: '#ff6b9d', mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff6b9d' }}>
          Circuit Loading Error
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Chip 
          label="Try again" 
          onClick={() => window.location.reload()}
          sx={{ 
            background: 'rgba(255, 107, 157, 0.1)',
            color: '#ff6b9d',
            border: '1px solid rgba(255, 107, 157, 0.2)',
            '&:hover': {
              background: 'rgba(255, 107, 157, 0.2)',
            }
          }}
        />
      </Box>
    );
  }

  if (!circuit) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Memory sx={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.3)', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          No circuit selected
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Click on a point in the Page curve to view its quantum circuit
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Memory sx={{ fontSize: 32, color: '#00d4ff' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
          Quantum Circuit - Step {step}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Circuit Parameters
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`${params.qubits} qubits`}
                size="small"
                sx={{ 
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  fontWeight: 500,
                }}
              />
              <Chip 
                label={`Depth ${params.depth}`}
                size="small"
                sx={{ 
                  background: 'rgba(255, 107, 157, 0.1)',
                  color: '#ff6b9d',
                  border: '1px solid rgba(255, 107, 157, 0.2)',
                  fontWeight: 500,
                }}
              />
              <Chip 
                label={`${params.shots} shots`}
                size="small"
                sx={{ 
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            p: 3,
            overflow: 'auto',
            maxHeight: 500,
            fontFamily: '"Courier New", monospace',
            fontSize: '0.875rem',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: '#ffffff',
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 212, 255, 0.3)',
              borderRadius: 4,
              '&:hover': {
                background: 'rgba(0, 212, 255, 0.5)',
              },
            },
          }}
        >
          {circuit.circuit}
        </Box>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.1)',
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00d4ff', mb: 2 }}>
          Circuit Components
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
              <strong>Bell Pairs:</strong> Initial vacuum state preparation
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b9d', flexShrink: 0 }} />
              <strong>Scrambling:</strong> Random unitary evolution
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
              <strong>Swap Gates:</strong> Radiation emission mechanism
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b9d', flexShrink: 0 }} />
              <strong>Measurements:</strong> Rényi-2 entropy calculation
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
              <strong>Registers:</strong> q (black hole), a/b (radiation)
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b9d', flexShrink: 0 }} />
              <strong>Gates:</strong> H, CX, RZ, RX, SWAP operations
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 