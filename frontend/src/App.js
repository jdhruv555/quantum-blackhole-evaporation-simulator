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

// Create a professional dark theme with glassmorphism
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000', // Red
    },
    secondary: {
      main: '#ffffff', // White
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(255, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(255, 0, 0, 0.25)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #cc0000 0%, #990000 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
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
      
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background overlays */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 0, 0, 0.05) 0%, transparent 50%)
          `,
          animation: 'pulse 8s ease-in-out infinite alternate',
          '@keyframes pulse': {
            '0%': {
              opacity: 0.3,
            },
            '100%': {
              opacity: 0.6,
            },
          },
        }} />
        
        {/* Additional animated elements */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(255, 0, 0, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': {
              transform: 'translateY(0px) rotate(0deg)',
            },
            '50%': {
              transform: 'translateY(-20px) rotate(180deg)',
            },
          },
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse',
        }} />
      </Box>

      <Container maxWidth="xl" sx={{ pt: 0, pb: 2, position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              background: 'linear-gradient(135deg, #00d4ff 0%, #ff6b9d 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '0 0 30px rgba(0, 212, 255, 0.3)',
            }}
          >
            Quantum Black-Hole Evaporation Simulator
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.4,
            }}
          >
            Explore Hawking radiation through quantum circuit dynamics and witness the Page curve in real-time
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Controls and Overview */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: 'fit-content' }}>
              <SimulationControls 
                params={params} 
                onChange={handleParamChange} 
                onRun={handleRunSimulation}
                loading={loading}
              />
            </Paper>
          </Grid>

          {/* Right Column - Results and Visualization */}
          <Grid item xs={12} lg={8}>
            {loading && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 6, 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <CircularProgress 
                  size={80} 
                  sx={{ 
                    color: '#00d4ff',
                    mb: 3,
                  }} 
                />
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                  Running Quantum Simulation
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
                  Processing quantum circuits and computing entanglement entropy. This may take a few moments depending on the number of qubits.
                </Typography>
              </Paper>
            )}

            {simulationResult && !loading && (
              <>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <PageCurvePlot 
                    data={simulationResult.pageCurve} 
                    idealData={simulationResult.idealCurve}
                    onStepSelect={handleStepSelect}
                  />
                </Paper>

                <Paper sx={{ p: 3 }}>
                  <CircuitViewer step={selectedStep} params={params} />
                </Paper>

                {simulationResult.fidelity && (
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 4,
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      Simulation Quality
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h3" sx={{ color: '#00d4ff', fontWeight: 700 }}>
                        {(simulationResult.fidelity * 100).toFixed(1)}%
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Fidelity with ideal Page curve
                      </Typography>
                    </Box>
                  </Paper>
                )}
              </>
            )}

            {!simulationResult && !loading && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 6, 
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                  Ready to Simulate
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto', lineHeight: 1.6 }}>
                  Adjust the parameters using the controls on the left and click "Run Simulation" to start exploring 
                  quantum black-hole evaporation. Watch the Page curve evolve in real-time as radiation is emitted.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setError(null)} 
            severity="error"
            sx={{ 
              background: 'rgba(244, 67, 54, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default App; 