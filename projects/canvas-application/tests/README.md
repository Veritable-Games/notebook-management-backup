# VG-Canvas Testing Environment

This directory contains tools for testing VG-Canvas, particularly the collaborative drawing features.

## Overview

The testing environment provides various scripts to test VG-Canvas collaboration capabilities:

- Simple testing with multiple clients
- Load testing with many simulated clients
- Performance monitoring

## Prerequisites

Before running the tests, ensure you have the following installed:

- Node.js 16+ and npm
- Socket.io and Socket.io-client
- uuid package

You can install the required dependencies with:

```bash
npm install socket.io socket.io-client uuid express cors
```

## Quick Start

### Simple Testing

To run basic collaboration tests with 3 clients:

```bash
./tests/simple-test.sh
```

This will:
- Start a WebSocket server on port 5000
- Start 3 test clients that join the same room
- Exchange drawing updates between clients
- Show logs from all components
- Run for 30 seconds and then automatically stop

### Load Testing

To run load tests with many simulated clients:

```bash
./tests/load-test.sh -c 20 -d 30 -i 1000
```

Parameters:
- `-c` Number of clients (default: 20)
- `-d` Test duration in seconds (default: 30)
- `-i` Update interval in milliseconds (default: 1000)

The load test will:
- Start a WebSocket server on port 5000
- Create the specified number of simulated clients
- Generate drawing updates at the specified interval
- Monitor server performance
- Provide a summary report at the end

## Understanding Test Results

### Simple Test Results

The simple test will show logs from the server and all clients, demonstrating:
- Client connections
- Room creation and joining
- Exchange of drawing updates
- Message routing between clients

### Load Test Results

The load test will provide performance metrics including:
- Updates sent per second
- Updates received per second
- CPU and memory usage of the server
- Overall throughput statistics

## Troubleshooting

### Common Issues

**Port conflicts**: If you have a service already using port 5000, the tests will fail to start. Stop any existing services on that port before running tests.

**Memory issues**: When running tests with many clients, you may encounter memory limitations. Reduce the number of clients or increase the update interval.

## Extending the Tests

To create custom tests:

1. Examine the existing test scripts
2. Modify the client behavior in `simple-client.js` or `load-client.js`
3. Create new test scenarios based on the existing templates

## Performance Optimization

Based on load testing results, you can optimize the server by:

1. Adjusting the room size limits
2. Implementing rate limits for updates
3. Optimizing the data structures used for scene representation
4. Adding compression for scene updates