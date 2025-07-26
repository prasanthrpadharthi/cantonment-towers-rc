# Community Portal Backend

This backend provides user authentication, image upload to Cloudinary, and admin image management for the Community Portal frontend.

## Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure `.env` with your MongoDB and Cloudinary credentials.
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints
- `POST /api/auth/login` — Admin login
- `POST /api/images/upload` — Upload image (JWT required)
- `GET /api/images` — List all images (JWT required)
- `PATCH /api/images/:id/status` — Approve/Reject image (JWT required)

## Integration
- Connect your frontend to these endpoints for authentication and image management.
