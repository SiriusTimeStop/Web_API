CREATE TABLE registerUsers (
	id serial,
	firstname varchar(32) NULL,
	lastname varchar(32) NULL,
	username varchar(16) NOT NULL,
	about text NULL,
	dateregistered timestamp NOT NULL DEFAULT now(),
	"password" varchar(32) NULL,
	passwordsalt varchar(16) NULL,
	email varchar(64) NOT NULL,
	avatarurl varchar(64) NULL,
  role text, 
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_username_key UNIQUE (username)
);



INSERT INTO registerUsers (username, email, password, role) VALUES
	('alice', 'alice@example.com', '123456', 'admin'),
	('bob', 'bob@example.com','123456', 'user'),
	('colin', 'colin@example.com','123456', 'user'),
	('cycheng', 'cycheng@example.com','654321', 'admin');
  

  CREATE TABLE locations (
	id serial,
	locationsdistrict varchar(16) NOT NULL,
	CONSTRAINT locations_pkey PRIMARY KEY (id)
);

INSERT INTO locations (locationsdistrict) VALUES
	('Kowloon Bay'),
	('Mong Kok'),
	('Sheung Wan'),
	('Tin Hau');


  CREATE TABLE dogDatabase (
	id serial,
	dogname varchar(32) NOT NULL,
	age int4 NOT NULL,
	breeds varchar(32) NOT NULL,
	summary text NULL,
	description text NULL,
	locationsid int4 NOT NULL,
	staffid int4 NOT NULL,
	imageurl varchar(2048) NULL,
	datecreated timestamp NOT NULL DEFAULT now(),
	datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT dogs_pkey PRIMARY KEY (id),
	CONSTRAINT dogsdistrict_fkey FOREIGN KEY (locationsid) REFERENCES locations (id) ,
	CONSTRAINT dogsstaff_fkey FOREIGN KEY (staffid) REFERENCES registerUsers (id)
);


CREATE TABLE public.dogs (
	id serial,
	dogname varchar(32) NOT NULL,
	maintext text NOT NULL,
	summary text NULL,
	datecreated timestamp NOT NULL DEFAULT now(),
	datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	imageurl varchar(2048) NULL,
	published bool NULL,
	locationid int4 NOT NULL,
	staffid int4 NULL,
	description text NULL,
	CONSTRAINT dogs_pkey PRIMARY KEY (id),
	CONSTRAINT fk_dogsLT FOREIGN KEY (locationid) REFERENCES locations (id),
  CONSTRAINT fk_dogs FOREIGN KEY (staffid) REFERENCES users (id)
  );

INSERT INTO dogs (dogname,maintext,locationid,,description) VALUES
('Lucky','Labrador Retriever', 1,"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/1200px-Labrador_on_Quantock_%282175262184%29.jpg")
INSERT INTO dogDatabase (dogname,age,breeds,locationsid,staffid,imageurl) VALUES
	('Lucky', 1, 'Labrador Retriever', 1, 1,"https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/1200px-Labrador_on_Quantock_%282175262184%29.jpg"),
	('Betty', 1, 'Bulldog', 2, 1,"https://image.cache.storm.mg/styles/smg-800xauto-er/s3/media/image/2016/07/29/20160729-050737_U720_M180408_180f.jpg?itok=tuFnZzxk"),
	('Sliver', 2, 'Chihuahua', 3, 4,"https://image1.thenewslens.com/2024/1/16h85k25sdwyhakoj4bl8ahja8yb5h.jpg?auto=compress&h=648&q=80&w=1080%201080w"),
	('Kings', 1, 'Pug', 4, 2,"https://dogsbestlife.com.tw/wp-content/uploads/2020/08/%E6%9C%AA%E5%91%BD%E5%90%8D%E8%A8%AD%E8%A8%88_31-1.jpeg");
