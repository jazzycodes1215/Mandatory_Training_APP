/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('trainings').del()
  await knex('trainings').insert([
    {name: 'Cyber Awareness Training', interval: 365, source: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=12980', type_id: 2},
    {name: 'Contilled Unclassified Information (CUI) Training', interval: 365, source: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=11998', type_id: 2},
    {name: 'Antiterrorism / Force Protection', interval: 730, source: 'https://lms-jets.cce.af.mil/moodle/my/', type_id: 2},
    {name: 'Security Training', interval: 365, source: 'SEE SECURITY MANAGER', type_id: 2},
    {name: 'Comsec Training', interval: 365, source: 'SEE COMSEC RESPONSIBLE OFFICER', type_id: 2},
    {name: 'Emergency Action Plan Review', interval: 365, source: 'SEE COMSEC RESPONSIBLE OFFICER', type_id: 2},
    {name: 'Escort Training', interval: 365, source: 'SEE SECURITY MANAGER', type_id: 2},
    {name: 'SERE CBT', interval: null, source: 'https://lms-jets.cce.af.mil/moodle/course/view.php?id=12611', type_id: 2},
    {name: 'Sexual assaut prevention', interval: 365, source: 'SEE SAPR POC', type_id: 2},
    {name: 'Suicide Awareness', interval: 365, source: 'SEE SUICIDE PREVENTION POC', type_id: 2},
    {name: 'Self aid buddy Care', interval: null, source: 'SEE MEDICAL POC', type_id: 2},
    {name: 'Insider Threat', interval: 365, source: 'https://securityawareness.usalearning.gov/itawareness/index.htm', type_id: 2},
    {name: 'Primary Duty Certification', interval: null, source: 'TECHNICAL TRAINING', type_id: 1},
    {name: '5 Lvl CDCs', interval: null, source: 'SEE TRAINING MANAGER', type_id: 1},
    {name: '7 Lvl CDCs', interval: null, source: 'SEE TRAINING MANAGER', type_id: 1},
    {name: 'Supra Coder Academy', interval: null, source: 'SEE UNIT TRAINING MANAGER', type_id: 1},
    {name: 'Weapons School', interval: null, source: 'SEE UNIT TRAINING MANAGER', type_id: 1},
    {name: 'Air and Space Test Course', interval: null, source: 'SEE UNIT TRAINING MANAGER', type_id: 1},
    {name: 'Airmen Leadership School', interval: null, source: 'SEE UNIT TRAINING MANAGER', type_id: 3},
    {name: 'Non-Commisioned Officer Academy', interval: null, source: 'SEE UNIT TRAINING MANAGER', type_id: 3},
    {name: 'Senior NCO Academy', interval: null, source: 'SEE UNIT TRAINING MANAGER', type_id: 3},
    {name: 'Squadron Officer School', interval: null, source: 'SEE UNIT TRAINING MANAGER', type_id: 3},
    {name: 'Comsec Responsible Officer Refresher', interval: null, source: 'SEE COMSEC MANAGER', type_id: 4},
    {name: 'Unit Fitness Program Management Training', interval: 365, source: 'SEE UNIT FITNESS ASSESSMETNT CELL', type_id: 4},
    {name: 'Security Manager Assistant Training', interval: null, source: 'SEE SECURITY MANAGER', type_id: 4},
    {name: 'Antiterrorism Officer Training', interval: null, source: 'SEE SECURITY MANAGER', type_id: 4},
    {name: 'Unit Deployment Manager Training', interval: null, source: 'SEE UNIT DEPLOYMENT MANAGER', type_id: 4},
    {name: 'Unit Training Manager Training', interval: null, source: 'SEE TRAINING MANAGER', type_id: 4},
  ]);
};
