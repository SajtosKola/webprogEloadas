-- Kategória tábla (Elsődleges kulcs: nev)
CREATE TABLE kategoria (
                           nev VARCHAR(50) PRIMARY KEY,
                           ar INT NOT NULL
);

-- Pizza tábla (Elsődleges kulcs: nev, Idegen kulcs: kategorianev)
CREATE TABLE pizza (
                       nev VARCHAR(100) PRIMARY KEY,
                       kategorianev VARCHAR(50) NOT NULL,
                       vegetarianus BOOLEAN NOT NULL,
                       FOREIGN KEY (kategorianev) REFERENCES kategoria(nev)
);

-- Rendelés tábla (Elsődleges kulcs: id, Idegen kulcs: pizzanev)
CREATE TABLE rendeles (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          pizzanev VARCHAR(100) NOT NULL,
                          darab INT NOT NULL,
                          felvetel DATETIME NOT NULL,
                          kiszallitas DATETIME NOT NULL,
                          FOREIGN KEY (pizzanev) REFERENCES pizza(nev)
);

-- Kategóriák
INSERT INTO kategoria (nev, ar) VALUES
                                    ('apród', 850),
                                    ('főnemes', 950),
                                    ('király', 1250),
                                    ('lovag', 1150);

-- Pizzák
INSERT INTO pizza (nev, kategorianev, vegetarianus) VALUES
                                                        ('Áfonyás', 'király', 0),
                                                        ('Babos', 'lovag', 0),
                                                        ('Barbecue chicken', 'lovag', 0),
                                                        ('Betyáros', 'király', 0),
                                                        ('Caribi', 'apród', 0),
                                                        ('Country', 'király', 0),
                                                        ('Csabesz', 'király', 0),
                                                        ('Csupa sajt', 'lovag', 1),
                                                        ('Erdő kapitánya', 'apród', 0),
                                                        ('Erős János', 'lovag', 0),
                                                        ('Excellent', 'király', 0),
                                                        ('Főnök kedvence', 'lovag', 0),
                                                        ('Francia', 'főnemes', 0),
                                                        ('Frankfurti', 'király', 0),
                                                        ('Füstös', 'lovag', 0),
                                                        ('Gino', 'király', 0),
                                                        ('Gombás', 'apród', 1),
                                                        ('Góré', 'lovag', 0),
                                                        ('Görög', 'király', 0),
                                                        ('Gyros pizza', 'király', 0),
                                                        ('HamAndEggs', 'lovag', 0),
                                                        ('Hamm', 'lovag', 0),
                                                        ('Hawaii', 'főnemes', 0),
                                                        ('Hellas', 'király', 0),
                                                        ('Hercegnő', 'király', 0),
                                                        ('Ilike', 'lovag', 0),
                                                        ('Ínyenc', 'lovag', 0),
                                                        ('Jázmin álma', 'lovag', 0),
                                                        ('Jobbágy', 'király', 0),
                                                        ('Juhtúrós', 'lovag', 0),
                                                        ('Kagylós', 'király', 0),
                                                        ('Kétszínű', 'lovag', 0),
                                                        ('Kiadós', 'király', 0),
                                                        ('Király pizza', 'király', 0),
                                                        ('Kívánság', 'lovag', 1),
                                                        ('Kolbászos', 'apród', 0),
                                                        ('Lagúna', 'király', 1),
                                                        ('Lecsó', 'király', 0),
                                                        ('Maffiózó', 'lovag', 0),
                                                        ('Magvas', 'király', 1),
                                                        ('Magyaros', 'lovag', 0),
                                                        ('Máj Fair Lady', 'király', 0),
                                                        ('Mamma fia', 'király', 0),
                                                        ('Mexikói', 'főnemes', 0),
                                                        ('Mixi', 'főnemes', 1),
                                                        ('Nikó', 'király', 0),
                                                        ('Nordic', 'király', 0),
                                                        ('Nyuszó-Muszó', 'király', 0),
                                                        ('Pacalos', 'lovag', 0),
                                                        ('Pástétomos', 'király', 0),
                                                        ('Pásztor', 'lovag', 0),
                                                        ('Pipis', 'lovag', 0),
                                                        ('Popey', 'király', 0),
                                                        ('Quattro', 'király', 0),
                                                        ('Ráki', 'király', 0),
                                                        ('Rettenetes magyar', 'lovag', 0),
                                                        ('Röfi', 'király', 0),
                                                        ('Sajtos', 'apród', 1),
                                                        ('So-ku', 'apród', 0),
                                                        ('Son-go-ku', 'főnemes', 1),
                                                        ('Sonkás', 'apród', 0),
                                                        ('Spanyol', 'király', 0),
                                                        ('Spencer', 'főnemes', 0),
                                                        ('Szalámis', 'apród', 0),
                                                        ('Szardíniás', 'lovag', 0),
                                                        ('Szerzetes', 'király', 0),
                                                        ('Szőke kapitány', 'király', 0),
                                                        ('Tenger gyümölcsei', 'király', 0),
                                                        ('Tonhalas', 'lovag', 0),
                                                        ('Törperős', 'lovag', 0),
                                                        ('Tündi kedvence', 'király', 0),
                                                        ('Tüzes halál', 'király', 0),
                                                        ('Vega', 'lovag', 1),
                                                        ('Zöldike', 'főnemes', 1);

