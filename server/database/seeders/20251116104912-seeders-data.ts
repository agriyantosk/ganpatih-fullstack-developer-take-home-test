import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const now = new Date();

    // Generate User IDs
    const user1 = uuidv4();
    const user2 = uuidv4();
    const user3 = uuidv4();

    // Hash passwords
    const johnPassword = await bcrypt.hash("john$123", 10);
    const maryPassword = await bcrypt.hash("mary$123", 10);
    const alexPassword = await bcrypt.hash("alex$123", 10);

    // Insert users
    await queryInterface.bulkInsert("users", [
      {
        id: user1,
        username: "john",
        password_hash: johnPassword,
        created_at: now,
        updated_at: now,
      },
      {
        id: user2,
        username: "mary",
        password_hash: maryPassword,
        created_at: now,
        updated_at: now,
      },
      {
        id: user3,
        username: "alex",
        password_hash: alexPassword,
        created_at: now,
        updated_at: now,
      },
    ]);

    // Posts
    await queryInterface.bulkInsert("posts", [
      {
        id: uuidv4(),
        user_id: user1,
        content: "Hello world! My first post.",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        user_id: user2,
        content: "Just joined the network!",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        user_id: user3,
        content: "Excited to be here 👋",
        created_at: now,
        updated_at: now,
      },
    ]);

    // Follows
    await queryInterface.bulkInsert("follows", [
      {
        follower_id: user1,
        followee_id: user2,
        created_at: now,
        updated_at: now,
      },
      {
        follower_id: user2,
        followee_id: user3,
        created_at: now,
        updated_at: now,
      },
      {
        follower_id: user3,
        followee_id: user1,
        created_at: now,
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("follows", {});
    await queryInterface.bulkDelete("posts", {});
    await queryInterface.bulkDelete("users", {});
  },
};
