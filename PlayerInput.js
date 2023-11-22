import inquirer from "inquirer";

const getUserDirection = async () => {
  const results = await inquirer.prompt({
    type: "list",
    name: "direction",
    message: "Which direction",
    choices: ["Up", "Down", "Left", "Right"],
  });

  return results.direction;
};

export { getUserDirection };
