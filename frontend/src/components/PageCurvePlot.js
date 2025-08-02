import React from 'react';
import { 
  Box, 
  Typography,
  Button,
  ButtonGroup,
  Paper
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Timeline, ShowChart } from '@mui/icons-material';

export default function PageCurvePlot({ data, idealData, onStepSelect }) {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <ShowChart sx={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.3)', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          No simulation data available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Run a simulation to see the Page curve
        </Typography>
      </Box>
    );
  }

  // Prepare data for the chart
  const chartData = data.map((entropy, index) => ({
    step: index + 1,
    simulated: entropy,
    ideal: idealData ? idealData[index] : null,
    emission: `Step ${index + 1}`
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00d4ff' }}>
            Emission Step {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color, mb: 0.5 }}>
              {entry.name}: {entry.value.toFixed(3)}
            </Typography>
          ))}
          <Button
            size="small"
            variant="outlined"
            onClick={() => onStepSelect(label)}
            sx={{ 
              mt: 2,
              border: '1px solid rgba(0, 212, 255, 0.3)',
              color: '#00d4ff',
              '&:hover': {
                border: '1px solid rgba(0, 212, 255, 0.5)',
                background: 'rgba(0, 212, 255, 0.1)',
              }
            }}
          >
            View Circuit
          </Button>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Timeline sx={{ fontSize: 32, color: '#00d4ff' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
            Entanglement Entropy Evolution
          </Typography>
        </Box>
        <ButtonGroup 
          size="small" 
          sx={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {chartData.map((point, index) => (
            <Button
              key={index}
              variant={index === 0 ? "contained" : "text"}
              onClick={() => onStepSelect(point.step)}
              sx={{ 
                minWidth: 'auto', 
                px: 2,
                py: 1,
                color: index === 0 ? '#ffffff' : 'text.secondary',
                background: index === 0 ? 'linear-gradient(135deg, #00d4ff 0%, #ff6b9d 100%)' : 'transparent',
                border: 'none',
                borderRadius: 0,
                '&:hover': {
                  background: index === 0 ? 'linear-gradient(135deg, #00b8e6 0%, #e6457a 100%)' : 'rgba(255, 255, 255, 0.1)',
                },
                '&:not(:last-child)': {
                  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              {point.step}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 3,
        }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="step" 
              label={{ 
                value: 'Emission Step', 
                position: 'insideBottom', 
                offset: -10,
                style: { fill: '#b0b0b0', fontSize: 12 }
              }}
              stroke="#b0b0b0"
              tick={{ fill: '#b0b0b0' }}
            />
            <YAxis 
              label={{ 
                value: 'Rényi-2 Entropy', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#b0b0b0', fontSize: 12 }
              }}
              stroke="#b0b0b0"
              tick={{ fill: '#b0b0b0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                paddingTop: 20,
                color: '#ffffff'
              }}
            />
            
            {/* Simulated Page curve */}
            <Line
              type="monotone"
              dataKey="simulated"
              stroke="#00d4ff"
              strokeWidth={3}
              dot={{ fill: '#00d4ff', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8, stroke: '#00d4ff', strokeWidth: 3, fill: '#00d4ff' }}
              name="Simulated Entropy"
            />
            
            {/* Ideal Page curve */}
            {idealData && (
              <Line
                type="monotone"
                dataKey="ideal"
                stroke="#ff6b9d"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#ff6b9d', strokeWidth: 1, r: 4 }}
                name="Ideal Page Curve"
              />
            )}
            
            {/* Reference line for maximum entropy */}
            <ReferenceLine 
              y={Math.max(...data)} 
              stroke="rgba(255, 255, 255, 0.3)" 
              strokeDasharray="3 3"
              label={{ 
                value: 'Max Entropy', 
                position: 'top',
                style: { fill: '#b0b0b0', fontSize: 12 }
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 3,
          background: 'rgba(0, 212, 255, 0.05)',
          border: '1px solid rgba(0, 212, 255, 0.1)',
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#00d4ff', mb: 2 }}>
          Page Curve Interpretation
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
              <strong>Rising Phase:</strong> Entanglement increases as radiation is emitted
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b9d', flexShrink: 0 }} />
              <strong>Peak:</strong> Maximum entanglement at half evaporation
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
              <strong>Falling Phase:</strong> Information begins to be recovered
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b9d', flexShrink: 0 }} />
              <strong>End:</strong> Complete evaporation reveals all information
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 