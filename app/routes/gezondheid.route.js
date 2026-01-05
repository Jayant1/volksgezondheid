/**
 * @swagger
 * components:
 *   schemas:
 *     Gezondheidsdossier:
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
 *         orgaan_donor:
 *           type: boolean
 *         laatst_gezien_datum:
 *           type: string
 *           format: date
 *         notities:
 *           type: string
 *         huisarts:
 *           $ref: '#/components/schemas/Zorgverlener'
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
 *     Zorginstelling:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         naam:
 *           type: string
 *         type_instelling:
 *           type: string
 *           enum: [ziekenhuis, kliniek, polikliniek, gezondheidscentrum, apotheek, laboratorium, andere]
 *         straatnaam:
 *           type: string
 *         huisnummer:
 *           type: string
 *         telefoon:
 *           type: string
 *         email:
 *           type: string
 *         is_actief:
 *           type: boolean
 *         distrikt:
 *           $ref: '#/components/schemas/Distrikt'
 *         wijk:
 *           $ref: '#/components/schemas/Wijk'
 *     Verzekeraar:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         verzekeraar_naam:
 *           type: string
 *         verzekeraar_code:
 *           type: string
 *         telefoon:
 *           type: string
 *         email:
 *           type: string
 *         is_actief:
 *           type: boolean
 *     Allergie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         allergie_type:
 *           type: string
 *           enum: [medicatie, voedsel, stuifmeel, insect, contact, andere]
 *         allergie_naam:
 *           type: string
 *         ernst:
 *           type: string
 *           enum: [mild, matig, ernstig, levensgevaarlijk]
 *         reactie_beschrijving:
 *           type: string
 *         datum_vastgesteld:
 *           type: string
 *           format: date
 *         is_actief:
 *           type: boolean
 *         vastgesteld_door:
 *           $ref: '#/components/schemas/Zorgverlener'
 *     Medicatie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         medicijn_naam:
 *           type: string
 *         atc_code:
 *           type: string
 *         dosering:
 *           type: string
 *         frequentie:
 *           type: string
 *         toedieningswijze:
 *           type: string
 *         reden_voorschrift:
 *           type: string
 *         start_datum:
 *           type: string
 *           format: date
 *         eind_datum:
 *           type: string
 *           format: date
 *         is_actief:
 *           type: boolean
 *         voorgeschreven_door:
 *           $ref: '#/components/schemas/Zorgverlener'
 *     Vaccinatie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         vaccin_naam:
 *           type: string
 *         vaccin_code:
 *           type: string
 *         ziekte_bescherming:
 *           type: string
 *         batch_nummer:
 *           type: string
 *         toegediend_datum:
 *           type: string
 *           format: date
 *         locatie_toediening:
 *           type: string
 *         vervaldatum:
 *           type: string
 *           format: date
 *         herhaling_nodig:
 *           type: boolean
 *         volgende_vaccinatie_datum:
 *           type: string
 *           format: date
 *         toegediend_door:
 *           $ref: '#/components/schemas/Zorgverlener'
 *         instelling:
 *           $ref: '#/components/schemas/Zorginstelling'
 *     MedischeAandoening:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         aandoening_naam:
 *           type: string
 *         icd10_code:
 *           type: string
 *         diagnose_datum:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [actief, behandeld, chronisch, in_remissie]
 *         ernst:
 *           type: string
 *           enum: [mild, matig, ernstig, kritiek]
 *         behandeling_beschrijving:
 *           type: string
 *         gediagnosticeerd_door:
 *           $ref: '#/components/schemas/Zorgverlener'
 *     MedischeKeuring:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         keuring_type:
 *           type: string
 *           enum: [rijbewijs, werk, school, sport, andere]
 *         keuring_datum:
 *           type: string
 *           format: date
 *         uitslag:
 *           type: string
 *           enum: [goedgekeurd, afgekeurd, onder_voorwaarden]
 *         beperkingen:
 *           type: string
 *         geldig_tot:
 *           type: string
 *           format: date
 *         certificaat_nummer:
 *           type: string
 *         uitgevoerd_door:
 *           $ref: '#/components/schemas/Zorgverlener'
 *     Consult:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         consult_datum:
 *           type: string
 *           format: date
 *         consult_tijd:
 *           type: string
 *           format: time
 *         reden_bezoek:
 *           type: string
 *         diagnose:
 *           type: string
 *         behandeling:
 *           type: string
 *         verwijzing_naar:
 *           type: string
 *         vervolgafspraak_nodig:
 *           type: boolean
 *         vervolgafspraak_datum:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [gepland, uitgevoerd, geannuleerd, no-show]
 *         zorgverlener:
 *           $ref: '#/components/schemas/Zorgverlener'
 *         instelling:
 *           $ref: '#/components/schemas/Zorginstelling'
 *     Ziekenhuisopname:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         afdeling:
 *           type: string
 *         opname_datum:
 *           type: string
 *           format: date
 *         ontslag_datum:
 *           type: string
 *           format: date
 *         reden_opname:
 *           type: string
 *         diagnose:
 *           type: string
 *         uitgevoerde_procedures:
 *           type: string
 *         opname_type:
 *           type: string
 *           enum: [spoed, gepland, opname_via_SEH]
 *         ontslag_status:
 *           type: string
 *           enum: [genezen, verbeterd, onveranderd, verslechterd, overgeplaatst, overleden]
 *         behandelend_arts:
 *           $ref: '#/components/schemas/Zorgverlener'
 *         instelling:
 *           $ref: '#/components/schemas/Zorginstelling'
 *     LaboratoriumUitslag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         test_naam:
 *           type: string
 *         test_code:
 *           type: string
 *         test_datum:
 *           type: string
 *           format: date
 *         uitslag_datum:
 *           type: string
 *           format: date
 *         uitslag_waarde:
 *           type: string
 *         eenheid:
 *           type: string
 *         referentie_ondergrens:
 *           type: number
 *         referentie_bovengrens:
 *           type: number
 *         is_afwijkend:
 *           type: boolean
 *         interpretatie:
 *           type: string
 *         aangevraagd_door:
 *           $ref: '#/components/schemas/Zorgverlener'
 *         laboratorium:
 *           $ref: '#/components/schemas/Zorginstelling'
 *     MedischBeeldmateriaal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         beeldtype:
 *           type: string
 *           enum: [rontgen, CT, MRI, echo, andere]
 *         lichaamsdeel:
 *           type: string
 *         onderzoek_datum:
 *           type: string
 *           format: date
 *         bevindingen:
 *           type: string
 *         conclusie:
 *           type: string
 *         bestandslocatie:
 *           type: string
 *         aangevraagd_door:
 *           $ref: '#/components/schemas/Zorgverlener'
 *         instelling:
 *           $ref: '#/components/schemas/Zorginstelling'
 *     Zwangerschap:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         graviditeit_nummer:
 *           type: integer
 *         pariteit_nummer:
 *           type: integer
 *         zwangerschap_start_datum:
 *           type: string
 *           format: date
 *         uitgerekende_datum:
 *           type: string
 *           format: date
 *         bevalling_datum:
 *           type: string
 *           format: date
 *         bevalling_type:
 *           type: string
 *           enum: [natuurlijk, keizersnede, vacuumextractie, tangverlossing]
 *         aantal_kinderen:
 *           type: integer
 *         zwangerschap_status:
 *           type: string
 *           enum: [lopend, voltooid, miskraam, abortus]
 *         complicaties:
 *           type: string
 *         verloskundige:
 *           $ref: '#/components/schemas/Zorgverlener'
 *         gynaecoloog:
 *           $ref: '#/components/schemas/Zorgverlener'
 *         instelling:
 *           $ref: '#/components/schemas/Zorginstelling'
 *     Verzekering:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         polisnummer:
 *           type: string
 *         verzekering_type:
 *           type: string
 *           enum: [basis, aanvullend, particulier]
 *         start_datum:
 *           type: string
 *           format: date
 *         eind_datum:
 *           type: string
 *           format: date
 *         is_actief:
 *           type: boolean
 *         verzekeraar:
 *           $ref: '#/components/schemas/Verzekeraar'
 *     Noodcontact:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         naam:
 *           type: string
 *         relatie:
 *           type: string
 *         telefoon_primair:
 *           type: string
 *         telefoon_secundair:
 *           type: string
 *         adres:
 *           type: string
 *         prioriteit:
 *           type: integer
 *         is_actief:
 *           type: boolean
 *     Distrikt:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         distrikt_code:
 *           type: string
 *         distriktnaam:
 *           type: string
 *     Wijk:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         wijk_code:
 *           type: string
 *         wijknaam:
 *           type: string
 *         distrikt:
 *           $ref: '#/components/schemas/Distrikt'
 *     Land:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         land_code:
 *           type: string
 *         landnaam:
 *           type: string
 *     AuditLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         tabel_naam:
 *           type: string
 *         record_id:
 *           type: integer
 *         actie_type:
 *           type: string
 *           enum: [INSERT, UPDATE, DELETE, VIEW, EXPORT]
 *         oude_waarde:
 *           type: string
 *         nieuwe_waarde:
 *           type: string
 *         gebruikers_identificatienummer:
 *           type: string
 *         reden_toegang:
 *           type: string
 *         tijdstip:
 *           type: string
 *           format: date-time
 *         ip_adres:
 *           type: string
 *     CompleetDossier:
 *       type: object
 *       properties:
 *         identificatienummer:
 *           type: string
 *         dossier:
 *           $ref: '#/components/schemas/Gezondheidsdossier'
 *         allergieen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Allergie'
 *         medicaties:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Medicatie'
 *         vaccinaties:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vaccinatie'
 *         aandoeningen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MedischeAandoening'
 *         keuringen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MedischeKeuring'
 *         consulten:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Consult'
 *         opnames:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ziekenhuisopname'
 *         labUitslagen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LaboratoriumUitslag'
 *         beeldmateriaal:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MedischBeeldmateriaal'
 *         zwangerschappen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Zwangerschap'
 *         verzekeringen:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Verzekering'
 *         noodcontacten:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Noodcontact'
 */

