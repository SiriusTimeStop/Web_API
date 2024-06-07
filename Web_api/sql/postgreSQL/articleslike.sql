

CREATE TABLE public.doglikes(
dogid int4,
userid int4,
CONSTRAINT NoDuplicateLike UNIQUE (dogid, userid)
);


CREATE TABLE public.favs(
dogid int4,
userid int4,
CONSTRAINT NoDuplicateFav UNIQUE (dogid, userid)
);

CREATE TABLE public.msgs(
dogid int4,
userid int4,
username varchar(16) NOT NULL, 
messagetxt text NULL,
dateregistered timestamp NOT NULL DEFAULT now(),
datemodified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

//in case of existing table
ALTER TABLE articleslikes
ADD CONSTRAINT NoDuplicateLike UNIQUE (articleid, userid);

//sql added to model function
ON CONFLICT ON CONSTRAINT  NoDuplicateLike  
DO NOTHING RETURNING userid
