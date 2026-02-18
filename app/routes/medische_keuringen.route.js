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
};
