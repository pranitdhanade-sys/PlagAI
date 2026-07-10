# ======================================================
# Stage 1 - Build Frontend
# ======================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Install frontend dependencies
COPY Frontend/package*.json ./
RUN npm install

# Copy frontend source
COPY Frontend/ .

# Build frontend
RUN npm run build


# ======================================================
# Stage 2 - Backend
# ======================================================
FROM node:20-alpine

WORKDIR /app/backend

ENV NODE_ENV=production
ENV PORT=8080

# Install backend dependencies
COPY Backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY Backend/ .

# Create directory for frontend
RUN mkdir -p public

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist/ ./public/

EXPOSE 8080

CMD ["npm", "start"]
