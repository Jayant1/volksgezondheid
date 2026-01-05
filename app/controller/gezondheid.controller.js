const db = require("../model/index.js");

const Gezondheidsdossier = db.gezondheidsdossier;
const Zorgverlener = db.zorgverlener;
const Zorginstelling = db.zorginstelling;
const ZorgverlenerInstelling = db.zorgverlener_instelling;
const Verzekeraar = db.verzekeraar;
const Allergie = db.allergie;
const Medicatie = db.medicatie;
const Vaccinatie = db.vaccinatie;
const MedischeAandoening = db.medische_aandoening;
const MedischeKeuring = db.medische_keuring;
const Consult = db.consult;
const Ziekenhuisopname = db.ziekenhuisopname;
const LaboratoriumUitslag = db.laboratorium_uitslag;
const MedischBeeldmateriaal = db.medisch_beeldmateriaal;
const Zwangerschap = db.zwangerschap;
const Verzekering = db.verzekering;
const Noodcontact = db.noodcontact;
const GezondheidsregisterAudit = db.gezondheidsregister_audit;
const Distrikten = db.distrikten;
const Wijken = db.wijken;
const Landen = db.landen;

// ==================== GEZONDHEIDSDOSSIER ====================

exports.ophaalGezondheidsdossier = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer },
      include: [
        {
          model: Zorgverlener,
          as: 'huisarts',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'type_zorgverlener', 'praktijk_naam', 'telefoon', 'email']
        },
        {
          model: Allergie,
          as: 'allergieen',
          where: { is_actief: true },
          required: false,
          include: [
            {
              model: Zorgverlener,
              as: 'vastgesteld_door',
              attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie']
            }
          ]
        },
        {
          model: Medicatie,
          as: 'medicaties',
          where: { is_actief: true },
          required: false,
          include: [
            {
              model: Zorgverlener,
              as: 'voorgeschreven_door',
              attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie']
            }
          ]
        },
        {
          model: MedischeAandoening,
          as: 'aandoeningen',
          where: { is_actief: true },
          required: false
        },
        {
          model: Noodcontact,
          as: 'noodcontacten',
          where: { is_actief: true },
          required: false
        }
      ]
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden voor dit identificatienummer"
      });
    }

    return res.status(200).json({
      success: true,
      data: dossier
    });

  } catch (error) {
    console.error("Error ophalen gezondheidsdossier:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van gezondheidsdossier",
      error: error.message
    });
  }
};

