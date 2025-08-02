import React from 'react';
import { 
  Typography, 
  Box, 
  Slider, 
  Button, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import { PlayArrow, Settings } from '@mui/icons-material';

export default function SimulationControls({ params, onChange, onRun, loading }) {
  const handleSliderChange = (param) => (event, newValue) => {
    onChange(param, newValue);
  };

  const handleInputChange = (param) => (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      onChange(param, value);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Settings sx={{ mr: 1 }} />
        Simulation Parameters
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Number of Qubits
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            type="number"
            value={params.qubits}
            onChange={handleInputChange('qubits')}
            inputProps={{ min: 2, max: 16 }}
            size="small"
            sx={{ width: 80 }}
          />
          <Slider
            value={params.qubits}
            onChange={handleSliderChange('qubits')}
            min={2}
            max={16}
            marks
            valueLabelDisplay="auto"
            sx={{ flexGrow: 1 }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Controls the size of the black hole and radiation registers
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Scrambling Depth
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            type="number"
            value={params.depth}
            onChange={handleInputChange('depth')}
            inputProps={{ min: 1, max: 10 }}
            size="small"
            sx={{ width: 80 }}
          />
          <Slider
            value={params.depth}
            onChange={handleSliderChange('depth')}
            min={1}
            max={10}
            marks
            valueLabelDisplay="auto"
            sx={{ flexGrow: 1 }}
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Number of layers in the random unitary circuit for fast scrambling
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Measurement Shots
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={params.shots}
            onChange={(e) => onChange('shots', e.target.value)}
          >
            <MenuItem value={100}>100 shots (Fast)</MenuItem>
            <MenuItem value={512}>512 shots (Standard)</MenuItem>
            <MenuItem value={1024}>1024 shots (Accurate)</MenuItem>
            <MenuItem value={2048}>2048 shots (High Precision)</MenuItem>
            <MenuItem value={4096}>4096 shots (Maximum)</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="caption" color="text.secondary">
          More shots provide better statistical accuracy but take longer
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onRun}
          disabled={loading}
          startIcon={<PlayArrow />}
          sx={{ 
            py: 1.5,
            background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
            '&:hover': {
              background: 'linear-gradient(45deg, #00acc1, #f50057)',
            }
          }}
        >
          {loading ? 'Running...' : 'Run Simulation'}
        </Button>
      </Box>

      <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom color="primary">
          Current Configuration:
        </Typography>
        <Typography variant="body2">
          • {params.qubits} qubits (Black hole + Radiation)
        </Typography>
        <Typography variant="body2">
          • {params.depth} layers of scrambling
        </Typography>
        <Typography variant="body2">
          • {params.shots} measurement shots
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Estimated runtime: {Math.ceil(params.qubits * params.depth * params.shots / 1000)} seconds
        </Typography>
      </Box>
    </Box>
  );
} 