# AussieEcoLense

AussieEcoLense is a cloud-based wildlife visual identification system designed for Australian wildlife observation records.

Users can upload wildlife images or videos. The system performs AI-based species recognition, stores uploaded media in Google Cloud Storage, and saves observation metadata in Firestore for future retrieval and management.

## Features

* Wildlife image recognition
* Wildlife video recognition through frame analysis
* Metadata storage in Firestore
* Original file and thumbnail storage in Google Cloud Storage
* Search observation records by species
* View all observation records
* Edit tags for existing records
* Delete observation records
* Cloud deployment on Google Cloud Platform

## Technology Stack

### Frontend

* React
* Vite
* Tailwind CSS

### Backend

* FastAPI
* Python

### Cloud Services

* Google Firestore
* Google Cloud Storage
* Google Cloud VM Instance

### AI Models

* SpeciesNet
* MegaDetector

## Requirements

* Python 3.10 or newer
* Node.js 20 or newer
* Google Cloud Firestore
* Google Cloud Storage

## Project Structure

```text
backend/
├── main.py
├── processing/
├── services/
├── models/
└── credentials/

frontend/
├── src/
└── dist/
```

## Backend Setup

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment:

Linux / macOS:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install required packages:

```bash
pip install -r requirements.txt
```

## Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Build the production frontend:

```bash
npm run build
```

## Running the Application

From the project root directory:

```bash
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

Open the application in a browser:

```text
http://<VM_EXTERNAL_IP>:8000
```

## API Overview

### Health Check

```http
GET /api
```

### Image Recognition

```http
POST /predict
```

### Video Recognition

```http
POST /predict-video
```

### Query Observation Records

```http
GET /query/all
```

```http
GET /query/species/{species_name}
```

### Edit Record Tags

```http
PATCH /files/{file_id}/tags
```

### Delete Observation Record

```http
DELETE /files/{file_id}
```

## Observation Record Management

The system provides complete CRUD (Create, Read, Update, Delete) functionality for wildlife observation records.

### Create

Users can upload wildlife images or videos. The AI recognition pipeline automatically generates metadata records and stores them in Firestore.

### Read

Users can search previous observation records by species name or retrieve all stored records.

### Update

Administrators can edit species tags associated with existing records.

### Delete

Administrators can permanently remove records from the system. This operation removes both the Firestore metadata and the corresponding files stored in Google Cloud Storage.

## Authentication

The system uses AWS Cognito for user authentication.

Supported authentication features:

- User sign-up
- Email verification
- User sign-in
- User sign-out
- Frontend access control

Users must sign in before accessing the wildlife observation system.

For deployment demonstration, the application can be accessed through an HTTPS tunnel such as ngrok because AWS Cognito requires HTTPS callback URLs for public deployments.

## Administrator Access

Administrative operations require an additional administrator key.
Administrator Key:

```text
FIT5225-2026
```

When an administrative operation is selected from the web interface, users will be prompted to enter the administrator key.

This lightweight permission mechanism was chosen for the coursework prototype to provide basic access control without introducing the complexity of a full authentication and user management system.

## Cloud Deployment

The application is deployed on a Google Cloud Virtual Machine.

### Cloud Services Used

#### Google Cloud Storage

Used to store:

* Uploaded wildlife images
* Uploaded wildlife videos
* Generated thumbnail images

#### Google Firestore

Used to store:

* File metadata
* Species tags
* Creation timestamps
* Storage URLs
* Checksums

#### Google Cloud VM

Used to host:

* React frontend
* FastAPI backend
* SpeciesNet model
* MegaDetector model

## Demonstration Workflow

1. Upload a wildlife image or video.
2. The AI model performs species recognition.
3. Metadata is stored in Firestore.
4. Files are uploaded to Google Cloud Storage.
5. Search observation records through the Wildlife Records panel.
6. Edit tags or delete records using administrator privileges.

## Notes

The repository does not include:

* SpeciesNet model weights
* MegaDetector model weights
* Google Cloud service account credentials

These files must be configured separately before deployment.

The administrator key included in this repository is provided solely for coursework demonstration and assessment purposes.
