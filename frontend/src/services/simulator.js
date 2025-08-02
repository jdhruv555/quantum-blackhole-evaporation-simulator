import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.timeout = 300000; // 5 minutes for long simulations

export async function runSimulation(params) {
  try {
    console.log('Starting simulation with params:', params);
    
    const response = await axios.post('/simulate', {
      qubits: params.qubits,
      depth: params.depth,
      shots: params.shots
    });
    
    console.log('Simulation completed:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Simulation error:', error);
    
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.error || 'Simulation failed');
    } else if (error.request) {
      // Network error
      throw new Error('Network error: Unable to connect to simulation server');
    } else {
      // Other error
      throw new Error(error.message || 'Unknown simulation error');
    }
  }
}

export async function getCircuit(step, params) {
  try {
    const response = await axios.get(`/circuit/${step}`, {
      params: {
        qubits: params.qubits,
        depth: params.depth
      }
    });
    
    return response.data;
    
  } catch (error) {
    console.error('Circuit fetch error:', error);
    throw new Error('Failed to load circuit diagram');
  }
}

export async function getParameters() {
  try {
    const response = await axios.get('/parameters');
    return response.data;
  } catch (error) {
    console.error('Parameter fetch error:', error);
    // Return default parameters if server is unavailable
    return {
      qubits: { min: 2, max: 16, default: 8 },
      depth: { min: 1, max: 10, default: 4 },
      shots: { min: 100, max: 10000, default: 1024 }
    };
  }
}

export async function healthCheck() {
  try {
    const response = await axios.get('/health');
    return response.data.status === 'healthy';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
} 