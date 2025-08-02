import React from 'react';
import { 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Chip
} from '@mui/material';
import { 
  Science, 
  Timeline, 
  ShowChart, 
  Memory,
  Speed,
  Psychology
} from '@mui/icons-material';

export default function FeatureOverview() {
  const features = [
    {
      icon: <Science color="primary" />,
      title: "Quantum Circuit Simulation",
      description: "Simulate Hawking radiation using qubit-transport toy model with Bell pairs and swap gates"
    },
    {
      icon: <Timeline color="secondary" />,
      title: "Page Curve Visualization",
      description: "Observe entanglement entropy evolution during black-hole evaporation"
    },
    {
      icon: <ShowChart color="primary" />,
      title: "Interactive Parameters",
      description: "Adjust qubit count, scrambling depth, and measurement shots"
    },
    {
      icon: <Memory color="secondary" />,
      title: "Circuit Visualization",
      description: "Explore quantum circuits for each emission step"
    },
    {
      icon: <Speed color="primary" />,
      title: "Real-time Results",
      description: "Get instant feedback on simulation quality and fidelity"
    },
    {
      icon: <Psychology color="secondary" />,
      title: "Theoretical Foundation",
      description: "Based on established quantum information theory and black-hole physics"
    }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Simulation Features
      </Typography>
      
      <List>
        {features.map((feature, index) => (
          <ListItem key={index} sx={{ py: 1 }}>
            <ListItemIcon>
              {feature.icon}
            </ListItemIcon>
            <ListItemText
              primary={feature.title}
              secondary={feature.description}
              primaryTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom color="primary">
          How it works:
        </Typography>
        <Typography variant="body2" paragraph>
          1. Initialize vacuum state with Bell pairs
        </Typography>
        <Typography variant="body2" paragraph>
          2. Apply scrambling unitary to black-hole qubits
        </Typography>
        <Typography variant="body2" paragraph>
          3. Emit radiation via swap gates
        </Typography>
        <Typography variant="body2">
          4. Measure Rényi-2 entropy of outgoing radiation
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Chip 
          label="Qiskit Aer Simulator" 
          color="primary" 
          size="small" 
          sx={{ mr: 1 }}
        />
        <Chip 
          label="IBM Quantum Ready" 
          color="secondary" 
          size="small" 
          sx={{ mr: 1 }}
        />
        <Chip 
          label="Real-time Analysis" 
          color="primary" 
          size="small" 
        />
      </Box>
    </Box>
  );
} 