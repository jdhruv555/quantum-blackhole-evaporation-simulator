# Quantum Black-Hole Evaporation Simulator

An interactive web application for simulating Hawking radiation and black-hole evaporation using quantum circuits. This project implements a qubit-transport toy model that reproduces the Page curve and entanglement structure of evaporating black holes.

## 🚀 Features

- **Quantum Circuit Simulation**: Simulate Hawking radiation using Qiskit Aer
- **Interactive Page Curve**: Visualize entanglement entropy evolution during evaporation
- **Real-time Parameters**: Adjust qubit count, scrambling depth, and measurement shots
- **Circuit Visualization**: Explore quantum circuits for each emission step
- **IBM Quantum Ready**: Designed to run on IBM's quantum hardware
- **Modern UI**: Beautiful dark theme with Material-UI components

## 🏗️ Architecture

### Backend (Python/Flask)
- **Quantum Simulation**: Qiskit-based black-hole evaporation model
- **Circuit Generation**: Dynamic quantum circuit creation for each emission step
- **Entropy Calculation**: Rényi-2 entropy computation from measurement results
- **API Endpoints**: RESTful API for simulation and circuit data

### Frontend (React)
- **Interactive Controls**: Parameter adjustment with real-time feedback
- **Data Visualization**: Page curve plotting with Recharts
- **Circuit Display**: Quantum circuit diagrams for each step
- **Responsive Design**: Modern, mobile-friendly interface

## 🧮 Physics Background

The simulation implements a qubit-transport toy model for black-hole evaporation:

1. **Vacuum State**: Initialize Bell pairs representing vacuum fluctuations
2. **Black Hole**: Encode initial black-hole state on quantum register
3. **Scrambling**: Apply random unitary circuit for fast scrambling
4. **Emission**: Use swap gates to emit radiation qubit by qubit
5. **Measurement**: Compute Rényi-2 entropy of outgoing radiation

This reproduces the characteristic Page curve: entanglement rises during early evaporation, peaks at half-evaporation, then falls as information is recovered.

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

## 📊 Usage

1. **Adjust Parameters**: Use the sliders to set qubit count (2-16), scrambling depth (1-10), and measurement shots
2. **Run Simulation**: Click "Run Simulation" to start the quantum computation
3. **View Results**: Observe the Page curve showing entanglement entropy evolution
4. **Explore Circuits**: Click on emission steps to view the corresponding quantum circuits
5. **Analyze Quality**: Check the fidelity metric comparing to ideal Page curve

## 🔬 Technical Details

### Quantum Circuit Structure
- **Registers**: Black hole (q), infalling radiation (a), outgoing radiation (b)
- **Gates**: Hadamard, CNOT, RZ rotations, SWAP gates
- **Measurement**: Projective measurements on outgoing radiation qubits

### Entropy Calculation
- **Rényi-2 Entropy**: S₂ = -log(∑ᵢ pᵢ²)
- **Statistical Sampling**: Multiple measurement shots for accuracy
- **Error Mitigation**: Built-in error handling and validation

### Performance
- **Simulation Time**: Scales with qubit count and measurement shots
- **Memory Usage**: Efficient circuit representation and state management
- **Scalability**: Designed for both local simulation and cloud quantum hardware

## 🎯 Key Results

The simulator demonstrates:
- **Page Curve Reproduction**: Characteristic rise-peak-fall pattern
- **Information Recovery**: Gradual revelation of black-hole information
- **Quantum Scrambling**: Fast entanglement generation via random circuits
- **Hardware Verification**: Compatible with IBM Quantum devices

## 🔮 Future Extensions

- **AMPS Paradox**: Implementation of firewall paradox circuits
- **ER=EPR**: Einstein-Rosen bridge visualization
- **SYK Model**: Sachdev-Ye-Kitaev model integration
- **Larger Scale**: Extension to 16+ qubit simulations
- **Real Hardware**: Direct IBM Quantum execution
- **Error Mitigation**: Advanced error correction techniques

## 📚 References

- [Hawking Realized](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5260754) - First hardware-verified simulation
- [ArXiv 2505.23226](https://arxiv.org/abs/2505.23226) - Quantum-circuit model for black-hole evaporation
- [Qubit-Transport Toy Model](https://arxiv.org/pdf/2412.15180.pdf) - Theoretical foundation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- IBM Quantum for providing quantum computing resources
- Qiskit community for excellent quantum computing tools
- Theoretical physics community for foundational work on black-hole information paradox

---

**Note**: This is a research tool for exploring quantum information theory and black-hole physics. The simulations are educational and should not be interpreted as definitive physical predictions. 