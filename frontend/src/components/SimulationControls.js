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
  Divider,
  Paper
} from '@mui/material';
import { PlayArrow, Settings, Tune } from '@mui/icons-material';

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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Settings sx={{ fontSize: 32, color: '#00d4ff', mr: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #00d4ff 0%, #ff6b9d 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Simulation Parameters
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Number of Qubits
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
          <TextField
            type="number"
            value={params.qubits}
            onChange={handleInputChange('qubits')}
            inputProps={{ min: 2, max: 16 }}
            size="small"
            sx={{ 
              width: 100,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                '&:hover': {
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                },
                '&.Mui-focused': {
                  border: '1px solid rgba(0, 212, 255, 0.5)',
                }
              }
            }}
          />
          <Slider
            value={params.qubits}
            onChange={handleSliderChange('qubits')}
            min={2}
            max={16}
            marks
            valueLabelDisplay="auto"
            sx={{ 
              flexGrow: 1,
              '& .MuiSlider-track': {
                background: 'linear-gradient(90deg, #00d4ff 0%, #ff6b9d 100%)',
              },
              '& .MuiSlider-thumb': {
                background: 'linear-gradient(135deg, #00d4ff 0%, #ff6b9d 100%)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
              },
              '& .MuiSlider-mark': {
                background: '#00d4ff',
              }
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          Controls the size of the black hole and radiation registers
        </Typography>
      </Box>

      <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Scrambling Depth
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
          <TextField
            type="number"
            value={params.depth}
            onChange={handleInputChange('depth')}
            inputProps={{ min: 1, max: 10 }}
            size="small"
            sx={{ 
              width: 100,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                '&:hover': {
                  border: '1px solid rgba(255, 107, 157, 0.3)',
                },
                '&.Mui-focused': {
                  border: '1px solid rgba(255, 107, 157, 0.5)',
                }
              }
            }}
          />
          <Slider
            value={params.depth}
            onChange={handleSliderChange('depth')}
            min={1}
            max={10}
            marks
            valueLabelDisplay="auto"
            sx={{ 
              flexGrow: 1,
              '& .MuiSlider-track': {
                background: 'linear-gradient(90deg, #ff6b9d 0%, #00d4ff 100%)',
              },
              '& .MuiSlider-thumb': {
                background: 'linear-gradient(135deg, #ff6b9d 0%, #00d4ff 100%)',
                boxShadow: '0 0 20px rgba(255, 107, 157, 0.3)',
              },
              '& .MuiSlider-mark': {
                background: '#ff6b9d',
              }
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
          Number of layers in the random unitary circuit for fast scrambling
        </Typography>
      </Box>

      <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Measurement Shots
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={params.shots}
            onChange={(e) => onChange('shots', e.target.value)}
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              '&:hover': {
                border: '1px solid rgba(0, 212, 255, 0.3)',
              },
              '&.Mui-focused': {
                border: '1px solid rgba(0, 212, 255, 0.5)',
              }
            }}
          >
            <MenuItem value={100}>100 shots (Fast)</MenuItem>
            <MenuItem value={512}>512 shots (Standard)</MenuItem>
            <MenuItem value={1024}>1024 shots (Accurate)</MenuItem>
            <MenuItem value={2048}>2048 shots (High Precision)</MenuItem>
            <MenuItem value={4096}>4096 shots (Maximum)</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.5 }}>
          More shots provide better statistical accuracy but take longer
        </Typography>
      </Box>

      <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onRun}
          disabled={loading}
          startIcon={<PlayArrow />}
          sx={{ 
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            background: 'linear-gradient(135deg, #00d4ff 0%, #ff6b9d 100%)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #00b8e6 0%, #e6457a 100%)',
              boxShadow: '0 12px 40px rgba(0, 212, 255, 0.4)',
              transform: 'translateY(-2px)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {loading ? 'Running...' : 'Run Simulation'}
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          mt: 4, 
          p: 3, 
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Tune sx={{ fontSize: 24, color: '#00d4ff', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#00d4ff' }}>
            Current Configuration
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
            {params.qubits} qubits (Black hole + Radiation)
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b9d', flexShrink: 0 }} />
            {params.depth} layers of scrambling
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
            {params.shots} measurement shots
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontStyle: 'italic' }}>
          Estimated runtime: {Math.ceil(params.qubits * params.depth * params.shots / 1000)} seconds
        </Typography>
      </Paper>
    </Box>
  );
} 