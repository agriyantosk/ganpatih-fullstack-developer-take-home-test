import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const now = new Date();

    const usernames = [
      "john",
      "mary",
      "alex",
      "budi",
      "sarah",
      "kevin",
      "lisa",
    ];
    const users: any[] = [];

    for (const username of usernames) {
      users.push({
        id: uuidv4(),
        username,
        password_hash: await bcrypt.hash(username + "123$", 10),
        created_at: now,
        updated_at: now,
      });
    }

    await queryInterface.bulkInsert("users", users);

    const userIds = users.map((u) => u.id);

    const posts: any[] = [];

    const sampleSentences = [
      "Hello world 👋",
      "Beautiful day today!",
      "Learning full-stack development!",
      "Just posted my first update!",
      "Working on a new project 🚀",
      "Coffee makes coding better ☕",
      "Trying out Next.js and loving it!",
      "Random thought of the day...",
      "Feeling productive!",
    ];

    for (const user of users) {
      const numPosts = Math.floor(Math.random() * 3) + 3;

      for (let i = 0; i < numPosts; i++) {
        posts.push({
          id: uuidv4(),
          user_id: user.id,
          content:
            sampleSentences[Math.floor(Math.random() * sampleSentences.length)],
          created_at: now,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert("posts", posts);

    const follows: any[] = [];
    const followSet = new Set();

    for (const follower of userIds) {
      const numberOfFollowings = Math.floor(Math.random() * 4) + 2;

      for (let i = 0; i < numberOfFollowings; i++) {
        const followee = userIds[Math.floor(Math.random() * userIds.length)];
        if (followee === follower) continue;

        const key = `${follower}-${followee}`;
        if (followSet.has(key)) continue;

        followSet.add(key);

        follows.push({
          follower_id: follower,
          followee_id: followee,
          created_at: now,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert("follows", follows);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("follows", {});
    await queryInterface.bulkDelete("posts", {});
    await queryInterface.bulkDelete("users", {});
  },
};
