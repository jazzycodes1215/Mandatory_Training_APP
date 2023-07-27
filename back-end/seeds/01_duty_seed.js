/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('duties').del()
  await knex('duties').insert([
    {id: 1, title: 'Guardian'},
    {id: 2, title: 'Comsec Responsible Officer'},
    {id: 3, title: 'Unit Fitness Program Manager'},
    {id: 4, title: 'Security Manager Assistant'},
    {id: 5, title: 'Antiterrorism Officer'},
    {id: 6, title: 'Unit Deployment Manager'},
    {id: 7, title: 'Unit Training Manager'},
    {id: 8, title: 'Space Systems Operations'},
    {id: 9, title: 'All Source Intel'},
    {id: 10, title: 'Imagery Analyst / GEOINT'},
    {id: 11, title: 'ELINT Analyst (SIGINT)'},
    {id: 12, title: 'COMINT Analyst (SIGINT)'},
    {id: 13, title: 'Cyber Intel Analyst'},
    {id: 14, title: 'Analysis and Reporting (Fusion Analyst)'},
    {id: 15, title: 'Targeting Analyst'},
    {id: 16, title: 'Intelligence'},
    {id: 17, title: 'Cyber Ops - Network Ops'},
    {id: 18, title: 'Cyber Ops - System Ops'},
    {id: 19, title: 'Cyber Ops - RF Ops (SATCOM)'},
    {id: 20, title: 'Cyber Ops - Defensive Cyber Ops'},
    {id: 21, title: 'Software Development Ops (SFSC Agnostic)'}
  ]);
};
