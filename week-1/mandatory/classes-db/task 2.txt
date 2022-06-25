  CREATE TABLE public.mentors
(
    id integer,
    name char,
    years_lived_in_glasgow integer,
    address char,
    fpl char,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.mentors
    OWNER to postgres;




INSERT INTO public.mentors(
	id, name, years_lived_in_glasgow, address, fpl)
	VALUES (1, 'Arturo', 2, 'London 20', 'php'),
    (2, 'Yeray', 3, 'Spain 30', 'javascript'),
    (3, 'Ana', 4, 'Italy 78', 'r'),
    (4, 'Laura', 4, 'Germany 16', 'javascript'),
    (5, 'Raziel', 5, 'France 34', 'java');



    CREATE TABLE public.students
(
    id integer,
    name char,
    address char,
    graduated boolean,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.students
    OWNER to postgres;




    INSERT INTO public.students(
	id, name, address, graduated)
	VALUES (0,'Leandro','Asia 65','false'),
(1,'Alan','Albania 1','false'),
(2,'Leandro','Tirana 47','true'),
(3,'Jacinto','Asia 70','false'),
(4,'Arturo','Kabul 18','true'),
(5,'Ana','Berlín 54','true'),
(6,'Celeste','Albania 14','false'),
(7,'Jacinto','Angola 70','false'),
(8,'Celeste','Luanda 16','true'),
(9,'Edgardo','Barbuda 12','true'),
(10,'Arturo','Europa 90','false');


CREATE TABLE public.classes(
    id integer,
    hasMentor boolean,
    hasTopic char,
    dat date,
    location char,
     PRIMARY KEY (id)



);


ALTER TABLE IF EXISTS public.classes
    OWNER to postgres;


    INSERT INTO public.classes(
	id, hasmentor, hastopic, dat, location)
	VALUES (1, true, 'Node', '2022-05-06', 'London 20'),
    (2, false, 'javascript', '2022-07-10', 'France 34'),
    (3, true, 'React', '2022-08-16', 'Paris 45');


SELECT * FROM public.mentors WHERE years_lived_in_glasgow >= 5;

SELECT * FROM public.mentors WHERE fpl = 'javascript';

SELECT * FROM public.students WHERE graduated = true;


SELECT * FROM public.classes WHERE dat < '2022/05/01';

