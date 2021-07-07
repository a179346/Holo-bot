# Development Guide

## Requirements
- docker
- node >= v14

### 1. Copy `.env.example` into `.env`
- Change values for your environment

### 2. Install dependencies 
- In `server` directory 
```
npm install
```

### 3. Execute `docker-compose up`
- db & bot server is then up.

### 4. Run the migration
In `server` directory
- For macOS or Linux
```
npm run migration-run
```

- For windows
```
npm run migration-run-win
```

### 5. Time for coding!