exports.ophaalCompleetDossier = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer },
      include: [
        {
          model: Zorgverlener,
          as: 'huisarts',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'type_zorgverlener', 'praktijk_naam', 'telefoon', 'email']
        }
      ]
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden voor dit identificatienummer"
      });
    }

    const allergieen = await Allergie.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [{ model: Zorgverlener, as: 'vastgesteld_door', attributes: ['id', 'identificatienummer', 'specialisatie'] }],
      order: [['datum_aanmaak', 'DESC']]
    });

    const medicaties = await Medicatie.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [{ model: Zorgverlener, as: 'voorgeschreven_door', attributes: ['id', 'identificatienummer', 'specialisatie'] }],
      order: [['start_datum', 'DESC']]
    });

    const vaccinaties = await Vaccinatie.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        { model: Zorgverlener, as: 'toegediend_door', attributes: ['id', 'identificatienummer', 'specialisatie'] },
        { model: Zorginstelling, as: 'instelling', attributes: ['id', 'naam', 'type_instelling'] }
      ],
      order: [['toegediend_datum', 'DESC']]
    });

    const aandoeningen = await MedischeAandoening.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [{ model: Zorgverlener, as: 'gediagnosticeerd_door', attributes: ['id', 'identificatienummer', 'specialisatie'] }],
      order: [['diagnose_datum', 'DESC']]
    });

    const keuringen = await MedischeKeuring.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [{ model: Zorgverlener, as: 'uitgevoerd_door', attributes: ['id', 'identificatienummer', 'specialisatie'] }],
      order: [['keuring_datum', 'DESC']]
    });

    const consulten = await Consult.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        { model: Zorgverlener, as: 'zorgverlener', attributes: ['id', 'identificatienummer', 'specialisatie', 'type_zorgverlener'] },
        { model: Zorginstelling, as: 'instelling', attributes: ['id', 'naam', 'type_instelling'] }
      ],
      order: [['consult_datum', 'DESC']],
      limit: 50
    });

    const opnames = await Ziekenhuisopname.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        { model: Zorgverlener, as: 'behandelend_arts', attributes: ['id', 'identificatienummer', 'specialisatie'] },
        { model: Zorginstelling, as: 'instelling', attributes: ['id', 'naam', 'type_instelling'] }
      ],
      order: [['opname_datum', 'DESC']]
    });

    const labUitslagen = await LaboratoriumUitslag.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        { model: Zorgverlener, as: 'aangevraagd_door', attributes: ['id', 'identificatienummer', 'specialisatie'] },
        { model: Zorginstelling, as: 'laboratorium', attributes: ['id', 'naam'] }
      ],
      order: [['test_datum', 'DESC']],
      limit: 100
    });

    const beeldmateriaal = await MedischBeeldmateriaal.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        { model: Zorgverlener, as: 'aangevraagd_door', attributes: ['id', 'identificatienummer', 'specialisatie'] },
        { model: Zorginstelling, as: 'instelling', attributes: ['id', 'naam'] }
      ],
      order: [['onderzoek_datum', 'DESC']]
    });

    const zwangerschappen = await Zwangerschap.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        { model: Zorgverlener, as: 'verloskundige', attributes: ['id', 'identificatienummer', 'specialisatie'] },
        { model: Zorgverlener, as: 'gynaecoloog', attributes: ['id', 'identificatienummer', 'specialisatie'] },
        { model: Zorginstelling, as: 'instelling', attributes: ['id', 'naam'] }
      ],
      order: [['zwangerschap_start_datum', 'DESC']]
    });

    const verzekeringen = await Verzekering.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [{ model: Verzekeraar, as: 'verzekeraar', attributes: ['id', 'verzekeraar_naam', 'verzekeraar_code'] }],
      order: [['start_datum', 'DESC']]
    });

    const noodcontacten = await Noodcontact.findAll({
      where: { gezondheidsdossier_id: dossier.id, is_actief: true },
      order: [['prioriteit', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: {
        identificatienummer: identificatienummer,
        dossier: dossier,
        allergieen: allergieen,
        medicaties: medicaties,
        vaccinaties: vaccinaties,
        aandoeningen: aandoeningen,
        keuringen: keuringen,
        consulten: consulten,
        opnames: opnames,
        labUitslagen: labUitslagen,
        beeldmateriaal: beeldmateriaal,
        zwangerschappen: zwangerschappen,
        verzekeringen: verzekeringen,
        noodcontacten: noodcontacten
      }
    });

  } catch (error) {
    console.error("Error ophalen compleet dossier:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van compleet gezondheidsdossier",
      error: error.message
    });
  }
};

// ==================== ALLERGIEEN ====================

exports.ophaalAllergieen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const allergieen = await Allergie.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        {
          model: Zorgverlener,
          as: 'vastgesteld_door',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'praktijk_naam']
        }
      ],
      order: [['datum_aanmaak', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: allergieen
    });

  } catch (error) {
    console.error("Error ophalen allergieen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van allergieen",
      error: error.message
    });
  }
};

// ==================== MEDICATIE ====================

exports.ophaalMedicaties = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { actief } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (actief !== undefined) {
      whereClause.is_actief = actief === 'true';
    }

    const medicaties = await Medicatie.findAll({
      where: whereClause,
      include: [
        {
          model: Zorgverlener,
          as: 'voorgeschreven_door',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'praktijk_naam']
        }
      ],
      order: [['start_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: medicaties
    });

  } catch (error) {
    console.error("Error ophalen medicaties:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van medicaties",
      error: error.message
    });
  }
};

// ==================== VACCINATIES ====================

exports.ophaalVaccinaties = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const vaccinaties = await Vaccinatie.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        {
          model: Zorgverlener,
          as: 'toegediend_door',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie']
        },
        {
          model: Zorginstelling,
          as: 'instelling',
          attributes: ['id', 'naam', 'type_instelling']
        }
      ],
      order: [['toegediend_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: vaccinaties
    });

  } catch (error) {
    console.error("Error ophalen vaccinaties:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van vaccinaties",
      error: error.message
    });
  }
};

// ==================== MEDISCHE AANDOENINGEN ====================

exports.ophaalAandoeningen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { status } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (status) {
      whereClause.status = status;
    }

    const aandoeningen = await MedischeAandoening.findAll({
      where: whereClause,
      include: [
        {
          model: Zorgverlener,
          as: 'gediagnosticeerd_door',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie']
        }
      ],
      order: [['diagnose_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: aandoeningen
    });

  } catch (error) {
    console.error("Error ophalen aandoeningen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van medische aandoeningen",
      error: error.message
    });
  }
};

// ==================== MEDISCHE KEURINGEN ====================

