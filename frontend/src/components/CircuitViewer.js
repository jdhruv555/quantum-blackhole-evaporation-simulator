import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { Memory, Timeline } from '@mui/icons-material';
import axios from 'axios';

export default function CircuitViewer({ step, params }) {
  const [circuitData, setCircuitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCircuit = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`/circuit/${step}`, {
          params: {
            qubits: params.qubits,
            depth: params.depth
          }
        });
        setCircuitData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load circuit');
      } finally {
        setLoading(false);
      }
    };

    if (step > 0) {
      fetchCircuit();
    }
  }, [step, params.qubits, params.depth]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress size={40} />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading circuit for step {step}...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!circuitData) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Select an emission step to view the quantum circuit
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Memory color="primary" />
        <Typography variant="h6">
          Circuit for Emission Step {step}
        </Typography>
        <Chip 
          label={`${params.qubits} qubits`} 
          size="small" 
          color="primary" 
        />
        <Chip 
          label={`Depth ${params.depth}`} 
          size="small" 
          color="secondary" 
        />
      </Box>

      <Paper elevation={2} sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Box sx={{ 
          fontFamily: 'monospace', 
          fontSize: '0.8rem',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
          overflowX: 'auto',
          bgcolor: '#1a1a1a',
          p: 2,
          borderRadius: 1,
          border: 1,
          borderColor: 'divider'
        }}>
          {circuitData.circuit}
        </Box>
      </Paper>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom color="primary">
          Circuit Components:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip label="Bell Pairs" size="small" variant="outlined" />
          <Chip label="Scrambling" size="small" variant="outlined" />
          <Chip label="Swap Gates" size="small" variant="outlined" />
          <Chip label="Measurements" size="small" variant="outlined" />
        </Box>
        
        <Typography variant="body2" paragraph>
          <strong>Registers:</strong> q (black hole), a (infalling), b (outgoing)
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Process:</strong> Vacuum preparation → Scrambling → Radiation emission → Measurement
        </Typography>
        <Typography variant="body2">
          <strong>Step {step}:</strong> {step} qubits have been emitted as radiation
        </Typography>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Timeline color="secondary" fontSize="small" />
        <Typography variant="caption" color="text.secondary">
          This circuit represents the quantum state after {step} emission steps
        </Typography>
      </Box>
    </Box>
  );
} 