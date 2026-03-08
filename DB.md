## This document is used to describe the database schema of the application.

### Tables

- login: this table is used to store the login information of the employees. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null), 
email(VARCHAR(60), Unique, Not Null), 
password(VARCHAR(255), Not Null), 
role_id(INT, Not Null, Foreign Key -> role.id), 
employee_id(INT, Not Null, Foreign Key -> employee.id), 
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

- employee: this table is used to store the employee information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
name(VARCHAR(60), Not Null), 
email(VARCHAR(60), Unique, Not Null), 
position_id(INT, Not Null, Foreign Key -> position.id), 
business_unit_id(INT, Not Null, Foreign Key -> business_unit.id), 
leader_id(INT, Not Null, Foreign Key -> employee.id), 
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

- business_unit: this table is used to store the business unit information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
name(VARCHAR(30), Unique, Not Null), 
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

- role: this table is used to store the role information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
name(VARCHAR(15), Unique, Not Null), 
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

- project: this table is used to store the project information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
name(VARCHAR(60), Unique, Not Null), 
created_at(TIMESTAMP, Not Null).


- project_history: this table is used to store the project history information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment),
employee_id(INT, Not Null, Foreign Key -> employee.id),
project_id(INT, Not Null, Foreign Key -> project.id),
created_at(TIMESTAMP, Not Null).

- position: this table is used to store the position information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
name(VARCHAR(30), Unique, Not Null), 
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

- assessment: this table is used to store the assessment information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
employee_id(INT, Not Null, Foreign Key -> employee.id), 
project_id(INT, Not Null, Foreign Key -> project.id), 
year(INT, Not Null), 
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

- assessment_answers: this table is used to store the assessment history information. 
It uses a composite primary key (assessment_id, assessment_question_id).
It has the following columns: 
assessment_id(INT, Not Null, Foreign Key -> assessment.id),
assessment_question_id(INT, Not Null, Foreign Key -> assessment_questions.id),
employee_selection(INT),
leader_selection(INT),
leader_comment(text),
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).


- assessment_questions: this table is used to store the assessment options information. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
name(VARCHAR(30), Not Null), 
description(text, Not Null), 
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

- assessment_question_levels: this table is used to store the levels for each assessment question. It has the following columns: 
id(INT, Primary Key, Not Null, auto_increment), 
uuid(UUID, Unique, Not Null, Default -> uuid7()), 
assessment_question_id(INT, Not Null, Foreign Key -> assessment_questions.id), 
level(INT, Not Null), 
description(text, Not Null), 
label(VARCHAR(20), Not Null),
created_at(TIMESTAMP, Not Null), 
updated_at(TIMESTAMP, Not Null).

