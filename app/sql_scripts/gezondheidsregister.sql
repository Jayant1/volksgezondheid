-- PostgreSQL dump converted from MariaDB
-- Host: localhost    Database: gezondheidsregister
-- ------------------------------------------------------
-- Server version	PostgreSQL

-- =============================================
-- DROP TABLES IN REVERSE ORDER (for dependencies)
-- =============================================
DROP TABLE IF EXISTS consultaties CASCADE;
DROP TABLE IF EXISTS medische_keuringen CASCADE;
DROP TABLE IF EXISTS patienten CASCADE;
DROP TABLE IF EXISTS zorginstellingen CASCADE;
DROP TABLE IF EXISTS wijken CASCADE;
DROP TABLE IF EXISTS zorgverleners CASCADE;
DROP TABLE IF EXISTS distrikten CASCADE;
DROP TABLE IF EXISTS landen CASCADE;

-- =============================================
-- DROP ENUM TYPES IF EXIST
-- =============================================
DROP TYPE IF EXISTS bloedgroep_type CASCADE;
DROP TYPE IF EXISTS rhesus_factor_type CASCADE;
DROP TYPE IF EXISTS keuring_type_enum CASCADE;
DROP TYPE IF EXISTS uitslag_enum CASCADE;
DROP TYPE IF EXISTS instelling_type_enum CASCADE;
DROP TYPE IF EXISTS zorgverlener_type_enum CASCADE;

-- =============================================
-- CREATE ENUM TYPES
-- =============================================
CREATE TYPE bloedgroep_type AS ENUM ('A', 'B', 'AB', 'O', 'onbekend');
CREATE TYPE rhesus_factor_type AS ENUM ('+', '-', 'onbekend');
CREATE TYPE keuring_type_enum AS ENUM ('rijbewijs', 'werk', 'school', 'sport', 'andere');
CREATE TYPE uitslag_enum AS ENUM ('goedgekeurd', 'afgekeurd', 'onder_voorwaarden');
CREATE TYPE instelling_type_enum AS ENUM ('ziekenhuis', 'kliniek', 'polikliniek', 'gezondheidscentrum', 'apotheek', 'laboratorium', 'andere');
CREATE TYPE zorgverlener_type_enum AS ENUM ('huisarts', 'specialist', 'verpleegkundige', 'tandarts', 'apotheker', 'fysiotherapeut', 'andere');

-- =============================================
-- CREATE TABLES IN CORRECT ORDER (base tables first)
-- =============================================

--
-- Table structure for table `landen` (no FK dependencies)
--
CREATE TABLE landen (
  id SERIAL PRIMARY KEY,
  land_code VARCHAR(3) NOT NULL,
  landnaam VARCHAR(100) NOT NULL,
  UNIQUE (land_code)
);

--
-- Table structure for table `distrikten` (no FK dependencies)
--
CREATE TABLE distrikten (
  id SERIAL PRIMARY KEY,
  distrikt_code VARCHAR(10) NOT NULL,
  distriktnaam VARCHAR(100) NOT NULL,
  UNIQUE (distrikt_code)
);

