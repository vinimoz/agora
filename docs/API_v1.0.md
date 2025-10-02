<!--
  - SPDX-FileCopyrightText: 2025 Agora contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

# Agora API v1.0

⚠️ This documentation and the API are not final and may contain issues and bugs!  
Details may change!

## Authentication

To act as an authenticated user, use the `username:password@` prefix in the URL.  
Parameters in the request body override URL parameters.

**Base URL for all calls:**

```
/index.php/apps/agora
```

### Example calls

- Get all comments of inquiry no. 1

```bash
curl -u username:password -X GET https://nextcloud.local/index.php/apps/agora/api/v1.0/inquiry/1/comments
```

- Create a new inquiry

```bash
curl -u username:password -X POST https://nextcloud.local/index.php/apps/agora/api/v1.0/inquiry   -H "Content-Type: application/json;charset=utf-8"   -d '{"title": "New inquiry", "type": "proposal"}'
```

---

# Inquiry

## Default functions

| Method | Endpoint                      | Payload | Description            | Return codes       | Return value    |
| ------ | ----------------------------- | ------- | ---------------------- | ------------------ | --------------- |
| GET    | /api/v1.0/agora               | no      | Get array of inquiries | 200, 403, 404      | array           |
| GET    | /api/v1.0/inquiry/{inquiryId} | no      | Get inquiry by ID      | 200, 403, 404      | inquiry object  |
| POST   | /api/v1.0/inquiry             | yes     | Add new inquiry        | 201, 403, 404      | created inquiry |
| PUT    | /api/v1.0/inquiry/{inquiryId} | yes     | Update inquiry         | 200, 403, 404, 409 | updated inquiry |
| DELETE | /api/v1.0/inquiry/{inquiryId} | no      | Delete inquiry         | 200, 403, 404      | deleted inquiry |

## Special functions

| Method | Endpoint                             | Payload | Description               | Return codes  | Return value     |
| ------ | ------------------------------------ | ------- | ------------------------- | ------------- | ---------------- |
| POST   | /api/v1.0/inquiry/{inquiryId}/clone  | no      | Clone inquiry             | 201, 403, 404 | cloned inquiry   |
| POST   | /api/v1.0/inquiry/{inquiryId}/trash  | no      | Move to/remove from trash | 200, 403, 404 | updated inquiry  |
| GET    | /api/v1.0/enum/inquiry               | no      | Get valid inquiry types   | 200, 403, 404 | array            |
| PUT    | /api/v1.0/inquiry/{inquiryId}/close  | no      | Close inquiry             | 200, 403, 404 | closed inquiry   |
| PUT    | /api/v1.0/inquiry/{inquiryId}/reopen | no      | Reopen inquiry            | 200, 403, 404 | reopened inquiry |

## Valid payloads

### Add new inquiry

```json
{
  "type": "proposal",
  "title": "Inquiry Title",
  "description": "Optional description"
}
```

### Update inquiry

```json
{
  "inquiry": {
    "title": "Changed Title",
    "description": "Updated description",
    "expire": 0,
    "access": "private",
    "allowComment": true,
    "allowSuggestions": true,
    "showResults": "always"
  }
}
```

### Inquiry types

- `proposal`
- `debate`
- `project`
- `petition`
- `official_response`
- `suggestion`
- `grievance`

---

# Comments

| Method | Endpoint                               | Description                  | Return codes  |
| ------ | -------------------------------------- | ---------------------------- | ------------- |
| GET    | /api/v1.0/inquiry/{inquiryId}/comments | Get comments for inquiry     | 200, 403, 404 |
| POST   | /api/v1.0/comment                      | Add new comment with payload | 201, 403, 404 |
| DELETE | /api/v1.0/comment/{commentId}          | Delete comment               | 200, 403, 404 |

### Payload

```json
{
  "inquiryId": 1,
  "message": "Comment text"
}
```

---

# Suggestions

| Method | Endpoint                                  | Description                 | Return codes  |
| ------ | ----------------------------------------- | --------------------------- | ------------- |
| GET    | /api/v1.0/inquiry/{inquiryId}/suggestions | Get suggestions for inquiry | 200, 403, 404 |
| POST   | /api/v1.0/suggestion                      | Add new suggestion          | 201, 403, 404 |
| DELETE | /api/v1.0/suggestion/{suggestionId}       | Delete suggestion           | 200, 403, 404 |

### Payload

```json
{
  "inquiryId": 1,
  "message": "Suggestion text"
}
```

---

# Supports

| Method | Endpoint                               | Description                      | Return codes  |
| ------ | -------------------------------------- | -------------------------------- | ------------- |
| GET    | /api/v1.0/inquiry/{inquiryId}/supports | Get supports for inquiry         | 200, 403, 404 |
| PUT    | /api/v1.0/support/{supportId}          | Update support (e.g. add/remove) | 200, 403, 404 |
| DELETE | /api/v1.0/support/{supportId}          | Delete support                   | 200, 403, 404 |

### Payload

```json
{
  "inquiryId": 1,
  "userId": "username",
  "status": "supported"
}
```

---

# Attachments

| Method | Endpoint                                  | Description                 | Return codes  |
| ------ | ----------------------------------------- | --------------------------- | ------------- |
| GET    | /api/v1.0/inquiry/{inquiryId}/attachments | Get attachments for inquiry | 200, 403, 404 |
| POST   | /api/v1.0/attachment                      | Add a new attachment        | 201, 403, 404 |
| DELETE | /api/v1.0/attachment/{attachmentId}       | Delete attachment           | 200, 403, 404 |

### Payload (POST)

```json
{
  "inquiryId": 1,
  "filename": "document.pdf",
  "url": "https://nextcloud.local/s/xyz123"
}
```

---

# Shares

| Method | Endpoint                                   | Description                | Return codes  |
| ------ | ------------------------------------------ | -------------------------- | ------------- |
| GET    | /api/v1.0/inquiry/{inquiryId}/shares       | Get shares for inquiry     | 200, 403, 404 |
| POST   | /api/v1.0/inquiry/{inquiryId}/share/{type} | Add new share with payload | 201, 403, 404 |
| DELETE | /api/v1.0/share/{token}                    | Delete share               | 200, 404, 409 |

---

# Subscription

| Method | Endpoint                                   | Description          | Return codes |
| ------ | ------------------------------------------ | -------------------- | ------------ |
| GET    | /api/v1.0/inquiry/{inquiryId}/subscription | Get subscription     | 200, 403     |
| PUT    | /api/v1.0/inquiry/{inquiryId}/subscription | Subscribe to inquiry | 201, 403     |
| DELETE | /api/v1.0/inquiry/{inquiryId}/subscription | Unsubscribe          | 200, 403     |

---

# Notes

- `expire` uses a unix timestamp (0 = no expiration date).
- `access` can be `"open"` or `"private"`.
- `showResults`: `"always"`, `"never"`, `"closed"`.
- Only inquiry **configuration** fields are editable after creation.
