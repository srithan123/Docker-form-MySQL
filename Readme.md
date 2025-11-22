**Tourism Booking Form** project with Docker and MySQL:

```markdown
# Tourism Booking Form

A simple **Tourism Booking Form** web application that allows users to book tourism packages. This project uses **HTML** for the frontend, **MySQL** as the database, and **Docker** for containerized deployment.

---

## Features

- User-friendly booking form.
- Stores booking details in a MySQL database.
- Fully containerized with Docker and Docker Compose.
- Easy to set up and run on any system with Docker installed.

---

## Project Structure

```

tourism-booking/
├── frontend/
│   └── index.html          # HTML booking form
├── backend/
│   └── server.js           # Backend API (Node.js / Express)
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation

````

---

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Setup & Running the Project

1. **Start the application:**

```bash
docker-compose up -d
````

This will start the frontend, backend, and MySQL database containers.

2. **Access MySQL in the terminal:**

```bash
docker exec -it tourism-mysql mysql -u root -p
```

Enter the password: `srithan`

3. **Switch to the project database:**

```sql
USE tourism;
```

4. **View all tables:**

```sql
SHOW TABLES;
```

5. **View data in the `bookings` table:**

```sql
SELECT * FROM bookings;
```

6. **Stop and remove containers, networks, and volumes:**

```bash
docker-compose down -v
```

---

## Database Credentials

* **Database Name:** `tourism`
* **MySQL Username:** `root`
* **MySQL Password:** `srithan`

---

## Accessing the Application

* Open your browser and go to `http://localhost:3000` to access the booking form.
* Fill in the details and submit to store bookings in the database.

---

## License

This project is open-source and free to use.

```
