module.exports = (sequelize, DataTypes) => {
  const UserPost = sequelize.define("UserPost", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return UserPost;
};
