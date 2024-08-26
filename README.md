# VitaCare Web Application

## A Healthcare Management System

### Introduction

A healthcare patient management application that allows patients to easily register, book, and manage their appointments with doctors, featuring administrative tools for scheduling, confirming, and canceling appointments, along with SMS notifications, all built using Next.js.

### Tech Stack

- Next.js
- Appwrite
- Typescript
- TailwindCSS
- ShadCN
- Twilio

### Features

- Register as a Patient: Users can sign up and create a personal profile as a patient.

- Book a New Appointment with Doctor: Patients can schedule appointments with doctors at their convenience and can book multiple appointments.

- Manage Appointments on Admin Side: Administrators can efficiently view and handle all scheduled appointments.

- Confirm/Schedule Appointment from Admin Side: Admins can confirm and set appointment times to ensure they are properly scheduled.

- Cancel Appointment from Admin Side: Administrators have the ability to cancel any appointment as needed.

- Send SMS on Appointment Confirmation: Patients receive SMS notifications to confirm their appointment details.

- Complete Responsiveness: The application works seamlessly on all device types and screen sizes.

- File Upload Using Appwrite Storage: Users can upload and store files securely within the app using Appwrite storage services.

- Manage and Track Application Performance Using Sentry: The application uses Sentry to monitor and track its performance and detect any errors.

### Scripts and Installations

1. **Installation**

Install the project dependencies using npm:

```bash
npm install
```

2. **Set Up Environment Variables**

Create a new file named .env.local (or .env) in the root of your project and add the following content:

```bash
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=111111
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the Appwrite website.

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000` with your browser to see the result.

### Credits And Resources Used

Special thanks to [JavaScript Mastery tutorial](https://youtu.be/lEflo_sc82g?si=MDchCy41nSaV-J2P), which guided me to make this application.