/**
 * Product catalogue backing the home page "Product Family Map" and the
 * product detail page.
 *
 * NOTE: prices and specifications below are PLACEHOLDERS so the detail page
 * has realistic content to lay out. Replace them with real figures before
 * this goes in front of customers.
 */

// ── Sony ───────────────────────────────────────────────────────
import sonySncCh160 from '../assets/products/sony-snc-ch160-ip-camera.jpg'
import sonyIpelaBullet from '../assets/products/7793532-6577.jpg'
import sonySrgPtz from '../assets/products/images (7).jpg'
import sonyPtzSpeedDome from '../assets/products/sony-ptz-dome.jpg'
import sonyVandalDome from '../assets/products/sony-vandal-dome.jpg'
import sonyTurret from '../assets/products/sony-turret.jpg'
import sonyOutdoorBullet from '../assets/products/sony-bullet-wall.jpg'
import sonyIndoorPanTilt from '../assets/products/ChatGPT Image Sep 20, 2026, 02_47_35 AM.png'

// ── Samsung ────────────────────────────────────────────────────
import samsungIrDome from '../assets/products/images (1).jpg'
import samsungVandalDome from '../assets/products/samsung-vandal-dome.jpg'
import samsungPtzSpeedDome from '../assets/products/samsung-ptz-dome.jpg'
import samsungTurret from '../assets/products/samsung-turret.jpg'
import samsungSco1020r from '../assets/products/SCO-1020R__77596.webp'
import samsungSdhB74041 from '../assets/products/SDH-B74041_2_Supersize.jpg'
import samsungOutdoorBullet from '../assets/products/samsung-bullet-ir.jpg'
import samsungMiniCube from '../assets/products/samsung-mini-cube.jpg'

// ── BOSCH ──────────────────────────────────────────────────────
import boschNbe3703 from '../assets/products/BOS-NBE-3703-AL.webp'
import boschFlushDome from '../assets/products/61bP3br6H4L._AC_UF1000,1000_QL80_.jpg'
import boschPtzSpeedDome from '../assets/products/bosch-ptz-dome.jpg'
import boschVandalDome from '../assets/products/bosch-vandal-dome.jpg'
import boschOutdoorBullet from '../assets/products/bosch-bullet-wall.jpg'
import boschTurret from '../assets/products/bosch-turret.jpg'
import boschProfessionalRange from '../assets/products/images (6).jpg'
import boschSmartHome from '../assets/products/konfigurator_vorschau_res_1984x1116.png'

// ── Hikvision ──────────────────────────────────────────────────
import hikvisionPtz from '../assets/products/hikvision-ds-2de4225iw-de.jpg'
import hikvisionBullet from '../assets/products/DS-2CE16D0T-EXIPF-3.6mm-price-in-pakistan-hikvisionstore.pk_.png'
import hikvisionIpDome from '../assets/products/images (3).jpg'
import hikvisionTurret from '../assets/products/images (4).jpg'
import hikvisionMiniBullet from '../assets/products/images (5).jpg'
import hikvisionDoorStation from '../assets/products/images (24).jpg'
import hikvisionAccessTerminal from '../assets/products/images (25).jpg'
import hikvisionBarrierGate from '../assets/products/Untitled-design-2025-09-01T101621.663.jpg'

// ── EZVIZ ──────────────────────────────────────────────────────
import ezvizDualLensPt from '../assets/products/images (8).jpg'
import ezvizOutdoorPt from '../assets/products/images (10).jpg'
import ezvizIndoorPt from '../assets/products/images (15).jpg'
import ezvizSpotlightPt from '../assets/products/images (16).jpg'
import ezvizOutdoorWifi from '../assets/products/3HMfCDNH8nZfvktqCcnerh-1280-80.jpg'
import ezvizSmartLock from '../assets/products/images (19).jpg'
import ezvizDoorbell from '../assets/products/images (20).jpg'
import ezvizSolarDoorbellKit from '../assets/products/images (23).jpg'

// ── Extras: sold on the home page but outside the 8-per-brand family map ──
import hikvisionCctvKit from '../assets/products/CCTV-camera-price-in-lahore-4-FHD-CCTV-Cameras-Package-hikvisionstore.pk_-1200x1108.jpg'
import ezvizSmartLockCollection from '../assets/products/ChatGPT Image Sep 20, 2026, 02_36_23 AM.png'
import hikvisionAccessTerminals from '../assets/products/ChatGPT Image Sep 20, 2026, 03_21_04 AM.png'
import samsungDomeCamera from '../assets/products/remote-control-2mp-samsung-cctv-camera-for-household-surveillance-269.jpg'
import ezvizWallMountCamera from '../assets/products/images (17).jpg'

