import React from 'react';
import { 
  Box, 
  Typography,
  Button,
  ButtonGroup
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

export default function PageCurvePlot({ data, idealData, onStepSelect }) {
  if (!data || data.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No simulation data available. Run a simulation to see the Page curve.
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
        <Box sx={{ 
          bgcolor: 'background.paper', 
          p: 2, 
          border: 1, 
          borderColor: 'divider',
          borderRadius: 1
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Emission Step {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(3)}
            </Typography>
          ))}
          <Button
            size="small"
            variant="outlined"
            onClick={() => onStepSelect(label)}
            sx={{ mt: 1 }}
          >
            View Circuit
          </Button>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Entanglement Entropy Evolution
        </Typography>
        <ButtonGroup size="small">
          {chartData.map((point, index) => (
            <Button
              key={index}
              variant={index === 0 ? "contained" : "outlined"}
              onClick={() => onStepSelect(point.step)}
              sx={{ minWidth: 'auto', px: 1 }}
            >
              {point.step}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="step" 
            label={{ value: 'Emission Step', position: 'insideBottom', offset: -10 }}
            stroke="#ccc"
          />
          <YAxis 
            label={{ value: 'Rényi-2 Entropy', angle: -90, position: 'insideLeft' }}
            stroke="#ccc"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Simulated Page curve */}
          <Line
            type="monotone"
            dataKey="simulated"
            stroke="#00bcd4"
            strokeWidth={3}
            dot={{ fill: '#00bcd4', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#00bcd4', strokeWidth: 2 }}
            name="Simulated Entropy"
          />
          
          {/* Ideal Page curve */}
          {idealData && (
            <Line
              type="monotone"
              dataKey="ideal"
              stroke="#ff4081"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#ff4081', strokeWidth: 1, r: 3 }}
              name="Ideal Page Curve"
            />
          )}
          
          {/* Reference line for maximum entropy */}
          <ReferenceLine 
            y={Math.max(...data)} 
            stroke="#666" 
            strokeDasharray="3 3"
            label={{ value: 'Max Entropy', position: 'top' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom color="primary">
          Page Curve Interpretation:
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Rising Phase:</strong> Entanglement increases as radiation is emitted
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Peak:</strong> Maximum entanglement at half evaporation
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Falling Phase:</strong> Information begins to be recovered
        </Typography>
        <Typography variant="body2">
          • <strong>End:</strong> Complete evaporation reveals all information
        </Typography>
      </Box>
    </Box>
  );
} 