-- Rendelések
INSERT INTO rendeles (pizzanev, darab, felvetel, kiszallitas) VALUES
                                                                  ('Popey', 2, '2005-11-12 11:21:00', '2005-11-12 12:11:00'),
                                                                  ('Kagylós', 1, '2005-11-12 11:41:00', '2005-11-12 12:26:00'),
                                                                  ('Barbecue chicken', 1, '2005-11-12 12:38:00', '2005-11-12 13:02:00'),
                                                                  ('Röfi', 1, '2005-11-12 13:18:00', '2005-11-12 13:58:00'),
                                                                  ('Tündi kedvence', 1, '2005-11-12 13:44:00', '2005-11-12 16:53:00'),
                                                                  ('Hercegnő', 2, '2005-11-12 14:10:00', '2005-11-12 14:57:00'),
                                                                  ('Mixi', 1, '2005-11-12 14:20:00', '2005-11-12 16:25:00'),
                                                                  ('Ráki', 3, '2005-11-12 14:51:00', '2005-11-12 17:06:00'),
                                                                  ('Szőke kapitány', 1, '2005-11-12 15:13:00', '2005-11-12 17:12:00'),
                                                                  ('Kagylós', 1, '2005-11-12 15:42:00', '2005-11-12 16:48:00'),
                                                                  ('Sonkás', 1, '2005-11-12 16:31:00', '2005-11-12 16:53:00'),
                                                                  ('Excellent', 1, '2005-11-12 17:01:00', '2005-11-12 19:41:00'),
                                                                  ('Máj Fair Lady', 2, '2005-11-12 17:58:00', '2005-11-12 20:39:00'),
                                                                  ('Frankfurti', 1, '2005-11-12 18:48:00', '2005-11-12 21:45:00'),
                                                                  ('Pástétomos', 1, '2005-11-12 19:15:00', '2005-11-12 21:04:00'),
                                                                  ('Máj Fair Lady', 1, '2005-11-12 19:45:00', '2005-11-12 21:46:00'),
                                                                  ('Tüzes halál', 2, '2005-11-12 19:54:00', '2005-11-12 22:48:00'),
                                                                  ('Hellas', 1, '2005-11-12 20:25:00', '2005-11-12 23:15:00'),
                                                                  ('Lecsó', 1, '2005-11-12 21:21:00', '2005-11-13 00:31:00'),
                                                                  ('Mamma fia', 1, '2005-11-12 21:41:00', '2005-11-13 00:06:00');