--
-- Table structure for table `wijken` (FK: distrikten)
--
CREATE TABLE wijken (
  id SERIAL PRIMARY KEY,
  distrikten_id INTEGER NOT NULL,
  wijk_code VARCHAR(10) NOT NULL,
  wijknaam VARCHAR(100) NOT NULL,
  UNIQUE (wijk_code),
  CONSTRAINT fk_wijken_distrikten FOREIGN KEY (distrikten_id) REFERENCES distrikten (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX idx_wijken_distrikten_id ON wijken (distrikten_id);

--
-- Table structure for table `zorgverleners` (no FK dependencies)
--
CREATE TABLE zorgverleners (
  id SERIAL PRIMARY KEY,
  identificatienummer VARCHAR(20) NOT NULL,
  registratie_nummer VARCHAR(20) NOT NULL,
  specialisatie VARCHAR(100) DEFAULT NULL,
  type_zorgverlener zorgverlener_type_enum NOT NULL,
  praktijk_naam VARCHAR(200) DEFAULT NULL,
  telefoon VARCHAR(20) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL,
  is_actief BOOLEAN DEFAULT TRUE,
  ingevoerd_door VARCHAR(100) DEFAULT NULL,
  gewijzigd_door VARCHAR(100) DEFAULT NULL,
  datum_ingevoerd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datum_gewijzigd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (identificatienummer),
  UNIQUE (registratie_nummer)
);

CREATE INDEX idx_zorgverlener_identificatie ON zorgverleners (identificatienummer);
CREATE INDEX idx_zorgverlener_registratie ON zorgverleners (registratie_nummer);
CREATE INDEX idx_zorgverlener_type ON zorgverleners (type_zorgverlener);

--
-- Table structure for table `zorginstellingen` (FK: distrikten, wijken)
--
CREATE TABLE zorginstellingen (
  id SERIAL PRIMARY KEY,
  naam VARCHAR(200) NOT NULL,
  type_instelling instelling_type_enum NOT NULL,
  adres VARCHAR(200) NOT NULL,
  distrikten_id INTEGER NOT NULL,
  wijken_id INTEGER DEFAULT NULL,
  telefoon VARCHAR(20) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL,
  ingevoerd_door VARCHAR(100) DEFAULT NULL,
  gewijzigd_door VARCHAR(100) DEFAULT NULL,
  datum_ingevoerd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datum_gewijzigd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_zorginstelling_distrikten FOREIGN KEY (distrikten_id) REFERENCES distrikten (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_zorginstelling_wijken FOREIGN KEY (wijken_id) REFERENCES wijken (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_zorginstelling_wijken_id ON zorginstellingen (wijken_id);
CREATE INDEX idx_zorginstelling_distrikten ON zorginstellingen (distrikten_id);
CREATE INDEX idx_zorginstelling_type ON zorginstellingen (type_instelling);

--
-- Table structure for table `patienten` (FK: zorgverleners)
--
CREATE TABLE patienten (
  id SERIAL PRIMARY KEY,
  identificatienummer VARCHAR(20) NOT NULL,
  bloedgroep bloedgroep_type DEFAULT 'onbekend',
  rhesus_factor rhesus_factor_type DEFAULT 'onbekend',
  huisarts_zorgverleners_id INTEGER DEFAULT NULL,
  notities TEXT DEFAULT NULL,
  ingevoerd_door VARCHAR(100) DEFAULT NULL,
  gewijzigd_door VARCHAR(100) DEFAULT NULL,
  datum_ingevoerd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datum_gewijzigd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (identificatienummer),
  CONSTRAINT fk_patienten_huisarts FOREIGN KEY (huisarts_zorgverleners_id) REFERENCES zorgverleners (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_patienten_identificatie ON patienten (identificatienummer);
CREATE INDEX idx_patienten_huisarts ON patienten (huisarts_zorgverleners_id);

--
-- Table structure for table `medische_keuringen` (FK: patienten, zorgverleners)
--
CREATE TABLE medische_keuringen (
  id SERIAL PRIMARY KEY,
  patienten_id INTEGER NOT NULL,
  keuring_type keuring_type_enum NOT NULL,
  datum_keuring DATE NOT NULL,
  zorgverleners_id INTEGER NOT NULL,
  uitslag uitslag_enum NOT NULL,
  beperkingen TEXT DEFAULT NULL,
  datum_geldig_tot DATE DEFAULT NULL,
  notities TEXT DEFAULT NULL,
  ingevoerd_door VARCHAR(100) DEFAULT NULL,
  gewijzigd_door VARCHAR(100) DEFAULT NULL,
  datum_ingevoerd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datum_gewijzigd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_keuring_patienten FOREIGN KEY (patienten_id) REFERENCES patienten (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_keuring_zorgverleners FOREIGN KEY (zorgverleners_id) REFERENCES zorgverleners (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE INDEX idx_keuring_patienten ON medische_keuringen (patienten_id);
CREATE INDEX idx_keuring_zorgverleners ON medische_keuringen (zorgverleners_id);
CREATE INDEX idx_keuring_datum ON medische_keuringen (datum_keuring);

--
-- Table structure for table `consultaties` (FK: patienten, zorgverleners, zorginstellingen)
--
CREATE TABLE consultaties (
  id SERIAL PRIMARY KEY,
  patienten_id INTEGER NOT NULL,
  zorgverleners_id INTEGER NOT NULL,
  zorginstellingen_id INTEGER DEFAULT NULL,
  datum_consultatie DATE NOT NULL,
  reden_bezoek VARCHAR(200) DEFAULT NULL,
  diagnose TEXT DEFAULT NULL,
  behandeling TEXT DEFAULT NULL,
  verwezen_naar VARCHAR(200) DEFAULT NULL,
  datum_vervolgafspraak DATE DEFAULT NULL,
  notities TEXT DEFAULT NULL,
  ingevoerd_door VARCHAR(100) DEFAULT NULL,
  gewijzigd_door VARCHAR(100) DEFAULT NULL,
  datum_ingevoerd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datum_gewijzigd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_consult_patienten FOREIGN KEY (patienten_id) REFERENCES patienten (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_consult_zorgverleners FOREIGN KEY (zorgverleners_id) REFERENCES zorgverleners (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_consult_zorginstellingen FOREIGN KEY (zorginstellingen_id) REFERENCES zorginstellingen (id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX idx_consult_patienten ON consultaties (patienten_id);
CREATE INDEX idx_consult_zorgverleners ON consultaties (zorgverleners_id);
CREATE INDEX idx_consult_zorginstellingen ON consultaties (zorginstellingen_id);
CREATE INDEX idx_consult_datum ON consultaties (datum_consultatie);

-- =============================================
-- TRIGGER FOR AUTO-UPDATE datum_gewijzigd
-- =============================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.datum_gewijzigd = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_patienten_modtime BEFORE UPDATE ON patienten FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_zorgverleners_modtime BEFORE UPDATE ON zorgverleners FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_zorginstellingen_modtime BEFORE UPDATE ON zorginstellingen FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_medische_keuringen_modtime BEFORE UPDATE ON medische_keuringen FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_consultaties_modtime BEFORE UPDATE ON consultaties FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- =============================================
-- INSERT SAMPLE DATA
-- =============================================

-- Insert sample distrikten
INSERT INTO distrikten (distrikt_code, distriktnaam) VALUES
('PAR', 'Paramaribo'),
('WAA', 'Wanica'),
('NIC', 'Nickerie');

-- Insert sample wijken
INSERT INTO wijken (distrikten_id, wijk_code, wijknaam) VALUES
(1, 'CTR', 'Centrum'),
(1, 'FLO', 'Flora'),
(2, 'LEL', 'Lelydorp');

-- Insert sample zorgverleners
INSERT INTO zorgverleners (identificatienummer, registratie_nummer, specialisatie, type_zorgverlener, praktijk_naam, telefoon, email, is_actief, ingevoerd_door) VALUES
('ZV001234', 'REG001234', 'Huisartsgeneeskunde', 'huisarts', 'Huisartsenpraktijk Centrum', '+597 420001', 'huisarts.centrum@health.sr', TRUE, 'system'),
('ZV005678', 'REG005678', 'Interne Geneeskunde', 'specialist', 'Academisch Ziekenhuis Paramaribo', '+597 420002', 'internist@azp.sr', TRUE, 'system');

-- Insert sample zorginstellingen
INSERT INTO zorginstellingen (naam, type_instelling, adres, distrikten_id, wijken_id, telefoon, email, ingevoerd_door) VALUES
('Academisch Ziekenhuis Paramaribo', 'ziekenhuis', 'Flustraat 1', 1, 1, '+597 442222', 'info@azp.sr', 'system'),
('Gezondheidscentrum Flora', 'gezondheidscentrum', 'Floraweg 25', 1, 2, '+597 433333', 'info@gcflora.sr', 'system');

-- Insert 16 patienten with the specified identificatienummers
INSERT INTO patienten (identificatienummer, bloedgroep, rhesus_factor, huisarts_zorgverleners_id, notities, ingevoerd_door) VALUES
('IC001985', 'A', '+', 1, 'Patient in goede gezondheid', 'system'),
('IC002310', 'B', '+', 1, 'Geen bijzonderheden', 'system'),
('IC003874', 'O', '-', 1, 'Astma patiënt', 'system'),
('IC004561', 'AB', '+', 1, 'Hoge bloeddruk', 'system'),
('IC005101', 'A', '-', 1, 'Geen bijzonderheden', 'system'),
('IC005202', 'B', '-', 1, 'Allergisch voor noten', 'system'),
('IC005303', 'O', '+', 1, 'Geen bijzonderheden', 'system'),
('IC007890', 'B', '-', 1, 'Allergisch voor penicilline', 'system'),
('IC008123', 'A', '+', 1, 'Hartpatiënt', 'system'),
('IC009456', 'AB', '-', 1, 'Geen bijzonderheden', 'system'),
('IC010001', 'O', '+', 1, 'Geen bijzonderheden', 'system'),
('IC010002', 'A', '+', 1, 'Diabetespatiënt type 1', 'system'),
('IC010003', 'B', '+', 1, 'Geen bijzonderheden', 'system'),
('IC010004', 'O', '-', 1, 'Epilepsie patiënt', 'system'),
('IC010005', 'AB', '+', 1, 'Geen bijzonderheden', 'system'),
('IC010006', 'A', '-', 1, 'Nierpatiënt', 'system');

-- Insert sample medische keuringen for some patients
INSERT INTO medische_keuringen (patienten_id, keuring_type, datum_keuring, zorgverleners_id, uitslag, beperkingen, datum_geldig_tot, notities, ingevoerd_door) VALUES
(1, 'rijbewijs', '2026-01-15', 1, 'goedgekeurd', NULL, '2031-01-15', 'Rijbewijskeuring zonder beperkingen', 'system'),
(2, 'werk', '2026-01-20', 1, 'goedgekeurd', NULL, '2027-01-20', 'Werkkeuring goedgekeurd', 'system'),
(3, 'rijbewijs', '2026-01-25', 1, 'onder_voorwaarden', 'Moet astmamedicatie bij zich hebben', '2028-01-25', 'Rijbewijskeuring met voorwaarden', 'system'),
(4, 'werk', '2026-02-01', 1, 'onder_voorwaarden', 'Geen zware fysieke arbeid', '2027-02-01', 'Werkkeuring met beperkingen vanwege hoge bloeddruk', 'system'),
(8, 'rijbewijs', '2026-02-05', 1, 'goedgekeurd', NULL, '2031-02-05', 'Rijbewijskeuring zonder beperkingen', 'system'),
(9, 'werk', '2026-02-10', 2, 'onder_voorwaarden', 'Regelmatige hartcontrole vereist', '2027-02-10', 'Werkkeuring met voorwaarden vanwege hartaandoening', 'system'),
(12, 'rijbewijs', '2026-02-15', 1, 'goedgekeurd', NULL, '2028-02-15', 'Rijbewijskeuring met verkorte geldigheid vanwege diabetes', 'system'),
(14, 'rijbewijs', '2026-02-20', 1, 'afgekeurd', 'Epilepsie niet onder controle', NULL, 'Rijbewijskeuring afgekeurd', 'system');

-- Insert sample consultaties
INSERT INTO consultaties (patienten_id, zorgverleners_id, zorginstellingen_id, datum_consultatie, reden_bezoek, diagnose, behandeling, notities, ingevoerd_door) VALUES
(1, 1, 2, '2026-01-10', 'Jaarlijkse controle', 'Geen bijzonderheden', 'Geen behandeling nodig', 'Patiënt is in goede gezondheid', 'system'),
(3, 1, 2, '2026-01-15', 'Astma controle', 'Astma stabiel', 'Voortzetting inhalatiemedicatie', 'Longfunctie goed', 'system'),
(4, 2, 1, '2026-01-20', 'Bloeddruk controle', 'Hypertensie graad 1', 'Bloeddrukverlagers voorgeschreven', 'Leefstijladviezen gegeven', 'system'),
(8, 1, 2, '2026-02-01', 'Jaarlijkse controle', 'Geen bijzonderheden', 'Geen behandeling nodig', 'Patiënt is in goede gezondheid', 'system'),
(9, 2, 1, '2026-02-05', 'Hartcontrole', 'Stabiele angina pectoris', 'Medicatie aangepast', 'ECG normaal', 'system'),
(12, 1, 2, '2026-02-10', 'Diabetescontrole', 'Diabetes type 1 stabiel', 'Insuline dosering aangepast', 'HbA1c waarde: 7.2%', 'system'),
(14, 2, 1, '2026-02-15', 'Epilepsie controle', 'Epilepsie niet goed onder controle', 'Medicatie aangepast', 'Aanvallen frequentie verhoogd', 'system'),
(16, 2, 1, '2026-02-20', 'Niercontrole', 'Chronische nierziekte stadium 3', 'Dieetadvies en medicatie', 'eGFR: 45 ml/min', 'system');

-- Dump completed on 2026-02-21 21:06:55
