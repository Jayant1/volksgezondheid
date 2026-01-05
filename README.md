# volksgezondheid API - Gezondheidsregister

REST API voor het Ministerie van Volksgezondheid - Gezondheidsregister Systeem.

## Beschrijving

Deze API biedt toegang tot het gezondheidsregister systeem voor het beheer van:
- Gezondheidsdossiers
- Zorgverleners
- Zorginstellingen
- Verzekeraars
- Medische gegevens (allergieen, medicaties, vaccinaties, etc.)

## Installatie

```bash
cd app
npm install
```

## Configuratie

De database configuratie bevindt zich in `app/config/database.json`. Pas de credentials aan voor uw omgeving.

## Starten

### Development
```bash
cd app
npm run dev
```

### Production
```bash
cd app
npm run production
```

### Met PM2
```bash
pm2 start ecosystem.config.js --env production
```

## API Documentatie

Na het starten van de server is de Swagger documentatie beschikbaar op:
- Development: `http://localhost:3001/api/docs`
- Production: `https://volksgezondheid-api.gov.sr:3001/api/docs`

## API Endpoints

### Gezondheidsdossier
- `GET /api/dossier/:identificatienummer` - Ophalen van gezondheidsdossier
- `GET /api/dossier/compleet/:identificatienummer` - Ophalen van compleet dossier

### Medische Gegevens
- `GET /api/allergieen/:identificatienummer` - Ophalen van allergieen
- `GET /api/medicaties/:identificatienummer` - Ophalen van medicaties
- `GET /api/vaccinaties/:identificatienummer` - Ophalen van vaccinaties
- `GET /api/aandoeningen/:identificatienummer` - Ophalen van medische aandoeningen
- `GET /api/keuringen/:identificatienummer` - Ophalen van medische keuringen
- `GET /api/consulten/:identificatienummer` - Ophalen van consulten
- `GET /api/opnames/:identificatienummer` - Ophalen van ziekenhuisopnames
- `GET /api/lab-uitslagen/:identificatienummer` - Ophalen van laboratorium uitslagen
- `GET /api/beeldmateriaal/:identificatienummer` - Ophalen van medisch beeldmateriaal
- `GET /api/zwangerschappen/:identificatienummer` - Ophalen van zwangerschappen
- `GET /api/verzekeringen/:identificatienummer` - Ophalen van verzekeringen
- `GET /api/noodcontacten/:identificatienummer` - Ophalen van noodcontacten

### Zorgverleners
- `GET /api/zorgverleners` - Ophalen van alle zorgverleners
- `GET /api/zorgverleners/:id` - Ophalen van specifieke zorgverlener
- `GET /api/zorgverlener/identificatie/:identificatienummer` - Ophalen op identificatienummer

### Zorginstellingen
- `GET /api/zorginstellingen` - Ophalen van alle zorginstellingen
- `GET /api/zorginstellingen/:id` - Ophalen van specifieke zorginstelling

### Verzekeraars
- `GET /api/verzekeraars` - Ophalen van alle verzekeraars
- `GET /api/verzekeraars/:id` - Ophalen van specifieke verzekeraar

### Referentiedata
- `GET /api/distrikten` - Ophalen van alle distrikten
- `GET /api/wijken` - Ophalen van alle wijken
- `GET /api/landen` - Ophalen van alle landen

### Audit
- `GET /api/audit/:identificatienummer` - Ophalen van audit log

## Database Schema

De API ondersteunt de volgende tabellen:
- `landen` - Landen referentietabel
- `distrikten` - Distrikten referentietabel
- `wijken` - Wijken referentietabel
- `zorgverlener` - Zorgverleners (artsen, verpleegkundigen, etc.)
- `zorginstelling` - Zorginstellingen (ziekenhuizen, klinieken, etc.)
- `verzekeraar` - Zorgverzekeraars
- `zorgverlener_instelling` - Koppeling zorgverleners en instellingen
- `gezondheidsdossier` - Hoofddossier per persoon
- `allergie` - Allergieen
- `medicatie` - Medicaties
- `vaccinatie` - Vaccinaties
- `medische_aandoening` - Medische aandoeningen
- `medische_keuring` - Medische keuringen
- `consult` - Consulten
- `ziekenhuisopname` - Ziekenhuisopnames
- `laboratorium_uitslag` - Lab uitslagen
- `medisch_beeldmateriaal` - Beeldmateriaal (rontgen, CT, MRI, etc.)
- `zwangerschap` - Zwangerschappen
- `verzekering` - Verzekeringen
- `noodcontact` - Noodcontacten
- `gezondheidsregister_audit` - Audit log

## Licentie

MIT License

## Auteur

Mathoera Jayant