exports.ophaalKeuringen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { type } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (type) {
      whereClause.keuring_type = type;
    }

    const keuringen = await MedischeKeuring.findAll({
      where: whereClause,
      include: [
        {
          model: Zorgverlener,
          as: 'uitgevoerd_door',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'praktijk_naam']
        }
      ],
      order: [['keuring_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: keuringen
    });

  } catch (error) {
    console.error("Error ophalen keuringen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van medische keuringen",
      error: error.message
    });
  }
};

// ==================== CONSULTEN ====================

exports.ophaalConsulten = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { status, limit } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (status) {
      whereClause.status = status;
    }

    const consulten = await Consult.findAll({
      where: whereClause,
      include: [
        {
          model: Zorgverlener,
          as: 'zorgverlener',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'type_zorgverlener', 'praktijk_naam']
        },
        {
          model: Zorginstelling,
          as: 'instelling',
          attributes: ['id', 'naam', 'type_instelling']
        }
      ],
      order: [['consult_datum', 'DESC']],
      limit: limit ? parseInt(limit) : 100
    });

    return res.status(200).json({
      success: true,
      data: consulten
    });

  } catch (error) {
    console.error("Error ophalen consulten:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van consulten",
      error: error.message
    });
  }
};

// ==================== ZIEKENHUISOPNAMES ====================

exports.ophaalOpnames = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const opnames = await Ziekenhuisopname.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        {
          model: Zorgverlener,
          as: 'behandelend_arts',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie']
        },
        {
          model: Zorginstelling,
          as: 'instelling',
          attributes: ['id', 'naam', 'type_instelling', 'telefoon']
        }
      ],
      order: [['opname_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: opnames
    });

  } catch (error) {
    console.error("Error ophalen opnames:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van ziekenhuisopnames",
      error: error.message
    });
  }
};

// ==================== LABORATORIUM UITSLAGEN ====================

exports.ophaalLabUitslagen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { afwijkend, limit } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (afwijkend !== undefined) {
      whereClause.is_afwijkend = afwijkend === 'true';
    }

    const uitslagen = await LaboratoriumUitslag.findAll({
      where: whereClause,
      include: [
        {
          model: Zorgverlener,
          as: 'aangevraagd_door',
          attributes: ['id', 'identificatienummer', 'specialisatie']
        },
        {
          model: Zorginstelling,
          as: 'laboratorium',
          attributes: ['id', 'naam']
        },
        {
          model: Consult,
          as: 'consult',
          attributes: ['id', 'consult_datum', 'reden_bezoek']
        }
      ],
      order: [['test_datum', 'DESC']],
      limit: limit ? parseInt(limit) : 100
    });

    return res.status(200).json({
      success: true,
      data: uitslagen
    });

  } catch (error) {
    console.error("Error ophalen lab uitslagen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van laboratorium uitslagen",
      error: error.message
    });
  }
};

// ==================== MEDISCH BEELDMATERIAAL ====================

exports.ophaalBeeldmateriaal = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { type } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (type) {
      whereClause.beeldtype = type;
    }

    const beeldmateriaal = await MedischBeeldmateriaal.findAll({
      where: whereClause,
      include: [
        {
          model: Zorgverlener,
          as: 'aangevraagd_door',
          attributes: ['id', 'identificatienummer', 'specialisatie']
        },
        {
          model: Zorgverlener,
          as: 'uitgevoerd_door',
          attributes: ['id', 'identificatienummer', 'specialisatie']
        },
        {
          model: Zorginstelling,
          as: 'instelling',
          attributes: ['id', 'naam', 'type_instelling']
        }
      ],
      order: [['onderzoek_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: beeldmateriaal
    });

  } catch (error) {
    console.error("Error ophalen beeldmateriaal:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van medisch beeldmateriaal",
      error: error.message
    });
  }
};

// ==================== ZWANGERSCHAPPEN ====================

exports.ophaalZwangerschappen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const zwangerschappen = await Zwangerschap.findAll({
      where: { gezondheidsdossier_id: dossier.id },
      include: [
        {
          model: Zorgverlener,
          as: 'verloskundige',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'praktijk_naam']
        },
        {
          model: Zorgverlener,
          as: 'gynaecoloog',
          attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie']
        },
        {
          model: Zorginstelling,
          as: 'instelling',
          attributes: ['id', 'naam', 'type_instelling']
        }
      ],
      order: [['zwangerschap_start_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: zwangerschappen
    });

  } catch (error) {
    console.error("Error ophalen zwangerschappen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van zwangerschappen",
      error: error.message
    });
  }
};

// ==================== VERZEKERINGEN ====================

