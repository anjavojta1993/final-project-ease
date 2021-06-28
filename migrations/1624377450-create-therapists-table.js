// This is the description of the change
// to the database

exports.up = async function up(sql) {
  await sql`
CREATE TABLE therapists (
      id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
     	display_name varchar(100) NOT NULL,
			cost_per_hour varchar(3) NOT NULL,
			website_url varchar(300) NOT NULL,
			video_url varchar(300) NOT NULL,
			address_street varchar(300) NOT NULL,
			address_number varchar(10) NOT NULL,
			state varchar(20) NOT NULL,
			zip_code varchar(4) NOT NULL,
			user_id INT UNIQUE REFERENCES users (id)
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
