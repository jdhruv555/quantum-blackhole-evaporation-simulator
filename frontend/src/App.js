import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FeatureOverview from './components/FeatureOverview';
import SimulationControls from './components/SimulationControls';
import PageCurvePlot from './components/PageCurvePlot';
import CircuitViewer from './components/CircuitViewer';
import { runSimulation } from './services/simulator';

// Create a dark theme for the quantum simulation interface
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
    },
    h2: {
      fontWeight: 300,
    },
  },
});

function App() {
  const [params, setParams] = useState({ 
    qubits: 8, 
    depth: 4, 
    shots: 1024 
  });
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStep, setSelectedStep] = useState(1);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleRunSimulation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await runSimulation(params);
      setSimulationResult(result);
    } catch (err) {
      setError(err.message || 'Simulation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStepSelect = (step) => {
    setSelectedStep(step);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ 
            background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            Quantum Black-Hole Evaporation Simulator
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
            Explore Hawking radiation through quantum circuit dynamics
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Controls and Overview */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
              <FeatureOverview />
            </Paper>
            
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <SimulationControls 
                params={params}
                onChange={handleParamChange}
                onRun={handleRunSimulation}
                loading={loading}
              />
            </Paper>
          </Grid>

          {/* Right Column - Results and Visualization */}
          <Grid item xs={12} md={8}>
            {loading && (
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Running quantum simulation...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This may take a few moments depending on the number of qubits
                </Typography>
              </Paper>
            )}

            {simulationResult && !loading && (
              <>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Page Curve Results
                  </Typography>
                  <PageCurvePlot 
                    data={simulationResult.pageCurve}
                    idealData={simulationResult.idealCurve}
                    onStepSelect={handleStepSelect}
                  />
                </Paper>

                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Circuit Visualization
                  </Typography>
                  <CircuitViewer 
                    step={selectedStep}
                    params={params}
                  />
                </Paper>

                {simulationResult.fidelity && (
                  <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Simulation Quality
                    </Typography>
                    <Typography variant="body1">
                      Fidelity with ideal Page curve: {(simulationResult.fidelity * 100).toFixed(1)}%
                    </Typography>
                  </Paper>
                )}
              </>
            )}

            {!simulationResult && !loading && (
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Ready to Simulate
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Adjust the parameters and click "Run Simulation" to start exploring 
                  quantum black-hole evaporation
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App; 