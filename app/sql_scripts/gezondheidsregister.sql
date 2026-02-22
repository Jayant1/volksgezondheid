-- PostgreSQL dump converted from MariaDB
-- Host: localhost    Database: gezondheidsregister
-- ------------------------------------------------------
-- Server version	PostgreSQL

-- Create ENUM types first
CREATE TYPE bloedgroep_type AS ENUM ('A', 'B', 'AB', 'O', 'onbekend');
CREATE TYPE rhesus_factor_type AS ENUM ('+', '-', 'onbekend');
CREATE TYPE keuring_type_enum AS ENUM ('rijbewijs', 'werk', 'school', 'sport', 'andere');
CREATE TYPE uitslag_enum AS ENUM ('goedgekeurd', 'afgekeurd', 'onder_voorwaarden');
CREATE TYPE instelling_type_enum AS ENUM ('ziekenhuis', 'kliniek', 'polikliniek', 'gezondheidscentrum', 'apotheek', 'laboratorium', 'andere');
CREATE TYPE zorgverlener_type_enum AS ENUM ('huisarts', 'specialist', 'verpleegkundige', 'tandarts', 'apotheker', 'fysiotherapeut', 'andere');

--
-- Table structure for table `consultaties`
--

DROP TABLE IF EXISTS consultaties CASCADE;
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
  CONSTRAINT consult_zorginstelling_id FOREIGN KEY (zorginstellingen_id) REFERENCES zorginstellingen (id),
  CONSTRAINT consult_gezondheidsdossier_id FOREIGN KEY (patienten_id) REFERENCES patienten (id) ON DELETE CASCADE,
  CONSTRAINT consult_zorgverlener_id FOREIGN KEY (zorgverleners_id) REFERENCES zorgverleners (id)
);

-- Create indexes
CREATE INDEX idx_consult_zorginstelling_id ON consultaties (zorginstellingen_id);
CREATE INDEX idx_consult_gezondheidsdossier ON consultaties (patienten_id);
CREATE INDEX idx_consult_zorgverlener ON consultaties (zorgverleners_id);
CREATE INDEX idx_consult_datum ON consultaties (datum_consultatie);

--
-- Table structure for table `distrikten`
--

DROP TABLE IF EXISTS distrikten CASCADE;
CREATE TABLE distrikten (
  id SERIAL PRIMARY KEY,
  distrikt_code VARCHAR(10) NOT NULL,
  distriktnaam VARCHAR(100) NOT NULL,
  UNIQUE (distrikt_code)
);

--
-- Table structure for table `landen`
--

DROP TABLE IF EXISTS landen CASCADE;
CREATE TABLE landen (
  id SERIAL PRIMARY KEY,
  land_code VARCHAR(3) NOT NULL,
  landnaam VARCHAR(100) NOT NULL,
  UNIQUE (land_code)
);

--
-- Table structure for table `medische_keuringen`
--

DROP TABLE IF EXISTS medische_keuringen CASCADE;
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
  datum_gewijzigd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Table structure for table `patienten`
--

DROP TABLE IF EXISTS patienten CASCADE;
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
  CONSTRAINT gezondheidsdossier_huisarts_zorgverlener_id FOREIGN KEY (huisarts_zorgverleners_id) REFERENCES zorgverleners (id)
);

-- Create indexes
CREATE INDEX idx_gezondheidsdossier_identificatie ON patienten (identificatienummer);
CREATE INDEX idx_gezondheidsdossier_huisarts ON patienten (huisarts_zorgverleners_id);

--
-- Table structure for table `wijken`
--

DROP TABLE IF EXISTS wijken CASCADE;
CREATE TABLE wijken (
  id SERIAL PRIMARY KEY,
  distrikten_id INTEGER NOT NULL,
  wijk_code VARCHAR(10) NOT NULL,
  wijknaam VARCHAR(100) NOT NULL,
  UNIQUE (wijk_code),
  CONSTRAINT distrikten_id FOREIGN KEY (distrikten_id) REFERENCES distrikten (id)
);

-- Create indexes
CREATE INDEX idx_wijken_distrikten_id ON wijken (distrikten_id);

--
-- Table structure for table `zorginstellingen`
--

