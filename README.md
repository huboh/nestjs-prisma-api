# Nestjs Prisma Api

## Description

Rest Api built with `NestJs` (nodejs backend framework), utilizing several core Nestjs fundamentals, OOP & functional patterns

## Installation

- install nestjs cli globally

  ```bash
  npm install -g @nestjs/cli
  ```

- install dependencies

  ```bash
  npm install
  ```

## Running the app

- create `.env` from the example `.env.example` & fill every key

  ```bash
  cp .env.example .env
  ```

- run migrations & seeder script

  ```bash
  npm run db:migrate:dev
  ```

- start server

  ```bash
  npm run start
  ```

## Supported Routes & Methods

every response from the api meets the interface below. The `data` property on the response object is different based on the route.
in the case of a success response, the `error` property is undefined & error responses, the `data` property is undefined & the `error` property is set

```typescript
interface ServerResponse {
  statusCode: number
  message: string
  status: "error" | "success"
  error: Error | undefined
  data: undefined | object
}
```

### Public Routes

- Auth
  - `POST` -> `/api/auth/signup` : create new user account
    - Body

    ```typescript
    interface SignupCredentials {
      password: string
      email: string
      name: string
    }
    ```

    - Response: `201` status code for success

    ```typescript
    interface UserSignupResponse {
      statusCode: 201
      ...
      data: {
        authToken: string
        user: User
      }
    }
    ```

  - `POST` -> `/api/auth/login` : login user
    - Body

    ```typescript
    interface UserLoginCredentials {
      email: string
      password: string
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface UserLoginResponse {
      ...
      data: {
        authToken: string
        user: User
      }
    }
    ```

### Private Routes

- `USERS`
  - `GET` -> `/api/users/me` : Fetch the currently authenticated user
    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        me: User
      }
    }
    ```

  - `GET` -> `/api/users/{userId}` : Fetch a single user by its `userId`
    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        user: User
      }
    }
    ```

  - `GET` -> `/api/users/me/posts` : Fetch the currently authenticated user posts
    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        posts: Post[]
      }
    }
    ```

  - `PUT` -> `/api/users/me/update` : Update the currently authenticated user
    - Body: json that meets the interface below

    ```typescript
    interface UpdateUserBody {
      name: string;
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        user: User
      }
    }
    ```

  - `PUT` -> `/api/users/me/email` : Update the currently authenticated user email address
    - Body: json that meets the interface below

    ```typescript
    interface UpdateUserEmailBody {
      email: string; // new email address
      password: string; // current password for authentication 
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        user: User
      }
    }
    ```

  - `PUT` -> `/api/users/me/password` : Update the currently authenticated user email password
    - Body: json that meets the interface below

    ```typescript
    interface UpdateUserPasswordBody {
      newPassword: string;
      currentPassword: string;
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        user: User
      }
    }
    ```

  - `DELETE` -> `/api/users/me/delete` : Delete the currently authenticated user account
    - Body: json that meets the interface below

    ```typescript
    interface DeleteUserBody {
      password: string; // current user password
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        deleted: boolean
      }
    }
    ```

- `POSTS`
  - `GET` -> `/api/posts` : Fetch the currently authenticated user posts
    - accepts an optional query param `published`  -> `/api/posts?published=false`
    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        total: number
        posts: Post[]
      }
    }
    ```

  - `GET` -> `/api/posts/{postId}` : Fetch a single post by its `postId`
    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        post: Post
      }
    }
    ```

  - `POST` -> `/api/posts/new` : Create a new post for the currently authenticated user
    - Body: json that meets the interface below

    ```typescript
    interface NewPost {
      title: string
      content: string
      isPublished: boolean | undefined
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        post: Post
      }
    }
    ```

  - `PUT` -> `/api/posts/{postId}` : Update a post by its `postId`
    - Body: json that meets the interface below

    ```typescript
    interface UpdatePost {
      title: string
      content: string
      isPublished: boolean | undefined
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        post: Post
      }
    }
    ```

  - `DELETE` -> `/api/posts/{postId}` : Delete a post by its `postId`
    - Body: json that meets the interface below

    ```typescript
    interface DeletePost {
      postId: string
    }
    ```

    - Response: `200` status code for success

    ```typescript
    interface Response {
      ...
      data: {
        deleted: boolean
      }
    }
    ```

## License

This project is [MIT licensed](LICENSE).
