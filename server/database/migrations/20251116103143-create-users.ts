import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("users", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("users");
  },
};