exports.ophaalVerzekeringen = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { actief } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (actief !== undefined) {
      whereClause.is_actief = actief === 'true';
    }

    const verzekeringen = await Verzekering.findAll({
      where: whereClause,
      include: [
        {
          model: Verzekeraar,
          as: 'verzekeraar',
          attributes: ['id', 'verzekeraar_naam', 'verzekeraar_code', 'telefoon', 'email']
        }
      ],
      order: [['start_datum', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      data: verzekeringen
    });

  } catch (error) {
    console.error("Error ophalen verzekeringen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van verzekeringen",
      error: error.message
    });
  }
};

// ==================== NOODCONTACTEN ====================

exports.ophaalNoodcontacten = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const noodcontacten = await Noodcontact.findAll({
      where: { gezondheidsdossier_id: dossier.id, is_actief: true },
      order: [['prioriteit', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: noodcontacten
    });

  } catch (error) {
    console.error("Error ophalen noodcontacten:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van noodcontacten",
      error: error.message
    });
  }
};

// ==================== ZORGVERLENERS ====================

exports.ophaalZorgverleners = async (req, res) => {
  try {
    const { type, actief } = req.query;

    const whereClause = {};
    if (type) {
      whereClause.type_zorgverlener = type;
    }
    if (actief !== undefined) {
      whereClause.is_actief = actief === 'true';
    }

    const zorgverleners = await Zorgverlener.findAll({
      where: whereClause,
      include: [
        {
          model: ZorgverlenerInstelling,
          as: 'instellingen',
          where: { is_actief: true },
          required: false,
          include: [
            {
              model: Zorginstelling,
              as: 'zorginstelling',
              attributes: ['id', 'naam', 'type_instelling']
            }
          ]
        }
      ],
      order: [['registratie_nummer', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: zorgverleners
    });

  } catch (error) {
    console.error("Error ophalen zorgverleners:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van zorgverleners",
      error: error.message
    });
  }
};

exports.ophaalZorgverlenerById = async (req, res) => {
  try {
    const { id } = req.params;

    const zorgverlener = await Zorgverlener.findByPk(id, {
      include: [
        {
          model: ZorgverlenerInstelling,
          as: 'instellingen',
          include: [
            {
              model: Zorginstelling,
              as: 'zorginstelling',
              attributes: ['id', 'naam', 'type_instelling', 'straatnaam', 'huisnummer', 'telefoon']
            }
          ]
        }
      ]
    });

    if (!zorgverlener) {
      return res.status(404).json({
        success: false,
        message: "Zorgverlener niet gevonden"
      });
    }

    return res.status(200).json({
      success: true,
      data: zorgverlener
    });

  } catch (error) {
    console.error("Error ophalen zorgverlener:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van zorgverlener",
      error: error.message
    });
  }
};

exports.ophaalZorgverlenerByIdentificatie = async (req, res) => {
  try {
    const { identificatienummer } = req.params;

    const zorgverlener = await Zorgverlener.findOne({
      where: { identificatienummer: identificatienummer },
      include: [
        {
          model: ZorgverlenerInstelling,
          as: 'instellingen',
          include: [
            {
              model: Zorginstelling,
              as: 'zorginstelling',
              attributes: ['id', 'naam', 'type_instelling', 'straatnaam', 'huisnummer', 'telefoon']
            }
          ]
        }
      ]
    });

    if (!zorgverlener) {
      return res.status(404).json({
        success: false,
        message: "Zorgverlener niet gevonden"
      });
    }

    return res.status(200).json({
      success: true,
      data: zorgverlener
    });

  } catch (error) {
    console.error("Error ophalen zorgverlener:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van zorgverlener",
      error: error.message
    });
  }
};

// ==================== ZORGINSTELLINGEN ====================

