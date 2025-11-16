import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("posts", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
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
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("posts");
  },
};
