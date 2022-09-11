import { v4 as genId } from "uuid";
import { User, Post, PrismaClient } from '@prisma/client';

export interface Data {
  users: any[]; // User[];
  posts: any[]; // Post[];
}

const prisma = new PrismaClient({});

const data: Data = {
  users: [
    {
      "name": "kyle reese",
      "email": "kyleReese@gmail.com",
      "userId": genId(),
      "isEmailVerified": true,
      "password": "dgsfvssgbeedf"
    },
    {
      "name": "sarah connor",
      "email": "sarahConnor@gmail.com",
      "userId": genId(),
      "isEmailVerified": true,
      "password": "uykfuljythcdkuc"
    },
  ],
  posts: [
    {
      "title": "How i defeated the terminator 😎",
      "postId": genId(),
      "content": "hello world",
      "isPublished": false,
      "authorId": 1,
    },
    {
      "title": "Why i hate time travellers 😎",
      "postId": genId(),
      "content": "hello world",
      "isPublished": false,
      "authorId": 2,
    }
  ]
};

async function main() {
  const [users, posts] = await Promise.all([
    Promise.all(data.users.map((user) => prisma.user.upsert({ // create dummy users
      where: { email: user.email },
      update: { userId: user.userId },
      create: user,
    }))),
    Promise.all(data.posts.map((post, i) => prisma.post.upsert({ // create dummy posts
      where: { id: i + 1 },
      update: { postId: post.postId },
      create: post,
    })))
  ]);

  console.log({ users, posts });
}

// execute the main function
main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());