// ── Integrated solutions ──────────────────────────────────────
import solNvrRecorder from '../assets/products/sol-nvr-recorder.jpg'
import solCmsMonitor from '../assets/products/sol-cms-monitor.jpg'
import solRemoteLaptop from '../assets/products/sol-remote-laptop.jpg'
import solAlarmSensors from '../assets/products/sol-alarm-sensors.jpg'
import solSolarKit from '../assets/products/sol-solar-kit.jpg'
import solGateBarrier from '../assets/products/Untitled-design-2025-09-01T101621.663.jpg'

// ── Services ──────────────────────────────────────────────────
import svcGuards from '../assets/products/ChatGPT Image Sep 20, 2026, 03_11_33 AM.png'
import svcCctvInstall from '../assets/products/CCTV-camera-price-in-lahore-4-FHD-CCTV-Cameras-Package-hikvisionstore.pk_-1200x1108.jpg'
import svcAccessControl from '../assets/products/ChatGPT Image Sep 20, 2026, 02_36_23 AM.png'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: string
  brand: string
  title: string
  image: string
  /** Placeholder price in PKR. 0 renders as "Request a quote". */
  price: number
  /** Show the price as a starting point ("From PKR …"). */
  fromPrice?: boolean
  /** Overrides the default note shown beside the price. */
  priceNote?: string
  category: string
  description: string
  highlights: string[]
  specs: ProductSpec[]
}

type ProductType =
  | 'dome' | 'vandalDome' | 'bullet' | 'turret' | 'ptz' | 'box'
  | 'indoorPt' | 'outdoorPt' | 'lock' | 'doorbell' | 'doorStation'
  | 'accessTerminal' | 'barrier' | 'system' | 'kit'
  | 'nvr' | 'gateAccess' | 'perimeter' | 'remoteMonitoring' | 'offGrid' | 'cms'
  | 'guarding' | 'installation' | 'accessService'

interface TypeTemplate {
  category: string
  blurb: string
  highlights: string[]
  specs: ProductSpec[]
}

/**
 * Copy is written per device type and reused across brands, so every card
 * gets a coherent detail page without forty hand-written blurbs.
 */
