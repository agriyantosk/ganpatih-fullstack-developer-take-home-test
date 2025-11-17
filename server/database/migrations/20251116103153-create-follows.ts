import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("follows", {
      follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      followee_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: queryInterface.sequelize.literal("NOW()"),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: queryInterface.sequelize.literal("NOW()"),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addConstraint("follows", {
      fields: ["follower_id", "followee_id"],
      type: "unique",
      name: "unique_follower_followee",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("follows");
  },
};
