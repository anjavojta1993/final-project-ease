// This is the description of the change
// to the database

exports.up = async function up(sql) {
  await sql`
CREATE TABLE therapists (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
     	company_name varchar(100),
			cost_per_hour varchar(3),
			website_url varchar(300),
			video_url varchar(300),
			address_street varchar(300),
			address_number varchar(10),
			zip_code varchar(4),
			region varchar(20),
			user_id integer REFERENCES users (id) ON DELETE CASCADE
    )
  `;
};

// This is the description of the REVERSE
// of the change to the database

exports.down = async function down(sql) {
  await sql`
    DROP TABLE therapists
  `;
};
