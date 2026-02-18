const db = require("../model/index.js");

const MedischeKeuringen = db.medische_keuringen;
const Patienten = db.patienten;
const Zorgverleners = db.zorgverleners;

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