DROP TABLE IF EXISTS zorginstellingen CASCADE;
CREATE TABLE zorginstellingen (
  id SERIAL PRIMARY KEY,
  naam VARCHAR(200) NOT NULL,
  type_instelling instelling_type_enum NOT NULL,
  adres VARCHAR(20) NOT NULL,
  distrikten_id INTEGER NOT NULL,
  wijken_id INTEGER DEFAULT NULL,
  telefoon VARCHAR(20) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL,
  ingevoerd_door VARCHAR(100) DEFAULT NULL,
  gewijzigd_door VARCHAR(100) DEFAULT NULL,
  datum_ingevoerd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datum_gewijzigd TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT zorginstelling_distrikten_id FOREIGN KEY (distrikten_id) REFERENCES distrikten (id),
  CONSTRAINT zorginstelling_wijken_id FOREIGN KEY (wijken_id) REFERENCES wijken (id)
);

-- Create indexes
CREATE INDEX idx_zorginstelling_wijken_id ON zorginstellingen (wijken_id);
CREATE INDEX idx_zorginstelling_distrikten ON zorginstellingen (distrikten_id);
CREATE INDEX idx_zorginstelling_type ON zorginstellingen (type_instelling);

--
-- Table structure for table `zorgverleners`
--

DROP TABLE IF EXISTS zorgverleners CASCADE;
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

-- Create indexes
CREATE INDEX idx_zorgverlener_identificatie ON zorgverleners (identificatienummer);
CREATE INDEX idx_zorgverlener_registratie ON zorgverleners (registratie_nummer);
CREATE INDEX idx_zorgverlener_type ON zorgverleners (type_zorgverlener);

-- Note: PostgreSQL doesn't have automatic ON UPDATE CURRENT_TIMESTAMP like MySQL
-- You'll need to create a trigger for that functionality if needed
-- Example trigger for one table (you'd need to create similar triggers for all tables):
/*
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.datum_gewijzigd = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_consultaties_modtime 
    BEFORE UPDATE ON consultaties 
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
*/

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

-- Insert 3 patienten with the specified identificatienummers
INSERT INTO patienten (identificatienummer, bloedgroep, rhesus_factor, huisarts_zorgverleners_id, notities, ingevoerd_door) VALUES
('IC001985', 'A', '+', 1, 'Patient in goede gezondheid', 'system'),
('IC007890', 'B', '-', 1, 'Allergisch voor penicilline', 'system'),
('IC007895', 'O', '+', 1, 'Diabetespatiënt type 2', 'system');

-- Insert sample medische keuringen for the 3 patients
INSERT INTO medische_keuringen (patienten_id, keuring_type, datum_keuring, zorgverleners_id, uitslag, beperkingen, datum_geldig_tot, notities, ingevoerd_door) VALUES
(1, 'rijbewijs', '2026-01-15', 1, 'goedgekeurd', NULL, '2031-01-15', 'Rijbewijskeuring zonder beperkingen', 'system'),
(2, 'werk', '2026-02-01', 1, 'onder_voorwaarden', 'Geen zware fysieke arbeid', '2027-02-01', 'Werkkeuring met beperkingen vanwege rugklachten', 'system'),
(3, 'rijbewijs', '2026-02-10', 1, 'goedgekeurd', NULL, '2028-02-10', 'Rijbewijskeuring met verkorte geldigheid vanwege diabetes', 'system');

-- Insert sample consultaties
INSERT INTO consultaties (patienten_id, zorgverleners_id, zorginstellingen_id, datum_consultatie, reden_bezoek, diagnose, behandeling, notities, ingevoerd_door) VALUES
(1, 1, 2, '2026-01-10', 'Jaarlijkse controle', 'Geen bijzonderheden', 'Geen behandeling nodig', 'Patiënt is in goede gezondheid', 'system'),
(2, 2, 1, '2026-01-20', 'Rugpijn', 'Hernia L4-L5', 'Fysiotherapie en pijnstillers', 'Verwijzing naar fysiotherapeut', 'system'),
(3, 1, 2, '2026-02-05', 'Diabetescontrole', 'Diabetes type 2 stabiel', 'Voortzetting huidige medicatie', 'HbA1c waarde: 6.8%', 'system');

-- Dump completed on 2026-02-21 21:06:55
