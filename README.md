# Prime Median Finder

This project is an Express server written in TypeScript that calculates and returns the median prime number(s) less than a given upper limit using the Sieve of Eratosthenes algorithm. It includes input validation using Zod and can be easily set up and run locally using Docker and Docker Compose.

## Prerequisites

Make sure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Setup

**Clone the repository:**

```sh
git clone https://github.com/gcrozariol/prime-median-nodejs.git
cd prime-median
```

<br />

**Build and run the project using Docker Compose:**

```sh
docker-compose up --build
```

<br />

**Access the server:**
Open your browser or use a tool like curl or Postman to test the route:

```sh
http://localhost:3000/median-primes/<input_number>
```

<br />

Replace `<input_number>` with any integer greater than 2. For example:

```sh
http://localhost:3000/median-primes/10
```

<br />

## Project Structure

- **Dockerfile**: Contains the Docker image build instructions.
- **docker-compose.yml**: Defines the services and configurations for Docker Compose.
- **server.ts**: The main server file containing the Express server setup, route, and logic to find the median prime numbers.
- **tsconfig.json**: TypeScript configuration file.
- **.dockerignore**: Specifies which files and directories to ignore when building the Docker image.

<br />

## Endpoint

- `GET /median-primes/:n`
  - **Description**: Returns the median prime number(s) less than the given upper limit n.
  - **Parameters**:
    - n (integer): The upper limit to find prime numbers less than this value.
  - **Response**:
    - **200 OK**: Returns a JSON object with the median prime number(s).
      - `{ "medianPrimes": [3, 5] }`
    - **400 Bad Request**: Returns an error message if the input is invalid.
      - `{ "error": "Invalid input, please provide an integer greater than 2" }`

<br />

## Notes

- The project uses the Sieve of Eratosthenes algorithm to efficiently find all prime numbers less than the given upper limit.
- Input validation is performed using Zod to ensure the input is an integer greater than 2.

<br />

## Troubleshooting

If you encounter issues with pulling the `node:18-alpine` image, ensure you have internet connectivity and Docker is running properly. You can also try using a different Node.js image tag, such as `node:18-slim`.

<br />

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for details.
