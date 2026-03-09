/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer:
 *           type: string
 *         bloedgroep:
 *           type: string
 *           enum: [A, B, AB, O, onbekend]
 *         rhesus_factor:
 *           type: string
 *           enum: ['+', '-', onbekend]
 *         huisarts_zorgverleners_id:
 *           type: integer
 *         notities:
 *           type: string
 *         ingevoerd_door:
 *           type: string
 *         gewijzigd_door:
 *           type: string
 *         datum_ingevoerd:
 *           type: string
 *           format: date-time
 *         datum_gewijzigd:
 *           type: string
 *           format: date-time
 *     Zorgverlener:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         identificatienummer:
 *           type: string
 *         registratie_nummer:
 *           type: string
 *         specialisatie:
 *           type: string
 *         type_zorgverlener:
 *           type: string
 *           enum: [huisarts, specialist, verpleegkundige, tandarts, apotheker, fysiotherapeut, andere]
 *         praktijk_naam:
 *           type: string
 *         telefoon:
 *           type: string
 *         email:
 *           type: string
 *         is_actief:
 *           type: boolean
 *         ingevoerd_door:
 *           type: string
 *         gewijzigd_door:
 *           type: string
 *         datum_ingevoerd:
 *           type: string
 *           format: date-time
 *         datum_gewijzigd:
 *           type: string
 *           format: date-time
 *     MedischeKeuring:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         patienten_id:
 *           type: integer
 *         keuring_type:
 *           type: string
 *           enum: [rijbewijs, werk, school, sport, andere]
 *         datum_keuring:
 *           type: string
 *           format: date
 *         zorgverleners_id:
 *           type: integer
 *         uitslag:
 *           type: string
 *           enum: [goedgekeurd, afgekeurd, onder_voorwaarden]
 *         beperkingen:
 *           type: string
 *         datum_geldig_tot:
 *           type: string
 *           format: date
 *         notities:
 *           type: string
 *         ingevoerd_door:
 *           type: string
 *         gewijzigd_door:
 *           type: string
 *         datum_ingevoerd:
 *           type: string
 *           format: date-time
 *         datum_gewijzigd:
 *           type: string
 *           format: date-time
 *         patient:
 *           $ref: '#/components/schemas/Patient'
 *         zorgverlener:
 *           $ref: '#/components/schemas/Zorgverlener'
 */

const controller = require("../controller/medische_keuringen.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // ==================== LAATSTE MEDISCHE KEURING ROUTE ====================

  /**
   * @swagger
   * /api/laatste_medische_keuring/{id_nummer}:
   *   get:
   *     summary: Ophalen van laatste medische keuring
   *     description: Haalt de meest recente medische keuring op voor een patient op basis van identificatienummer
   *     tags: [Medische Keuring]
   *     parameters:
   *       - in: path
   *         name: id_nummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het identificatienummer van de patient
   *     responses:
   *       200:
   *         description: Laatste medische keuring succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/MedischeKeuring'
   *       400:
   *         description: ID nummer is verplicht
   *       404:
   *         description: Patient niet gevonden of geen medische keuringen gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/laatste_medische_keuring/:id_nummer",
    controller.laatsteMedischeKeuring
  );

  // ==================== INVOEREN MEDISCHE KEURING ROUTE ====================

  /**
   * @swagger
   * /api/medische_keuring:
   *   post:
   *     summary: Invoeren van een nieuwe medische keuring
   *     description: Voegt een nieuwe medische keuring toe voor een patiënt
   *     tags: [Medische Keuring]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - identificatienummer
   *               - zorgverlener_registratie_nummer
   *               - keuring_type
   *               - datum_keuring
   *               - uitslag
   *             properties:
   *               identificatienummer:
   *                 type: string
   *                 description: Het identificatienummer van de patiënt
   *                 example: "IC001985"
   *               zorgverlener_registratie_nummer:
   *                 type: string
   *                 description: Het registratienummer van de zorgverlener
   *                 example: "REG001234"
   *               keuring_type:
   *                 type: string
   *                 enum: [rijbewijs, werk, school, sport, andere]
   *                 description: Type van de medische keuring
   *                 example: "rijbewijs"
   *               datum_keuring:
   *                 type: string
   *                 format: date
   *                 description: Datum van de keuring (YYYY-MM-DD)
   *                 example: "2026-03-09"
   *               uitslag:
   *                 type: string
   *                 enum: [goedgekeurd, afgekeurd, onder_voorwaarden]
   *                 description: Uitslag van de keuring
   *                 example: "goedgekeurd"
   *               beperkingen:
   *                 type: string
   *                 description: Eventuele beperkingen (optioneel)
   *                 example: "Geen nachtrijden"
   *               datum_geldig_tot:
   *                 type: string
   *                 format: date
   *                 description: Datum tot wanneer de keuring geldig is (optioneel)
   *                 example: "2031-03-09"
   *               notities:
   *                 type: string
   *                 description: Aanvullende notities (optioneel)
   *                 example: "Keuring zonder bijzonderheden verlopen"
   *               ingevoerd_door:
   *                 type: string
   *                 description: Naam van de persoon die de keuring invoert (optioneel)
   *                 example: "admin"
   *     responses:
   *       201:
   *         description: Medische keuring succesvol ingevoerd
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Medische keuring succesvol ingevoerd"
   *                 data:
   *                   $ref: '#/components/schemas/MedischeKeuring'
   *       400:
   *         description: Validatiefout - verplichte velden ontbreken of ongeldige waarden
   *       404:
   *         description: Patiënt of zorgverlener niet gevonden
   *       500:
   *         description: Server fout
   */
  app.post(
    "/api/medische_keuring",
    controller.invoerMedischeKeuring
  );
};