const TEMPLATES: Record<ProductType, TypeTemplate> = {
  dome: {
    category: 'Dome camera',
    blurb: 'A discreet ceiling-mounted dome for lobbies, corridors and retail floors. The tinted housing conceals the lens direction, so people can see the camera is there without knowing exactly where it is pointed.',
    highlights: ['Wide-angle indoor coverage', 'Infrared night vision', 'Tamper-resistant housing', 'Ceiling or wall mount'],
    specs: [
      { label: 'Resolution', value: '2MP Full HD (1920×1080)' },
      { label: 'Lens', value: '2.8mm fixed' },
      { label: 'Night vision', value: 'Up to 20m infrared' },
      { label: 'Power', value: 'PoE or 12V DC' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  vandalDome: {
    category: 'Vandal-resistant dome',
    blurb: 'A reinforced dome built for places where the camera itself may be a target — stairwells, car parks and building entrances. The impact-rated housing keeps recording through knocks that would take an ordinary dome offline.',
    highlights: ['IK10 impact-rated housing', 'Weatherproof to IP67', 'Varifocal lens', 'True day/night switching'],
    specs: [
      { label: 'Resolution', value: '4MP (2560×1440)' },
      { label: 'Lens', value: '2.8–12mm varifocal' },
      { label: 'Night vision', value: 'Up to 30m infrared' },
      { label: 'Rating', value: 'IP67 / IK10' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  bullet: {
    category: 'Bullet camera',
    blurb: 'A directional outdoor camera for perimeters, driveways and yard boundaries. The visible barrel shape is deliberate — a bullet camera is as much a deterrent as a recording device.',
    highlights: ['Long-range infrared', 'Weatherproof to IP67', 'Adjustable wall bracket', 'Clear number-plate detail at range'],
    specs: [
      { label: 'Resolution', value: '2MP Full HD (1920×1080)' },
      { label: 'Lens', value: '3.6mm fixed' },
      { label: 'Night vision', value: 'Up to 30m infrared' },
      { label: 'Rating', value: 'IP67 weatherproof' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  turret: {
    category: 'Turret camera',
    blurb: 'A compact eyeball turret that aims anywhere without the glare problems of a dome. Because the lens sits outside the bubble, infrared light does not reflect back into the image at night.',
    highlights: ['No infrared glare', 'Three-axis adjustment', 'Compact low-profile body', 'Built-in microphone'],
    specs: [
      { label: 'Resolution', value: '4MP (2560×1440)' },
      { label: 'Lens', value: '2.8mm fixed' },
      { label: 'Night vision', value: 'Up to 30m infrared' },
      { label: 'Audio', value: 'Built-in microphone' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  ptz: {
    category: 'PTZ speed dome',
    blurb: 'A motorised pan-tilt-zoom dome that covers ground several fixed cameras would be needed for. Operators can sweep a whole forecourt, then zoom to read a face or a number plate at the far end of it.',
    highlights: ['360° continuous pan', 'Optical zoom', 'Automatic tracking', 'Preset patrol routes'],
    specs: [
      { label: 'Resolution', value: '2MP Full HD (1920×1080)' },
      { label: 'Optical zoom', value: '25× optical / 16× digital' },
      { label: 'Pan / tilt', value: '360° endless pan, 90° tilt' },
      { label: 'Night vision', value: 'Up to 100m infrared' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  box: {
    category: 'Box camera',
    blurb: 'A professional body camera taking interchangeable C/CS-mount lenses, so the field of view is chosen for the site rather than fixed at the factory. Common in broadcast, industrial and long-corridor installations.',
    highlights: ['Interchangeable lens mount', 'Professional image control', 'Wide dynamic range', 'Housing options available'],
    specs: [
      { label: 'Resolution', value: '2MP Full HD (1920×1080)' },
      { label: 'Lens mount', value: 'C/CS (lens sold separately)' },
      { label: 'Dynamic range', value: '120dB WDR' },
      { label: 'Power', value: 'PoE or 12V DC' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  indoorPt: {
    category: 'Indoor pan & tilt camera',
    blurb: 'A motorised indoor camera that follows movement around the room rather than watching one fixed angle. Suits living rooms, nurseries and small shops where one camera has to cover everything.',
    highlights: ['Motorised pan and tilt', 'Motion auto-tracking', 'Two-way audio', 'Mobile app alerts'],
    specs: [
      { label: 'Resolution', value: '2K (2304×1296)' },
      { label: 'Pan / tilt', value: '355° pan, 90° tilt' },
      { label: 'Audio', value: 'Two-way talk' },
      { label: 'Storage', value: 'microSD up to 512GB or cloud' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  outdoorPt: {
    category: 'Outdoor pan & tilt camera',
    blurb: 'A weatherproof pan-and-tilt camera for yards, driveways and shopfronts. Colour night vision and a built-in spotlight mean footage after dark stays usable rather than washing out to grey.',
    highlights: ['Colour night vision', 'Built-in spotlight and siren', 'Motion auto-tracking', 'Wi-Fi, no cabling run'],
    specs: [
      { label: 'Resolution', value: '2K+ (2560×1440)' },
      { label: 'Pan / tilt', value: '352° pan, 80° tilt' },
      { label: 'Night vision', value: 'Colour, up to 30m' },
      { label: 'Rating', value: 'IP65 weatherproof' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  lock: {
    category: 'Smart door lock',
    blurb: 'A keyless entry lock opening by fingerprint, PIN, card or phone. Useful where keys circulate too widely — you can issue a temporary code to a visitor and revoke it afterwards.',
    highlights: ['Fingerprint and PIN entry', 'Temporary guest codes', 'Mechanical key override', 'Low-battery warning'],
    specs: [
      { label: 'Unlock methods', value: 'Fingerprint, PIN, card, app, key' },
      { label: 'Fingerprint capacity', value: 'Up to 50 users' },
      { label: 'Battery life', value: 'Up to 8 months' },
      { label: 'Door thickness', value: '38–65mm' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  doorbell: {
    category: 'Video doorbell',
    blurb: 'A doorbell that shows who is outside before the door is opened, and records callers when nobody is home. Two-way audio lets a delivery be redirected without answering the door at all.',
    highlights: ['See callers before opening', 'Two-way audio', 'Motion-triggered recording', 'Indoor chime included'],
    specs: [
      { label: 'Resolution', value: '2K (2560×1920)' },
      { label: 'Field of view', value: '166° diagonal' },
      { label: 'Power', value: 'Battery or wired' },
      { label: 'Storage', value: 'microSD or cloud' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  doorStation: {
    category: 'Video door station',
    blurb: 'An entrance intercom for apartment blocks and gated compounds. Residents see and speak to callers from an indoor monitor or their phone, and let them in without walking to the gate.',
    highlights: ['Video intercom to indoor monitor', 'PIN and card entry', 'Vandal-resistant face', 'Remote door release'],
    specs: [
      { label: 'Camera', value: '2MP wide-angle' },
      { label: 'Entry methods', value: 'Call, PIN, card' },
      { label: 'Network', value: 'PoE / TCP-IP' },
      { label: 'Rating', value: 'IP65 / IK08' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  accessTerminal: {
    category: 'Access control terminal',
    blurb: 'A door terminal that records who entered and when, using fingerprint, card or face recognition. Doubles as an attendance system, with exportable logs per employee.',
    highlights: ['Fingerprint, card and face options', 'Attendance reporting', 'Anti-passback support', 'Integrates with door locks'],
    specs: [
      { label: 'Verification', value: 'Fingerprint / card / PIN' },
      { label: 'User capacity', value: 'Up to 3,000 users' },
      { label: 'Log capacity', value: 'Up to 100,000 records' },
      { label: 'Network', value: 'TCP/IP, Wiegand' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  barrier: {
    category: 'Barrier gate',
    blurb: 'A vehicle barrier for car parks, compounds and commercial yards. Pairs with number-plate recognition or card readers so authorised vehicles pass without a guard on the gate.',
    highlights: ['Fast open and close cycle', 'Number-plate recognition ready', 'Anti-crash vehicle detection', 'Remote and card control'],
    specs: [
      { label: 'Boom length', value: '3m / 4.5m / 6m options' },
      { label: 'Open time', value: '1.5–6 seconds' },
      { label: 'Control', value: 'Remote, card reader, ANPR' },
      { label: 'Duty cycle', value: 'Continuous operation' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  guarding: {
    category: 'Manned guarding',
    blurb: 'Trained, uniformed guards posted to your premises, vetted and supervised by us. Cameras record what happened; a guard on site stops it happening, and handles the visitors, deliveries and incidents no system can.',
    highlights: ['PSQCA-licensed and police-verified', 'Uniformed and supervised', 'Day, night or 24-hour cover', 'Relief cover guaranteed'],
    specs: [
      { label: 'Shifts', value: '8, 12 or 24-hour posts' },
      { label: 'Vetting', value: 'Police verification and reference checks' },
      { label: 'Supervision', value: 'Mobile supervisor visits and roll call' },
      { label: 'Reporting', value: 'Daily occurrence book, monthly summary' },
      { label: 'Contract', value: 'Monthly, per guard posted' },
    ],
  },
  installation: {
    category: 'CCTV installation',
    blurb: 'Survey, supply and installation of a complete camera system, handed over configured and working. We plan camera positions around the site’s actual blind spots rather than fitting a fixed package.',
    highlights: ['Free site survey and quotation', 'Concealed, professional cabling', 'Configured with app access', 'Staff walkthrough on handover'],
    specs: [
      { label: 'Included', value: 'Survey, cameras, recorder, cabling, install' },
      { label: 'Timeline', value: 'Typically 1–3 days per site' },
      { label: 'Handover', value: 'App set up, staff briefed' },
      { label: 'Aftercare', value: 'Optional annual maintenance' },
      { label: 'Warranty', value: '2 years on equipment, 1 year on labour' },
    ],
  },
  accessService: {
    category: 'Access control & monitoring',
    blurb: 'Entry management across doors, gates and barriers, installed and monitored as one system. Covers who may enter, when, and what happens when someone tries who should not.',
    highlights: ['Smart locks, readers and terminals', 'Per-person, per-door permissions', 'Entry logs and attendance reports', 'Integrates with your CCTV'],
    specs: [
      { label: 'Hardware', value: 'EZVIZ and Hikvision locks, readers, terminals' },
      { label: 'Methods', value: 'Fingerprint, card, PIN, face, mobile' },
      { label: 'Logging', value: 'Timestamped per person and per door' },
      { label: 'Integration', value: 'Links to CCTV and alarm systems' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  nvr: {
    category: 'NVR, recording & cloud',
    blurb: 'Network video recorders with cloud backup, so footage survives even if the recorder itself is stolen or damaged. Sized to how many cameras you run and how far back you need to look.',
    highlights: ['8 / 16 / 32-channel options', 'Cloud backup of critical events', 'RAID storage on larger units', 'Footage export for evidence'],
    specs: [
      { label: 'Channels', value: '8, 16 or 32 camera inputs' },
      { label: 'Storage', value: '2TB–24TB, expandable' },
      { label: 'Retention', value: '30–90 days, depending on channels' },
      { label: 'Cloud', value: 'Event and clip backup' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  gateAccess: {
    category: 'Main gate access control',
    blurb: 'Controls who drives or walks through the main gate, and keeps a record of every entry. Combines barriers, readers and number-plate recognition so authorised vehicles pass without a guard opening anything by hand.',
    highlights: ['Number-plate recognition', 'Card, PIN and remote entry', 'Visitor and contractor logging', 'Intercom to the gate house'],
    specs: [
      { label: 'Vehicle entry', value: 'ANPR, RFID card, remote' },
      { label: 'Pedestrian entry', value: 'Card, PIN, fingerprint' },
      { label: 'Barrier', value: '3m / 4.5m / 6m boom' },
      { label: 'Logging', value: 'Timestamped entry and exit records' },
      { label: 'Warranty', value: '1 year' },
    ],
  },
  perimeter: {
    category: 'Geo-fencing & laser detection',
    blurb: 'Draws an invisible boundary around the site and raises an alarm the moment it is crossed. Laser and infrared beam detectors cover open ground where a camera alone would miss someone at night.',
    highlights: ['Virtual tripwire and intrusion zones', 'Laser / IR beam perimeter detection', 'Instant phone and siren alerts', 'Filters out animals and weather'],
    specs: [
      { label: 'Detection', value: 'Geo-fence zones, tripwire, beam break' },
      { label: 'Beam range', value: 'Up to 100m per pair' },
      { label: 'Alerts', value: 'App push, SMS, siren, control room' },
      { label: 'False alarm filter', value: 'Human / vehicle classification' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  remoteMonitoring: {
    category: 'Remote off-site surveillance',
    blurb: 'Your cameras watched from our monitoring centre rather than by someone on site. Operators verify alarms and escalate real incidents, which is the difference between an alert and a response.',
    highlights: ['24/7 monitored by trained operators', 'Alarm verification before escalation', 'Live view from phone or desktop', 'Monthly activity reporting'],
    specs: [
      { label: 'Coverage', value: '24/7/365 monitoring' },
      { label: 'Response', value: 'Verify, then escalate to keyholder or police' },
      { label: 'Access', value: 'Mobile and desktop live view' },
      { label: 'Reporting', value: 'Monthly incident summary' },
      { label: 'Contract', value: 'Monthly or annual' },
    ],
  },
  offGrid: {
    category: 'Off-grid surveillance',
    blurb: 'Solar-powered cameras with battery storage and 4G, for sites with no mains power and no cabling — plots, farmland, construction sites and remote compounds. Runs through cloudy spells on stored charge.',
    highlights: ['Solar panel and battery included', '4G SIM, no broadband needed', 'Days of autonomy without sun', 'Deployed in hours, no trenching'],
    specs: [
      { label: 'Power', value: 'Solar panel + rechargeable battery' },
      { label: 'Autonomy', value: 'Up to 7 days without sunlight' },
      { label: 'Connectivity', value: '4G LTE (SIM) or Wi-Fi' },
      { label: 'Storage', value: 'Local microSD + cloud' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  cms: {
    category: 'Access protection CMS',
    blurb: 'One dashboard across every site, camera and door you operate. Instead of logging into each building separately, permissions, alarms and footage are managed centrally and audited in one place.',
    highlights: ['All sites in a single dashboard', 'Central permission management', 'Full audit trail of access events', 'Role-based operator accounts'],
    specs: [
      { label: 'Scale', value: 'Unlimited sites and doors' },
      { label: 'Users', value: 'Role-based accounts and permissions' },
      { label: 'Audit', value: 'Exportable access and alarm logs' },
      { label: 'Deployment', value: 'On-premise server or cloud' },
      { label: 'Support', value: 'Annual licence with updates' },
    ],
  },
  kit: {
    category: 'Complete CCTV package',
    blurb: 'Everything a small site needs in one box — cameras, recorder, hard drive, cabling and connectors. Supplied as a matched set, so there is no guesswork about whether the parts work together.',
    highlights: ['Cameras, DVR and hard drive included', 'All cabling and connectors supplied', 'Mobile app viewing set up', 'Installation available'],
    specs: [
      { label: 'Cameras', value: '4 × 2MP Full HD' },
      { label: 'Recorder', value: '4-channel DVR' },
      { label: 'Storage', value: '1TB surveillance hard drive' },
      { label: 'Recording', value: 'Approx. 30 days continuous' },
      { label: 'Warranty', value: '2 years' },
    ],
  },
  system: {
    category: 'Complete system',
    blurb: 'A full line-up specified, supplied and installed as one system — cameras, recording, cabling and configuration. We survey the site first, then quote against what the premises actually need.',
    highlights: ['Free site survey', 'Professional installation', 'Configured and handed over', 'Ongoing maintenance available'],
    specs: [
      { label: 'Scope', value: 'Survey, supply, install, configure' },
      { label: 'Recording', value: 'NVR / DVR sized to the site' },
      { label: 'Remote access', value: 'Mobile and desktop apps' },
      { label: 'Support', value: 'Annual maintenance contract' },
      { label: 'Warranty', value: 'Per component' },
    ],
  },
}

interface Seed {
  id: string
  title: string
  image: string
  price: number
  type: ProductType
  fromPrice?: boolean
  priceNote?: string
}

const build = (brand: string, seeds: Seed[]): Product[] =>
  seeds.map(({ id, title, image, price, type, fromPrice, priceNote }) => {
    const t = TEMPLATES[type]
    return {
      id,
      brand,
      title,
      image,
      price,
      fromPrice,
      priceNote,
      category: t.category,
      description: t.blurb,
      highlights: t.highlights,
      specs: t.specs,
    }
  })

export const brandOrder = ['Sony', 'Samsung', 'BOSCH', 'Hikvision', 'EZVIZ'] as const

export const productsByBrand: Record<string, Product[]> = {
  Sony: build('Sony', [
    { id: 'sony-snc-ch160', title: 'Sony SNC-CH160 IP Camera', image: sonySncCh160, price: 42000, type: 'box' },
    { id: 'sony-ipela-bullet', title: 'Sony IPELA HD Bullet', image: sonyIpelaBullet, price: 38000, type: 'bullet' },
    { id: 'sony-srg-ptz', title: 'Sony SRG Series PTZ', image: sonySrgPtz, price: 165000, type: 'ptz' },
    { id: 'sony-ptz-speed-dome', title: 'Sony PTZ Speed Dome', image: sonyPtzSpeedDome, price: 142000, type: 'ptz' },
    { id: 'sony-vandal-dome', title: 'Sony Vandal-Resistant Dome', image: sonyVandalDome, price: 34000, type: 'vandalDome' },
    { id: 'sony-turret', title: 'Sony IR Turret Camera', image: sonyTurret, price: 26000, type: 'turret' },
    { id: 'sony-outdoor-bullet', title: 'Sony Outdoor Bullet', image: sonyOutdoorBullet, price: 29000, type: 'bullet' },
    { id: 'sony-indoor-pt', title: 'Sony Indoor Pan & Tilt', image: sonyIndoorPanTilt, price: 22000, type: 'indoorPt' },
  ]),
  Samsung: build('Samsung', [
    { id: 'samsung-ir-dome', title: 'Samsung IR Dome Camera', image: samsungIrDome, price: 16500, type: 'dome' },
    { id: 'samsung-vandal-dome', title: 'Samsung Vandal-Resistant Dome', image: samsungVandalDome, price: 24000, type: 'vandalDome' },
    { id: 'samsung-ptz-speed-dome', title: 'Samsung PTZ Speed Dome', image: samsungPtzSpeedDome, price: 118000, type: 'ptz' },
    { id: 'samsung-turret', title: 'Samsung IR Turret Camera', image: samsungTurret, price: 19000, type: 'turret' },
    { id: 'samsung-sco-1020r', title: 'Samsung SCO-1020R Bullet', image: samsungSco1020r, price: 21000, type: 'bullet' },
    { id: 'samsung-sdh-b74041', title: 'Samsung SDH-B74041 IR Bullet', image: samsungSdhB74041, price: 18500, type: 'bullet' },
    { id: 'samsung-outdoor-bullet', title: 'Samsung Outdoor Bullet', image: samsungOutdoorBullet, price: 20000, type: 'bullet' },
    { id: 'samsung-mini-cube', title: 'Samsung Mini Indoor Camera', image: samsungMiniCube, price: 13500, type: 'indoorPt' },
  ]),
  BOSCH: build('BOSCH', [
    { id: 'bosch-nbe-3703', title: 'Bosch NBE-3703-AL IP Bullet', image: boschNbe3703, price: 68000, type: 'bullet' },
    { id: 'bosch-flush-dome', title: 'Bosch FlexiDome Flush Mount', image: boschFlushDome, price: 54000, type: 'dome' },
    { id: 'bosch-ptz-speed-dome', title: 'Bosch AutoDome PTZ', image: boschPtzSpeedDome, price: 235000, type: 'ptz' },
    { id: 'bosch-vandal-dome', title: 'Bosch Vandal-Resistant Dome', image: boschVandalDome, price: 62000, type: 'vandalDome' },
    { id: 'bosch-outdoor-bullet', title: 'Bosch Outdoor IR Bullet', image: boschOutdoorBullet, price: 58000, type: 'bullet' },
    { id: 'bosch-turret', title: 'Bosch IR Turret Camera', image: boschTurret, price: 47000, type: 'turret' },
    { id: 'bosch-professional-range', title: 'Bosch Professional Range', image: boschProfessionalRange, price: 0, type: 'system' },
    { id: 'bosch-smart-home', title: 'Bosch Smart Home System', image: boschSmartHome, price: 0, type: 'system' },
  ]),
  Hikvision: build('Hikvision', [
    { id: 'hikvision-ds-2de4225iw', title: 'Hikvision DS-2DE4225IW PTZ', image: hikvisionPtz, price: 96000, type: 'ptz' },
    { id: 'hikvision-ds-2ce16d0t', title: 'Hikvision DS-2CE16D0T Bullet', image: hikvisionBullet, price: 9500, type: 'bullet' },
    { id: 'hikvision-ip-dome', title: 'Hikvision IP Dome Camera', image: hikvisionIpDome, price: 14500, type: 'dome' },
    { id: 'hikvision-turret', title: 'Hikvision IR Turret Camera', image: hikvisionTurret, price: 11000, type: 'turret' },
    { id: 'hikvision-mini-bullet', title: 'Hikvision Mini IP Bullet', image: hikvisionMiniBullet, price: 12500, type: 'bullet' },
    { id: 'hikvision-door-station', title: 'Hikvision Video Door Station', image: hikvisionDoorStation, price: 52000, type: 'doorStation' },
    { id: 'hikvision-access-terminal', title: 'Hikvision Access Terminal', image: hikvisionAccessTerminal, price: 46000, type: 'accessTerminal' },
    { id: 'hikvision-barrier-gate', title: 'Hikvision Barrier Gate', image: hikvisionBarrierGate, price: 185000, type: 'barrier' },
  ]),
  EZVIZ: build('EZVIZ', [
    { id: 'ezviz-dual-lens-pt', title: 'EZVIZ Dual-Lens Pan & Tilt', image: ezvizDualLensPt, price: 28000, type: 'outdoorPt' },
    { id: 'ezviz-outdoor-pt', title: 'EZVIZ Outdoor Pan & Tilt', image: ezvizOutdoorPt, price: 23000, type: 'outdoorPt' },
    { id: 'ezviz-indoor-pt', title: 'EZVIZ Indoor Pan & Tilt', image: ezvizIndoorPt, price: 12000, type: 'indoorPt' },
    { id: 'ezviz-spotlight-pt', title: 'EZVIZ Spotlight Pan & Tilt', image: ezvizSpotlightPt, price: 25500, type: 'outdoorPt' },
    { id: 'ezviz-outdoor-wifi', title: 'EZVIZ Outdoor Wi-Fi Camera', image: ezvizOutdoorWifi, price: 19500, type: 'outdoorPt' },
    { id: 'ezviz-smart-lock', title: 'EZVIZ Smart Door Lock', image: ezvizSmartLock, price: 54000, type: 'lock' },
    { id: 'ezviz-doorbell', title: 'EZVIZ Video Doorbell', image: ezvizDoorbell, price: 26000, type: 'doorbell' },
    { id: 'ezviz-solar-doorbell-kit', title: 'EZVIZ Solar Doorbell Kit', image: ezvizSolarDoorbellKit, price: 39000, type: 'doorbell' },
  ]),
}

/**
 * Catalogue entries featured on the home page (top picks) that deliberately
 * sit outside the family map, which stays at 8 cards per brand.
 */
export const extraProducts: Product[] = [
  ...build('Hikvision', [
    { id: 'hikvision-cctv-package', title: 'Hikvision 4-Channel CCTV Package', image: hikvisionCctvKit, price: 74000, type: 'kit' },
    { id: 'hikvision-access-terminals', title: 'Hikvision Access Control Terminals', image: hikvisionAccessTerminals, price: 0, type: 'accessTerminal' },
  ]),
  ...build('EZVIZ', [
    { id: 'ezviz-smart-lock-collection', title: 'EZVIZ Smart Lock Collection', image: ezvizSmartLockCollection, price: 0, type: 'lock' },
    { id: 'ezviz-wall-mount-camera', title: 'EZVIZ Outdoor Camera', image: ezvizWallMountCamera, price: 21500, type: 'outdoorPt' },
  ]),
  ...build('Samsung', [
    { id: 'samsung-dome-2mp', title: 'Samsung Dome Camera', image: samsungDomeCamera, price: 15000, type: 'dome' },
  ]),
]

/**
 * Integrated solutions sold by Shair Dill rather than by camera brand —
 * shown in their own home page section.
 */
export const SOLUTIONS_BRAND = 'Shair Dill'

export const solutionProducts: Product[] = build(SOLUTIONS_BRAND, [
  { id: 'sol-nvr-cloud', title: 'NVR Recorders & Cloud Storage', image: solNvrRecorder, price: 85000, type: 'nvr', fromPrice: true, priceNote: '8-channel NVR with 2TB storage' },
  { id: 'sol-gate-access', title: 'Main Gate Access Control', image: solGateBarrier, price: 245000, type: 'gateAccess', fromPrice: true, priceNote: 'barrier, reader and install' },
  { id: 'sol-geo-fencing', title: 'Geo-Fencing & Laser Detection', image: solAlarmSensors, price: 165000, type: 'perimeter', fromPrice: true, priceNote: 'per perimeter zone' },
  { id: 'sol-remote-surveillance', title: 'Remote Off-Site Surveillance', image: solRemoteLaptop, price: 12000, type: 'remoteMonitoring', fromPrice: true, priceNote: 'per month, per site' },
  { id: 'sol-off-grid', title: 'Off-Grid Solar Surveillance', image: solSolarKit, price: 135000, type: 'offGrid', fromPrice: true, priceNote: 'solar, battery and 4G camera' },
  { id: 'sol-access-cms', title: 'Access Protection CMS', image: solCmsMonitor, price: 95000, type: 'cms', fromPrice: true, priceNote: 'annual licence' },
])

/** Services shown in the "Our Services" section. */
export const serviceProducts: Product[] = build(SOLUTIONS_BRAND, [
  { id: 'svc-guard-services', title: 'Guard Services', image: svcGuards, price: 45000, type: 'guarding', fromPrice: true, priceNote: 'per guard, per month' },
  { id: 'svc-cctv-installation', title: 'CCTV Installation', image: svcCctvInstall, price: 74000, type: 'installation', fromPrice: true, priceNote: '4-camera system, installed' },
  { id: 'svc-access-control', title: 'Access Control', image: svcAccessControl, price: 62000, type: 'accessService', fromPrice: true, priceNote: 'per door, installed' },
])

export const allProducts: Product[] = [
  ...Object.values(productsByBrand).flat(),
  ...extraProducts,
  ...solutionProducts,
  ...serviceProducts,
]

export const findProduct = (id: string): Product | undefined =>
  allProducts.find((p) => p.id === id)

/** Other products from the same brand, for the "related" strip. */
export const relatedProducts = (product: Product, limit = 4): Product[] => {
  const pool = product.brand === SOLUTIONS_BRAND
    ? [...solutionProducts, ...serviceProducts]
    : (productsByBrand[product.brand] ?? [])
  return pool.filter((p) => p.id !== product.id).slice(0, limit)
}

export const formatPrice = (price: number): string =>
  price > 0 ? `PKR ${price.toLocaleString('en-PK')}` : 'Request a quote'

/** Price as shown on cards and the detail page, honouring "from" pricing. */
export const priceLabel = (product: Product): string =>
  product.price > 0 && product.fromPrice
    ? `From ${formatPrice(product.price)}`
    : formatPrice(product.price)
