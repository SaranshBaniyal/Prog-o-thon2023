#!/usr/bin/env bash
# Exit on error
set -o errexit

sudo apt-get install -y cmake

# Install Python dependencies
pip install -r requirements.txt

# Apply any outstanding database migrations
python manage.py migrate