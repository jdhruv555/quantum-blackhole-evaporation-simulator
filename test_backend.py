#!/usr/bin/env python3
"""
Test script for the quantum black-hole evaporation simulator backend.
"""

import requests
import json
import time

def test_backend():
    """Test the backend API endpoints."""
    
    base_url = "http://localhost:5000"
    
    print("🧪 Testing Quantum Black-Hole Simulator Backend")
    print("=" * 50)
    
    # Test health endpoint
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health check passed")
            print(f"   Status: {response.json()}")
        else:
            print("❌ Health check failed")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check failed: {e}")
        return False
    
    # Test parameters endpoint
    print("\n2. Testing parameters endpoint...")
    try:
        response = requests.get(f"{base_url}/parameters", timeout=5)
        if response.status_code == 200:
            params = response.json()
            print("✅ Parameters retrieved successfully")
            print(f"   Qubits range: {params['qubits']['min']}-{params['qubits']['max']}")
            print(f"   Depth range: {params['depth']['min']}-{params['depth']['max']}")
        else:
            print("❌ Parameters endpoint failed")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Parameters endpoint failed: {e}")
        return False
    
    # Test simulation endpoint
    print("\n3. Testing simulation endpoint...")
    simulation_params = {
        "qubits": 4,  # Small test case
        "depth": 2,
        "shots": 100
    }
    
    try:
        print("   Starting simulation...")
        start_time = time.time()
        
        response = requests.post(
            f"{base_url}/simulate",
            json=simulation_params,
            timeout=60  # Longer timeout for simulation
        )
        
        end_time = time.time()
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Simulation completed successfully")
            print(f"   Runtime: {end_time - start_time:.2f} seconds")
            print(f"   Page curve points: {len(result['pageCurve'])}")
            print(f"   Fidelity: {result['fidelity']:.3f}")
            print(f"   Parameters: {result['parameters']}")
        else:
            print(f"❌ Simulation failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Simulation failed: {e}")
        return False
    
    # Test circuit endpoint
    print("\n4. Testing circuit endpoint...")
    try:
        response = requests.get(
            f"{base_url}/circuit/2",
            params={"qubits": 4, "depth": 2},
            timeout=10
        )
        if response.status_code == 200:
            circuit_data = response.json()
            print("✅ Circuit retrieved successfully")
            print(f"   Step: {circuit_data['step']}")
            print(f"   Qubits: {circuit_data['qubits']}")
            print(f"   Circuit length: {len(circuit_data['circuit'])} characters")
        else:
            print("❌ Circuit endpoint failed")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Circuit endpoint failed: {e}")
        return False
    
    print("\n🎉 All tests passed! Backend is working correctly.")
    return True

if __name__ == "__main__":
    success = test_backend()
    if not success:
        print("\n❌ Some tests failed. Please check the backend server.")
        exit(1) 