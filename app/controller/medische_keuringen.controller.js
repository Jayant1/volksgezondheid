const db = require("../model/index.js");

const MedischeKeuringen = db.medische_keuringen;
const Patienten = db.patienten;
const Zorgverleners = db.zorgverleners;

// ==================== INVOEREN MEDISCHE KEURING ====================

exports.invoerMedischeKeuring = async (req, res) => {
  try {
    const {
      identificatienummer,
      zorgverlener_registratie_nummer,
      keuring_type,
      datum_keuring,
      uitslag,
      beperkingen,
      datum_geldig_tot,
      notities,
      ingevoerd_door
    } = req.body;

    // Validatie verplichte velden
    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer van de patiënt is verplicht"
      });
    }

    if (!zorgverlener_registratie_nummer) {
      return res.status(400).json({
        success: false,
        message: "Registratienummer van de zorgverlener is verplicht"
      });
    }

    if (!keuring_type) {
      return res.status(400).json({
        success: false,
        message: "Keuring type is verplicht"
      });
    }

    if (!datum_keuring) {
      return res.status(400).json({
        success: false,
        message: "Datum keuring is verplicht"
      });
    }

    if (!uitslag) {
      return res.status(400).json({
        success: false,
        message: "Uitslag is verplicht"
      });
    }

    // Validatie keuring_type
    const validKeuringTypes = ['rijbewijs', 'werk', 'school', 'sport', 'andere'];
    if (!validKeuringTypes.includes(keuring_type)) {
      return res.status(400).json({
        success: false,
        message: `Ongeldig keuring type. Geldige waarden: ${validKeuringTypes.join(', ')}`
      });
    }

    // Validatie uitslag
    const validUitslagen = ['goedgekeurd', 'afgekeurd', 'onder_voorwaarden'];
    if (!validUitslagen.includes(uitslag)) {
      return res.status(400).json({
        success: false,
        message: `Ongeldige uitslag. Geldige waarden: ${validUitslagen.join(', ')}`
      });
    }

    // Zoek patiënt op basis van identificatienummer
    const patient = await Patienten.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patiënt niet gevonden met dit identificatienummer"
      });
    }

    // Zoek zorgverlener op basis van registratienummer
    const zorgverlener = await Zorgverleners.findOne({
      where: { registratie_nummer: zorgverlener_registratie_nummer }
    });

    if (!zorgverlener) {
      return res.status(404).json({
        success: false,
        message: "Zorgverlener niet gevonden met dit registratienummer"
      });
    }

    // Maak de medische keuring aan
    const nieuweKeuring = await MedischeKeuringen.create({
      patienten_id: patient.id,
      zorgverleners_id: zorgverlener.id,
      keuring_type: keuring_type,
      datum_keuring: datum_keuring,
      uitslag: uitslag,
      beperkingen: beperkingen || null,
      datum_geldig_tot: datum_geldig_tot || null,
      notities: notities || null,
      ingevoerd_door: ingevoerd_door || null
    });

    // Haal de aangemaakte keuring op met relaties
    const keuringMetRelaties = await MedischeKeuringen.findOne({
      where: { id: nieuweKeuring.id },
      include: [
        {
          model: Patienten,
          as: 'patient',
          attributes: ['id', 'identificatienummer', 'bloedgroep', 'rhesus_factor']
        },
        {
          model: Zorgverleners,
          as: 'zorgverlener',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'type_zorgverlener', 'praktijk_naam']
        }
      ]
    });

    return res.status(201).json({
      success: true,
      message: "Medische keuring succesvol ingevoerd",
      data: keuringMetRelaties
    });

  } catch (error) {
    console.error("Error invoeren medische keuring:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij invoeren van medische keuring",
      error: error.message
    });
  }
};

// ==================== LAATSTE MEDISCHE KEURING ====================

exports.laatsteMedischeKeuring = async (req, res) => {
  try {
    const { id_nummer } = req.params;

    if (!id_nummer) {
      return res.status(400).json({
        success: false,
        message: "ID nummer is verplicht"
      });
    }

    // First lookup the patient by identificatienummer
    const patient = await Patienten.findOne({
      where: { identificatienummer: id_nummer }
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient niet gevonden"
      });
    }

    // Then get the latest medical examination for this patient
    const laatsteKeuring = await MedischeKeuringen.findOne({
      where: { patienten_id: patient.id },
      include: [
        {
          model: Patienten,
          as: 'patient',
          attributes: ['id', 'identificatienummer', 'bloedgroep', 'rhesus_factor']
        },
        {
          model: Zorgverleners,
          as: 'zorgverlener',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'type_zorgverlener', 'praktijk_naam', 'telefoon', 'email']
        }
      ],
      order: [['datum_keuring', 'DESC']]
    });

    if (!laatsteKeuring) {
      return res.status(404).json({
        success: false,
        message: "Geen medische keuringen gevonden voor deze patient"
      });
    }

    return res.status(200).json({
      success: true,
      data: laatsteKeuring
    });

  } catch (error) {
    console.error("Error ophalen laatste medische keuring:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van laatste medische keuring",
      error: error.message
    });
  }
};