exports.ophaalZorginstellingen = async (req, res) => {
  try {
    const { type, actief } = req.query;

    const whereClause = {};
    if (type) {
      whereClause.type_instelling = type;
    }
    if (actief !== undefined) {
      whereClause.is_actief = actief === 'true';
    }

    const zorginstellingen = await Zorginstelling.findAll({
      where: whereClause,
      include: [
        {
          model: Distrikten,
          as: 'distrikt',
          attributes: ['id', 'distrikt_code', 'distriktnaam']
        },
        {
          model: Wijken,
          as: 'wijk',
          attributes: ['id', 'wijk_code', 'wijknaam']
        }
      ],
      order: [['naam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: zorginstellingen
    });

  } catch (error) {
    console.error("Error ophalen zorginstellingen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van zorginstellingen",
      error: error.message
    });
  }
};

exports.ophaalZorginstellingById = async (req, res) => {
  try {
    const { id } = req.params;

    const zorginstelling = await Zorginstelling.findByPk(id, {
      include: [
        {
          model: Distrikten,
          as: 'distrikt',
          attributes: ['id', 'distrikt_code', 'distriktnaam']
        },
        {
          model: Wijken,
          as: 'wijk',
          attributes: ['id', 'wijk_code', 'wijknaam']
        },
        {
          model: ZorgverlenerInstelling,
          as: 'zorgverleners',
          where: { is_actief: true },
          required: false,
          include: [
            {
              model: Zorgverlener,
              as: 'zorgverlener',
              attributes: ['id', 'identificatienummer', 'registratie_nummer', 'specialisatie', 'type_zorgverlener']
            }
          ]
        }
      ]
    });

    if (!zorginstelling) {
      return res.status(404).json({
        success: false,
        message: "Zorginstelling niet gevonden"
      });
    }

    return res.status(200).json({
      success: true,
      data: zorginstelling
    });

  } catch (error) {
    console.error("Error ophalen zorginstelling:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van zorginstelling",
      error: error.message
    });
  }
};

// ==================== VERZEKERAARS ====================

exports.ophaalVerzekeraars = async (req, res) => {
  try {
    const { actief } = req.query;

    const whereClause = {};
    if (actief !== undefined) {
      whereClause.is_actief = actief === 'true';
    }

    const verzekeraars = await Verzekeraar.findAll({
      where: whereClause,
      order: [['verzekeraar_naam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: verzekeraars
    });

  } catch (error) {
    console.error("Error ophalen verzekeraars:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van verzekeraars",
      error: error.message
    });
  }
};

exports.ophaalVerzekeraarById = async (req, res) => {
  try {
    const { id } = req.params;

    const verzekeraar = await Verzekeraar.findByPk(id);

    if (!verzekeraar) {
      return res.status(404).json({
        success: false,
        message: "Verzekeraar niet gevonden"
      });
    }

    return res.status(200).json({
      success: true,
      data: verzekeraar
    });

  } catch (error) {
    console.error("Error ophalen verzekeraar:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van verzekeraar",
      error: error.message
    });
  }
};

// ==================== REFERENTIEDATA ====================

exports.ophaalDistrikten = async (req, res) => {
  try {
    const distrikten = await Distrikten.findAll({
      include: [
        {
          model: Wijken,
          as: 'wijken',
          attributes: ['id', 'wijk_code', 'wijknaam']
        }
      ],
      order: [['distriktnaam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: distrikten
    });

  } catch (error) {
    console.error("Error ophalen distrikten:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van distrikten",
      error: error.message
    });
  }
};

exports.ophaalWijken = async (req, res) => {
  try {
    const { distrikt_id } = req.query;

    const whereClause = {};
    if (distrikt_id) {
      whereClause.distrikten_id = distrikt_id;
    }

    const wijken = await Wijken.findAll({
      where: whereClause,
      include: [
        {
          model: Distrikten,
          as: 'distrikt',
          attributes: ['id', 'distrikt_code', 'distriktnaam']
        }
      ],
      order: [['wijknaam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: wijken
    });

  } catch (error) {
    console.error("Error ophalen wijken:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van wijken",
      error: error.message
    });
  }
};

exports.ophaalLanden = async (req, res) => {
  try {
    const landen = await Landen.findAll({
      order: [['landnaam', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: landen
    });

  } catch (error) {
    console.error("Error ophalen landen:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van landen",
      error: error.message
    });
  }
};

// ==================== AUDIT LOG ====================

exports.ophaalAuditLog = async (req, res) => {
  try {
    const { identificatienummer } = req.params;
    const { actie_type, limit } = req.query;

    if (!identificatienummer) {
      return res.status(400).json({
        success: false,
        message: "Identificatienummer is verplicht"
      });
    }

    const dossier = await Gezondheidsdossier.findOne({
      where: { identificatienummer: identificatienummer }
    });

    if (!dossier) {
      return res.status(404).json({
        success: false,
        message: "Gezondheidsdossier niet gevonden"
      });
    }

    const whereClause = { gezondheidsdossier_id: dossier.id };
    if (actie_type) {
      whereClause.actie_type = actie_type;
    }

    const auditLogs = await GezondheidsregisterAudit.findAll({
      where: whereClause,
      order: [['tijdstip', 'DESC']],
      limit: limit ? parseInt(limit) : 100
    });

    return res.status(200).json({
      success: true,
      data: auditLogs
    });

  } catch (error) {
    console.error("Error ophalen audit log:", error);
    return res.status(500).json({
      success: false,
      message: "Fout bij ophalen van audit log",
      error: error.message
    });
  }
};
