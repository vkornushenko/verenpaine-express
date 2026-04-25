# Blood Pressure API Documentation

Base URL: `http://localhost:8080/api/v1`

---

## Authentication

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | User's name |
| email | string | Yes | Valid email address |
| password | string | Yes | Minimum 6 characters |

**Response (201):**

```json
{
  "data": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

---

### Login User

Authenticate user and receive session cookie.

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | Registered email |
| password | string | Yes | User password |

**Response (200):**

```json
{
  "data": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

**Cookies:**
- `token` - JWT session token (httpOnly, secure)

---

## Measurements

All measurement endpoints require authentication via cookie.

### Create Measurement

Record a new blood pressure reading.

**Endpoint:** `POST /measurements`

**Request Body:**

```json
{
  "date": "2024-01-15T10:30:00.000Z",
  "systolic": 120,
  "diastolic": 80,
  "pulse": 72
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| date | ISO 8601 | No | Date of measurement (defaults to now) |
| systolic | integer | Yes | Systolic pressure (mmHg) |
| diastolic | integer | Yes | Diastolic pressure (mmHg) |
| pulse | integer | Yes | Pulse rate (bpm) |

**Response (201):**

```json
{
  "data": {
    "user": "string",
    "date": "2024-01-15T10:30:00.000Z",
    "systolic": 120,
    "diastolic": 80,
    "pulse": 72,
    "_id": "string",
    "__v": 0
  }
}
```

---

### Get All Measurements

Retrieve all measurements for the authenticated user.

**Endpoint:** `GET /measurements`

**Auth:** Required (cookie)

**Response (200):**

```json
{
  "data": [
    {
      "user": "string",
      "date": "2024-01-15T10:30:00.000Z",
      "systolic": 120,
      "diastolic": 80,
      "pulse": 72,
      "_id": "string",
      "__v": 0
    }
  ]
}
```

---

### Get Measurement by ID

Retrieve a specific measurement (only if owned by authenticated user).

**Endpoint:** `GET /measurements/:id`

**Auth:** Required (cookie)

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Measurement ID |

**Response (200):**

```json
{
  "data": {
    "user": "string",
    "date": "2024-01-15T10:30:00.000Z",
    "systolic": 120,
    "diastolic": 80,
    "pulse": 72,
    "_id": "string",
    "__v": 0
  }
}
```

**Error Responses:**
- `404` - Measurement not found or not owned by user

---

## Error Responses

All endpoints may return errors in the following format:

```json
{
  "message": "Error description"
}
```

**Common Status Codes:**
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid or missing token)
- `404` - Not Found
- `500` - Internal Server Error