/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('trainings').del()
  await knex('trainings').insert([
    {id: 1, name: 'Cyber Awareness Training', interval: 365, source: 'source', type_id: 2},
    {id: 2, name: 'Contilled Unclassified Information (CUI) Training', interval: 365, source: 'source', type_id: 2},
    {id: 3, name: 'Antiterrorism / Force Protection', interval: 730, source: 'source', type_id: 2},
    {id: 4, name: 'Security Training', interval: 365, source: 'source', type_id: 2},
    {id: 5, name: 'Comsec Training', interval: 365, source: 'source', type_id: 2},
    {id: 6, name: 'Emergency Action Plan Review', interval: 365, source: 'source', type_id: 2},
    {id: 7, name: 'Escort Training', interval: null, source: 'source', type_id: 2},
    {id: 8, name: 'SERE CBT', interval: null, source: 'source', type_id: 2},
    {id: 9, name: 'Sexual assaut prevention', interval: 365, source: 'source', type_id: 2},
    {id: 10, name: 'Suicide Awareness', interval: 365, source: 'source', type_id: 2},
    {id: 11, name: 'Self aid buddy Care', interval: null, source: 'source', type_id: 2},
    {id: 12, name: 'Insider Threat', interval: 365, source: 'source', type_id: 2},
    {id: 13, name: 'Primary Duty Certification', interval: null, source: 'source', type_id: 1},
    {id: 14, name: '5 Lvl CDCs', interval: null, source: 'source', type_id: 1},
    {id: 15, name: '7 Lvl CDCs', interval: null, source: 'source', type_id: 1},
    {id: 16, name: 'Supra Coder Academy', interval: null, source: 'source', type_id: 1},
    {id: 17, name: 'Weapons School', interval: null, source: 'source', type_id: 1},
    {id: 18, name: 'Air and Space Test Course', interval: null, source: 'source', type_id: 1},
    {id: 19, name: 'Airmen Leadership School', interval: null, source: 'source', type_id: 3},
    {id: 20, name: 'Non-Commisioned Officer Academy', interval: null, source: 'source', type_id: 3},
    {id: 21, name: 'Senior NCO Academy', interval: null, source: 'source', type_id: 3},
    {id: 22, name: 'Squadron Officer School', interval: null, source: 'source', type_id: 3},
    {id: 23, name: 'Comsec Responsible Officer Refresher', interval: null, source: 'source', type_id: 4},
    {id: 24, name: 'Unit Fitness Program Management Training', interval: 365, source: 'source', type_id: 4},
    {id: 25, name: 'Security Manager Assistant Training', interval: null, source: 'source', type_id: 4},
    {id: 26, name: 'Antiterrorism Officer Training', interval: null, source: 'source', type_id: 4},
    {id: 27, name: 'Unit Deployment Manager Training', interval: null, source: 'source', type_id: 4},
    {id: 28, name: 'Unit Training Manager Training', interval: null, source: 'source', type_id: 4},
  ]);
};
