// models/todoModel.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Todo extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "todos",
    sequelize,
  }
);

export default Todo;
