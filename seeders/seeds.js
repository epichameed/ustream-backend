const { QueryTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    // Fetch all projects with their projectId and price
    const projects = await queryInterface.sequelize.query(
      `SELECT \`projectId\`, \`price\` FROM \`projects\`;`,
      { type: QueryTypes.SELECT }
    );

    for (const project of projects) {
      const { projectId, price } = project;

      // Fetch current total of all transactions for this project
      const transactionsSum = await queryInterface.sequelize.query(
        `SELECT SUM(\`amount\`) AS \`totalAmount\` FROM \`transactions\` WHERE \`projectId\` = :projectId;`,
        {
          type: QueryTypes.SELECT,
          replacements: { projectId },
        }
      );

      const totalAmount = transactionsSum[0].totalAmount || 0; // Handle null case

      const remainingAmount = price - totalAmount;

      if (remainingAmount > 0) {
        const newTransactionAmount = Math.floor(Math.random() * (remainingAmount * 0.7)) + 1;

        await queryInterface.sequelize.query(
          `UPDATE \`transactions\`
           SET \`amount\` = :newAmount
           WHERE \`projectId\` = :projectId
           ORDER BY \`transactionId\` ASC
           LIMIT 1;`,
          {
            type: QueryTypes.UPDATE,
            replacements: { newAmount: newTransactionAmount, projectId },
          }
        );
      }
    }
  },

  down: async (queryInterface) => {
    // Optionally, revert changes if needed
    // Reset the amounts to 0 or any other logic you'd want to apply
    await queryInterface.sequelize.query(
      `UPDATE \`transactions\` SET \`amount\` = 0;`
    );
  },
};
