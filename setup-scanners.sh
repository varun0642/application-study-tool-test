#!/bin/bash

# Install Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin v0.18.3

# Install Grype
curl -sSfL https://raw.githubusercontent.com/anchore/grype/main/install.sh | sh -s -- -b /usr/local/bin

# Install osv-scanner
go install github.com/google/osv-scanner/cmd/osv-scanner@latest

# Build test image
docker build -t localbuild/testimage:latest .

# Run scans
echo "Running Trivy scan..."
trivy fs --format sarif --output trivy-results.sarif .

echo "Running Grype scan..."
grype . --output sarif --file grype-results.sarif

echo "Running OSV scan..."
osv-scanner --format sarif . > osv-results.sarif

echo "Running Anchore scan..."
curl -s https://ci-tools.anchore.io/inline_scan-v0.10.0 | bash -s -- analyze -f sarif -b localbuild/testimage:latest
