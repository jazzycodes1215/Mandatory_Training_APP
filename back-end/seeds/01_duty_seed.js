/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('duties').del()
  await knex('duties').insert([
    {title: 'Guardian'},
    {title: 'Comsec Responsible Officer'},
    {title: 'Unit Fitness Program Manager'},
    {title: 'Security Manager Assistant'},
    {title: 'Antiterrorism Officer'},
    {title: 'Unit Deployment Manager'},
    {title: 'Unit Training Manager'},
    {title: 'Space Systems Operations'},
    {title: 'All Source Intel'},
    {title: 'Imagery Analyst / GEOINT'},
    {title: 'ELINT Analyst (SIGINT)'},
    {title: 'COMINT Analyst (SIGINT)'},
    {title: 'Cyber Intel Analyst'},
    {title: 'Analysis and Reporting (Fusion Analyst)'},
    {title: 'Targeting Analyst'},
    {title: 'Intelligence'},
    {title: 'Cyber Ops - Network Ops'},
    {title: 'Cyber Ops - System Ops'},
    {title: 'Cyber Ops - RF Ops (SATCOM)'},
    {title: 'Cyber Ops - Defensive Cyber Ops'},
    {title: 'Software Development Ops (SFSC Agnostic)'}
  ]);
};