const controller = require("../controller/gezondheid.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // ==================== GEZONDHEIDSDOSSIER ROUTES ====================

  /**
   * @swagger
   * /api/dossier/{identificatienummer}:
   *   get:
   *     summary: Ophalen van gezondheidsdossier
   *     description: Haalt het gezondheidsdossier op van een persoon inclusief basisgegevens, allergieen, medicaties en noodcontacten
   *     tags: [Gezondheidsdossier]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Gezondheidsdossier succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Gezondheidsdossier'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/dossier/:identificatienummer",
    controller.ophaalGezondheidsdossier
  );

  /**
   * @swagger
   * /api/dossier/compleet/{identificatienummer}:
   *   get:
   *     summary: Ophalen van compleet gezondheidsdossier
   *     description: Haalt het complete gezondheidsdossier op inclusief alle medische gegevens
   *     tags: [Gezondheidsdossier]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Compleet dossier succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/CompleetDossier'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/dossier/compleet/:identificatienummer",
    controller.ophaalCompleetDossier
  );

  // ==================== ALLERGIE ROUTES ====================

  /**
   * @swagger
   * /api/allergieen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van allergieen
   *     description: Haalt alle allergieen op van een persoon
   *     tags: [Allergieen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Allergieen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Allergie'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/allergieen/:identificatienummer",
    controller.ophaalAllergieen
  );

  // ==================== MEDICATIE ROUTES ====================

  /**
   * @swagger
   * /api/medicaties/{identificatienummer}:
   *   get:
   *     summary: Ophalen van medicaties
   *     description: Haalt alle medicaties op van een persoon
   *     tags: [Medicaties]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: actief
   *         schema:
   *           type: boolean
   *         description: Filter op actieve medicaties (true/false)
   *     responses:
   *       200:
   *         description: Medicaties succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Medicatie'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/medicaties/:identificatienummer",
    controller.ophaalMedicaties
  );

  // ==================== VACCINATIE ROUTES ====================

  /**
   * @swagger
   * /api/vaccinaties/{identificatienummer}:
   *   get:
   *     summary: Ophalen van vaccinaties
   *     description: Haalt alle vaccinaties op van een persoon
   *     tags: [Vaccinaties]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Vaccinaties succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Vaccinatie'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/vaccinaties/:identificatienummer",
    controller.ophaalVaccinaties
  );

  // ==================== MEDISCHE AANDOENING ROUTES ====================

  /**
   * @swagger
   * /api/aandoeningen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van medische aandoeningen
   *     description: Haalt alle medische aandoeningen op van een persoon
   *     tags: [Medische Aandoeningen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [actief, behandeld, chronisch, in_remissie]
   *         description: Filter op status van de aandoening
   *     responses:
   *       200:
   *         description: Aandoeningen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/MedischeAandoening'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/aandoeningen/:identificatienummer",
    controller.ophaalAandoeningen
  );

  // ==================== MEDISCHE KEURING ROUTES ====================

  /**
   * @swagger
   * /api/keuringen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van medische keuringen
   *     description: Haalt alle medische keuringen op van een persoon (rijbewijs, werk, sport, etc.)
   *     tags: [Medische Keuringen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *           enum: [rijbewijs, werk, school, sport, andere]
   *         description: Filter op type keuring
   *     responses:
   *       200:
   *         description: Keuringen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/MedischeKeuring'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/keuringen/:identificatienummer",
    controller.ophaalKeuringen
  );

  // ==================== CONSULT ROUTES ====================

  /**
   * @swagger
   * /api/consulten/{identificatienummer}:
   *   get:
   *     summary: Ophalen van consulten
   *     description: Haalt alle consulten op van een persoon
   *     tags: [Consulten]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: status
   *         schema:
   *           type: string
   *           enum: [gepland, uitgevoerd, geannuleerd, no-show]
   *         description: Filter op status van het consult
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Maximum aantal resultaten (default 100)
   *     responses:
   *       200:
   *         description: Consulten succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Consult'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/consulten/:identificatienummer",
    controller.ophaalConsulten
  );

  // ==================== ZIEKENHUISOPNAME ROUTES ====================

  /**
   * @swagger
   * /api/opnames/{identificatienummer}:
   *   get:
   *     summary: Ophalen van ziekenhuisopnames
   *     description: Haalt alle ziekenhuisopnames op van een persoon
   *     tags: [Ziekenhuisopnames]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Opnames succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Ziekenhuisopname'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/opnames/:identificatienummer",
    controller.ophaalOpnames
  );

  // ==================== LABORATORIUM UITSLAG ROUTES ====================

  /**
   * @swagger
   * /api/lab-uitslagen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van laboratorium uitslagen
   *     description: Haalt alle laboratorium uitslagen op van een persoon
   *     tags: [Laboratorium]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: afwijkend
   *         schema:
   *           type: boolean
   *         description: Filter op afwijkende uitslagen (true/false)
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Maximum aantal resultaten (default 100)
   *     responses:
   *       200:
   *         description: Lab uitslagen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/LaboratoriumUitslag'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/lab-uitslagen/:identificatienummer",
    controller.ophaalLabUitslagen
  );

  // ==================== MEDISCH BEELDMATERIAAL ROUTES ====================

  /**
   * @swagger
   * /api/beeldmateriaal/{identificatienummer}:
   *   get:
   *     summary: Ophalen van medisch beeldmateriaal
   *     description: Haalt alle medisch beeldmateriaal op van een persoon (rontgen, CT, MRI, echo)
   *     tags: [Beeldmateriaal]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *           enum: [rontgen, CT, MRI, echo, andere]
   *         description: Filter op type beeldmateriaal
   *     responses:
   *       200:
   *         description: Beeldmateriaal succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/MedischBeeldmateriaal'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/beeldmateriaal/:identificatienummer",
    controller.ophaalBeeldmateriaal
  );

  // ==================== ZWANGERSCHAP ROUTES ====================

  /**
   * @swagger
   * /api/zwangerschappen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van zwangerschappen
   *     description: Haalt alle zwangerschappen op van een persoon
   *     tags: [Zwangerschappen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Zwangerschappen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Zwangerschap'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/zwangerschappen/:identificatienummer",
    controller.ophaalZwangerschappen
  );

  // ==================== VERZEKERING ROUTES ====================

  /**
   * @swagger
   * /api/verzekeringen/{identificatienummer}:
   *   get:
   *     summary: Ophalen van verzekeringen
   *     description: Haalt alle zorgverzekeringen op van een persoon
   *     tags: [Verzekeringen]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: actief
   *         schema:
   *           type: boolean
   *         description: Filter op actieve verzekeringen (true/false)
   *     responses:
   *       200:
   *         description: Verzekeringen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Verzekering'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/verzekeringen/:identificatienummer",
    controller.ophaalVerzekeringen
  );

  // ==================== NOODCONTACT ROUTES ====================

  /**
   * @swagger
   * /api/noodcontacten/{identificatienummer}:
   *   get:
   *     summary: Ophalen van noodcontacten
   *     description: Haalt alle noodcontacten op van een persoon
   *     tags: [Noodcontacten]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *     responses:
   *       200:
   *         description: Noodcontacten succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Noodcontact'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/noodcontacten/:identificatienummer",
    controller.ophaalNoodcontacten
  );

  // ==================== ZORGVERLENER ROUTES ====================

  /**
   * @swagger
   * /api/zorgverleners:
   *   get:
   *     summary: Ophalen van alle zorgverleners
   *     description: Haalt alle zorgverleners op, optioneel gefilterd op type en actief status
   *     tags: [Zorgverleners]
   *     parameters:
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *           enum: [huisarts, specialist, verpleegkundige, tandarts, apotheker, fysiotherapeut, andere]
   *         description: Filter op type zorgverlener
   *       - in: query
   *         name: actief
   *         schema:
   *           type: boolean
   *         description: Filter op actieve zorgverleners (true/false)
   *     responses:
   *       200:
   *         description: Zorgverleners succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Zorgverlener'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/zorgverleners",
    controller.ophaalZorgverleners
  );

  /**
   * @swagger
   * /api/zorgverleners/{id}:
   *   get:
   *     summary: Ophalen van een specifieke zorgverlener
   *     description: Haalt details op van een zorgverlener inclusief gekoppelde instellingen
   *     tags: [Zorgverleners]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Het ID van de zorgverlener
   *     responses:
   *       200:
   *         description: Zorgverlener succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Zorgverlener'
   *       404:
   *         description: Zorgverlener niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/zorgverleners/:id",
    controller.ophaalZorgverlenerById
  );

  /**
   * @swagger
   * /api/zorgverlener/identificatie/{identificatienummer}:
   *   get:
   *     summary: Ophalen van zorgverlener op identificatienummer
   *     description: Haalt details op van een zorgverlener op basis van identificatienummer
   *     tags: [Zorgverleners]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het identificatienummer van de zorgverlener
   *     responses:
   *       200:
   *         description: Zorgverlener succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Zorgverlener'
   *       404:
   *         description: Zorgverlener niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/zorgverlener/identificatie/:identificatienummer",
    controller.ophaalZorgverlenerByIdentificatie
  );

  // ==================== ZORGINSTELLING ROUTES ====================

  /**
   * @swagger
   * /api/zorginstellingen:
   *   get:
   *     summary: Ophalen van alle zorginstellingen
   *     description: Haalt alle zorginstellingen op, optioneel gefilterd op type en actief status
   *     tags: [Zorginstellingen]
   *     parameters:
   *       - in: query
   *         name: type
   *         schema:
   *           type: string
   *           enum: [ziekenhuis, kliniek, polikliniek, gezondheidscentrum, apotheek, laboratorium, andere]
   *         description: Filter op type instelling
   *       - in: query
   *         name: actief
   *         schema:
   *           type: boolean
   *         description: Filter op actieve instellingen (true/false)
   *     responses:
   *       200:
   *         description: Zorginstellingen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Zorginstelling'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/zorginstellingen",
    controller.ophaalZorginstellingen
  );

  /**
   * @swagger
   * /api/zorginstellingen/{id}:
   *   get:
   *     summary: Ophalen van een specifieke zorginstelling
   *     description: Haalt details op van een zorginstelling inclusief gekoppelde zorgverleners
   *     tags: [Zorginstellingen]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Het ID van de zorginstelling
   *     responses:
   *       200:
   *         description: Zorginstelling succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Zorginstelling'
   *       404:
   *         description: Zorginstelling niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/zorginstellingen/:id",
    controller.ophaalZorginstellingById
  );

  // ==================== VERZEKERAAR ROUTES ====================

  /**
   * @swagger
   * /api/verzekeraars:
   *   get:
   *     summary: Ophalen van alle verzekeraars
   *     description: Haalt alle zorgverzekeraars op
   *     tags: [Verzekeraars]
   *     parameters:
   *       - in: query
   *         name: actief
   *         schema:
   *           type: boolean
   *         description: Filter op actieve verzekeraars (true/false)
   *     responses:
   *       200:
   *         description: Verzekeraars succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Verzekeraar'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/verzekeraars",
    controller.ophaalVerzekeraars
  );

  /**
   * @swagger
   * /api/verzekeraars/{id}:
   *   get:
   *     summary: Ophalen van een specifieke verzekeraar
   *     description: Haalt details op van een verzekeraar
   *     tags: [Verzekeraars]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Het ID van de verzekeraar
   *     responses:
   *       200:
   *         description: Verzekeraar succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/Verzekeraar'
   *       404:
   *         description: Verzekeraar niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/verzekeraars/:id",
    controller.ophaalVerzekeraarById
  );

  // ==================== REFERENTIEDATA ROUTES ====================

  /**
   * @swagger
   * /api/distrikten:
   *   get:
   *     summary: Ophalen van alle distrikten
   *     description: Haalt alle distrikten op inclusief wijken
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Distrikten succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Distrikt'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/distrikten",
    controller.ophaalDistrikten
  );

  /**
   * @swagger
   * /api/wijken:
   *   get:
   *     summary: Ophalen van alle wijken
   *     description: Haalt alle wijken op, optioneel gefilterd op distrikt
   *     tags: [Referentiedata]
   *     parameters:
   *       - in: query
   *         name: distrikt_id
   *         schema:
   *           type: integer
   *         description: Filter op distrikt ID
   *     responses:
   *       200:
   *         description: Wijken succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Wijk'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/wijken",
    controller.ophaalWijken
  );

  /**
   * @swagger
   * /api/landen:
   *   get:
   *     summary: Ophalen van alle landen
   *     description: Haalt alle landen op
   *     tags: [Referentiedata]
   *     responses:
   *       200:
   *         description: Landen succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Land'
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/landen",
    controller.ophaalLanden
  );

  // ==================== AUDIT LOG ROUTES ====================

  /**
   * @swagger
   * /api/audit/{identificatienummer}:
   *   get:
   *     summary: Ophalen van audit log
   *     description: Haalt de audit log op voor een gezondheidsdossier
   *     tags: [Audit]
   *     parameters:
   *       - in: path
   *         name: identificatienummer
   *         required: true
   *         schema:
   *           type: string
   *         description: Het unieke identificatienummer van de persoon
   *       - in: query
   *         name: actie_type
   *         schema:
   *           type: string
   *           enum: [INSERT, UPDATE, DELETE, VIEW, EXPORT]
   *         description: Filter op actie type
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: Maximum aantal resultaten (default 100)
   *     responses:
   *       200:
   *         description: Audit log succesvol opgehaald
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/AuditLog'
   *       400:
   *         description: Identificatienummer is verplicht
   *       404:
   *         description: Gezondheidsdossier niet gevonden
   *       500:
   *         description: Server fout
   */
  app.get(
    "/api/audit/:identificatienummer",
    controller.ophaalAuditLog
  );
};
