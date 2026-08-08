# Blog API

A simple RESTful blog API built with Node.js, Express, and MongoDB using Mongoose.

## Features

- Create blog posts
- Fetch all blogs
- Fetch blogs by creator username
- Fetch blogs by keyword
- Health check endpoint

## Project Structure

- `server.js` - Main Express server and route handlers
- `blogData.js` - Mongoose blog model
- `package.json` - Project dependencies and scripts

## Requirements

- Node.js
- MongoDB database
- npm

## Installation

1. Clone the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and add your MongoDB connection URL:
   ```env
   MONGO_URL=your_mongodb_connection_string
   ```

## Run the Server

```bash
npm start
```

The server will start on:
```bash
http://localhost:3000
```

## API Endpoints

### Health Check
- `GET /health`

### Create a Blog
- `POST /api/create-blog`

Request body:
```json
{
  "title": "My First Blog",
  "creator": "john",
  "blog": "This is the blog content",
  "keywords": ["tech", "node"]
}
```

### Get All Blogs
- `GET /api/blogs`

### Get Blogs by Creator
- `GET /api/blog-of/:username`

Example:
```bash
GET /api/blog-of/john
```

### Get Blogs by Keyword
- `GET /api/blog/:keyword`

Example:
```bash
GET /api/blog/tech
```

## Notes

- Make sure your MongoDB server is running and accessible.
- The API uses `mongoose` with timestamps enabled for blog documents.
  

## Creator: Lavish Mehra

- If you see this repo a useful to help in increase your knowledge just drop a star⭐
- GitHub profile: https://github.com/Lavish09-Mehra
