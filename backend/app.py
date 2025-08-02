from flask import Flask, request, jsonify
from flask_cors import CORS
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import Aer
from qiskit.quantum_info import random_unitary, Operator
import numpy as np
import json
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BlackHoleSimulator:
    """Quantum simulator for black-hole evaporation using qubit-transport toy model."""
    
    def __init__(self, n_qubits=8):
        self.n_qubits = n_qubits
        # Registers: black hole (q), infalling radiation (a), outgoing radiation (b)
        self.q_reg = QuantumRegister(n_qubits, 'q')  # Black hole qubits
        self.a_reg = QuantumRegister(n_qubits, 'a')  # Infalling radiation
        self.b_reg = QuantumRegister(n_qubits, 'b')  # Outgoing radiation
        self.c_reg = ClassicalRegister(n_qubits, 'c')  # Classical register for measurements
        
    def prepare_vacuum_state(self, qc):
        """Prepare Bell pairs for vacuum state |β⟩_{a_i b_i}."""
        for i in range(self.n_qubits):
            # Create Bell pair: |β⟩ = (|00⟩ + |11⟩)/√2
            qc.h(self.a_reg[i])
            qc.cx(self.a_reg[i], self.b_reg[i])
            
    def initialize_black_hole(self, qc):
        """Initialize black hole in a random pure state."""
        # Apply simple random rotations to black hole qubits
        for i in range(self.n_qubits):
            qc.h(self.q_reg[i])
            qc.rz(np.random.random() * 2 * np.pi, self.q_reg[i])
            qc.rx(np.random.random() * 2 * np.pi, self.q_reg[i])
        
    def apply_scrambling(self, qc, depth=4):
        """Apply brick-wall random unitary circuit for fast scrambling."""
        for layer in range(depth):
            # Even pairs
            for i in range(0, self.n_qubits - 1, 2):
                qc.h(self.q_reg[i])
                qc.cx(self.q_reg[i], self.q_reg[i + 1])
                qc.rz(np.pi/4, self.q_reg[i])
                qc.rz(np.pi/4, self.q_reg[i + 1])
                qc.cx(self.q_reg[i], self.q_reg[i + 1])
                qc.h(self.q_reg[i])
            # Odd pairs
            for i in range(1, self.n_qubits - 1, 2):
                qc.h(self.q_reg[i])
                qc.cx(self.q_reg[i], self.q_reg[i + 1])
                qc.rz(np.pi/4, self.q_reg[i])
                qc.rz(np.pi/4, self.q_reg[i + 1])
                qc.cx(self.q_reg[i], self.q_reg[i + 1])
                qc.h(self.q_reg[i])
                
    def compute_renyi_entropy(self, counts, shots=1024):
        """Compute Rényi-2 entropy from measurement counts."""
        if not counts:
            return 0.0
        
        # Normalize probabilities
        total = sum(counts.values())
        probabilities = [count / total for count in counts.values()]
        
        # Compute Rényi-2 entropy: S_2 = -log(∑ p_i^2)
        p2_sum = sum(p**2 for p in probabilities)
        if p2_sum > 0:
            return -np.log(p2_sum)
        else:
            return 0.0
            
    def simulate_emission_step(self, step):
        """Simulate one step of black hole evaporation."""
        # Create circuit for this step
        qc = QuantumCircuit(self.q_reg, self.a_reg, self.b_reg, self.c_reg)
        
        # Prepare vacuum state
        self.prepare_vacuum_state(qc)
        qc.barrier()
        
        # Initialize black hole
        self.initialize_black_hole(qc)
        qc.barrier()
        
        # Apply scrambling
        self.apply_scrambling(qc, depth=4)
        qc.barrier()
        
        # Emit radiation qubits up to current step
        for i in range(step):
            qc.swap(self.q_reg[i], self.b_reg[i])
        
        qc.barrier()
        
        # Measure outgoing radiation qubits
        for i in range(step):
            qc.measure(self.b_reg[i], self.c_reg[i])
            
        return qc
        
    def simulate_page_curve(self, depth=4, shots=1024):
        """Simulate complete evaporation and compute Page curve."""
        page_curve = []
        
        for step in range(1, self.n_qubits + 1):
            logger.info(f"Simulating emission step {step}/{self.n_qubits}")
            
            # Create circuit for this step
            qc = self.simulate_emission_step(step)
            
            # Execute on simulator using Aer backend
            backend = Aer.get_backend('qasm_simulator')
            job = backend.run(qc, shots=shots)
            result = job.result()
            counts = result.get_counts()
            
            # Compute Rényi-2 entropy
            entropy = self.compute_renyi_entropy(counts, shots)
            page_curve.append(entropy)
            
        return page_curve

