# PIB Press Release API

A Node.js API service that scrapes and delivers press releases from the Press Information Bureau (PIB) of India.

## Overview

This API fetches the latest press releases from the PIB website ([pib.gov.in](https://www.pib.gov.in/)) and returns them in a structured JSON format. The service provides an easy way to integrate PIB press releases into applications, dashboards, or news aggregators.

## Features

- Fetch latest press releases from PIB
- Structured JSON response with title, link, date, and ministry information
- Simple RESTful API design
- CORS enabled for cross-origin requests

## API Endpoints

### Health Check

```
GET /
```

Returns a status message to verify that the API is running.

**Response:**

```json
{
  "status": "OK",
  "message": "PIB Press Release API is running"
}
```

### Get Latest Press Releases

```
GET /api/latest
```

Fetches the latest press releases from the PIB website.

**Response:**

```json
{
  "success": true,
  "meta": {
    "count": 50,
    "source": "Press Information Bureau (PIB)",
    "url": "https://www.pib.gov.in/allrelease.aspx"
  },
  "data": [
    {
      "pressReleaseId": "1234567",
      "title": "Press Release Title",
      "detail": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1234567",
      "view": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1234567",
      "date": "07 MAY 2025 3:45PM",
      "ministry": "Ministry of Information and Broadcasting"
    },
    // More press releases...
  ]
}
```

## Error Handling

The API includes error handling middleware that returns 500 status codes for server errors:

```json
{
  "success": false,
  "error": "Failed to fetch latest press releases"
}
```

## License

[MIT](LICENSE)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Disclaimer

This API is not officially affiliated with the Press Information Bureau of India. It scrapes publicly available information from the PIB website. Use responsibly and in accordance with PIB's terms of service.