def get_ideal_page_curve(n_qubits):
    """Compute ideal Page curve for comparison."""
    ideal_curve = []
    for step in range(1, n_qubits + 1):
        # Ideal Page curve: S ≈ min(step, n_qubits - step)
        ideal_entropy = min(step, n_qubits - step)
        ideal_curve.append(ideal_entropy)
    return ideal_curve

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({'status': 'healthy', 'message': 'Quantum Black Hole Simulator is running'})

@app.route('/simulate', methods=['POST'])
def simulate():
    """Main simulation endpoint."""
    try:
        data = request.get_json()
        n_qubits = data.get('qubits', 8)
        depth = data.get('depth', 4)
        shots = data.get('shots', 1024)
        
        logger.info(f"Starting simulation with {n_qubits} qubits, depth {depth}")
        
        # Create simulator
        simulator = BlackHoleSimulator(n_qubits)
        
        # Run simulation
        page_curve = simulator.simulate_page_curve(depth=depth, shots=shots)
        
        # Get ideal curve for comparison
        ideal_curve = get_ideal_page_curve(n_qubits)
        
        # Calculate fidelity (correlation with ideal curve)
        correlation = np.corrcoef(page_curve, ideal_curve)[0, 1]
        
        result = {
            'pageCurve': page_curve,
            'idealCurve': ideal_curve,
            'fidelity': correlation if not np.isnan(correlation) else 0.0,
            'parameters': {
                'n_qubits': n_qubits,
                'depth': depth,
                'shots': shots
            }
        }
        
        logger.info(f"Simulation completed. Fidelity: {result['fidelity']:.3f}")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Simulation error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/circuit/<int:step>', methods=['GET'])
def get_circuit(step):
    """Get circuit diagram for a specific emission step."""
    try:
        n_qubits = request.args.get('qubits', 8, type=int)
        depth = request.args.get('depth', 4, type=int)
        
        simulator = BlackHoleSimulator(n_qubits)
        qc = simulator.simulate_emission_step(step)
        
        # Convert circuit to text representation and handle the TextDrawing object
        try:
            circuit_drawing = qc.draw(output='text')
            # Convert TextDrawing to string if it's not already a string
            if hasattr(circuit_drawing, 'single_string'):
                circuit_text = circuit_drawing.single_string()
            elif hasattr(circuit_drawing, '__str__'):
                circuit_text = str(circuit_drawing)
            else:
                circuit_text = "Circuit visualization not available"
        except Exception as e:
            logger.error(f"Circuit drawing error: {str(e)}")
            circuit_text = f"Circuit for step {step} (drawing error: {str(e)})"
        
        return jsonify({
            'step': step,
            'circuit': circuit_text,
            'qubits': n_qubits,
            'depth': depth
        })
        
    except Exception as e:
        logger.error(f"Circuit generation error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/parameters', methods=['GET'])
def get_parameters():
    """Get available simulation parameters."""
    return jsonify({
        'qubits': {
            'min': 2,
            'max': 16,
            'default': 8,
            'description': 'Number of qubits in the simulation'
        },
        'depth': {
            'min': 1,
            'max': 10,
            'default': 4,
            'description': 'Scrambling circuit depth'
        },
        'shots': {
            'min': 100,
            'max': 10000,
            'default': 1024,
            'description': 'Number of measurement shots'
        }
    })

if __name__ == '__main__':
    logger.info("Starting Quantum Black Hole Simulator backend...")
    app.run(debug=True, host='0.0.0.0', port=5001) 