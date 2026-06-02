import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",

      apexCircle: "Apex Circle",
      buildTagline: "Build Opportunities Xponentially",
      secureReliable: "Secure • Reliable • Rewarding",
      enterProtocol: "Enter Protocol",
      wealthLine: "Making wealth-building accessible to everyone.",

      integrity: "INTEGRITY",
      immutable: "IMMUTABLE",

      custody: "CUSTODY",
      none: "NONE",

      execution: "EXECUTION",
      automated: "AUTOMATED",

      chain: "CHAIN",
      polygon: "POLYGON BLOCKCHAIN",

      securityTerminal: "SECURITY TERMINAL",
      smartContract: "SMART CONTRACT",
      creatorAddress: "CREATOR ADDRESS",
      creatorPrivateKey: "CREATOR PRIVATE KEY",

      copy: "COPY",
      bscScan: "BSC SCAN",

      officialChannel: "Official channel",
      supportTeam: "Support team",

      builtOn: "Built on the BSC Chain Blockchain",
      decentralized: "Decentralized • Transparent • Secure",
      dashboard: "Dashboard",
welcomeBack: "Welcome back",
pleaseConnect: "Please connect wallet",

joinedSince: "Joined Since",
referredBy: "Referred By",

todaysIncome: "Today's Income",
todayLost: "Today Lost",
totalIncome: "Total Income",
totalLost: "Total Lost",
totalTeam: "Total Team",
totalBusiness: "Total Business",
myInvestment: "My Investment",
directBusiness: "Direct Business",

deposit: "Deposit",
withdraw: "Withdraw",

yourReferral: "Your Referral Link",
inviteGrow: "Invite friends & grow your team",
copy: "Copy",
depositToGetRef: "Please Make a deposit to get Refer Link.",
shareReferral: "Share this link to earn referral rewards automatically.",

activeCycles: "Active Cycles",
yourRunningCycles: "Your running earning cycles",
claimableRoi: "Claimable ROI",
claimRoi: "Claim ROI",

incomeHistory: "Income History",
viewAll: "View All",
noRecords: "No Records Found",

myIncome: "MY INCOME",
srno: "SR.NO.",
incomeType: "INCOME TYPE",
amount: "AMOUNT",
time: "TIME",
from: "FROM",
level: "LEVEL",
prev: "Prev",
next: "Next",
page: "Page",
total: "Total",

depositUsdt: "Deposit USDT",
enterAmount: "Enter amount",
depositNow: "Deposit Now",
processing: "Processing..."
    },
  },

  es: {
    translation: {
      welcome: "Bienvenido",
      login: "Iniciar sesión",

      apexCircle: "Círculo Apex",
      buildTagline: "Construye oportunidades exponencialmente",
      secureReliable: "Seguro • Confiable • Rentable",
      enterProtocol: "Entrar al Protocolo",
      wealthLine: "Haciendo accesible la creación de riqueza para todos.",

      integrity: "INTEGRIDAD",
      immutable: "INMUTABLE",

      custody: "CUSTODIA",
      none: "NINGUNA",

      execution: "EJECUCIÓN",
      automated: "AUTOMATIZADO",

      chain: "CADENA",
      polygon: "BLOCKCHAIN POLYGON",

      securityTerminal: "TERMINAL DE SEGURIDAD",
      smartContract: "CONTRATO INTELIGENTE",
      creatorAddress: "DIRECCIÓN DEL CREADOR",
      creatorPrivateKey: "CLAVE PRIVADA DEL CREADOR",

      copy: "COPIAR",
      bscScan: "BSC SCAN",

      officialChannel: "Canal oficial",
      supportTeam: "Equipo de soporte",

      builtOn: "Construido en la cadena BSC",
      decentralized: "Descentralizado • Transparente • Seguro",
    },
  },

  ru: {
    translation: {
      welcome: "Добро пожаловать",
      login: "Войти",

      apexCircle: "Apex Circle",
      buildTagline: "Создавайте возможности экспоненциально",
      secureReliable: "Безопасно • Надежно • Выгодно",
      enterProtocol: "Войти в протокол",
      wealthLine: "Делаем создание богатства доступным для всех.",

      integrity: "ЦЕЛОСТНОСТЬ",
      immutable: "НЕИЗМЕНЯЕМЫЙ",

      custody: "ХРАНЕНИЕ",
      none: "ОТСУТСТВУЕТ",

      execution: "ВЫПОЛНЕНИЕ",
      automated: "АВТОМАТИЧЕСКОЕ",

      chain: "СЕТЬ",
      polygon: "POLYGON BLOCKCHAIN",

      securityTerminal: "ТЕРМИНАЛ БЕЗОПАСНОСТИ",
      smartContract: "СМАРТ-КОНТРАКТ",
      creatorAddress: "АДРЕС СОЗДАТЕЛЯ",
      creatorPrivateKey: "ПРИВАТНЫЙ КЛЮЧ СОЗДАТЕЛЯ",

      copy: "КОПИРОВАТЬ",
      bscScan: "BSC SCAN",

      officialChannel: "Официальный канал",
      supportTeam: "Команда поддержки",

      builtOn: "Работает на блокчейне BSC",
      decentralized: "Децентрализовано • Прозрачно • Безопасно",
    },
  },

  th: {
    translation: {
      welcome: "ยินดีต้อนรับ",
      login: "เข้าสู่ระบบ",

      apexCircle: "Apex Circle",
      buildTagline: "สร้างโอกาสแบบทวีคูณ",
      secureReliable: "ปลอดภัย • เชื่อถือได้ • ให้ผลตอบแทน",
      enterProtocol: "เข้าสู่โปรโตคอล",
      wealthLine: "ทำให้การสร้างความมั่งคั่งเข้าถึงได้สำหรับทุกคน",

      integrity: "ความซื่อสัตย์",
      immutable: "ไม่เปลี่ยนแปลง",

      custody: "การดูแล",
      none: "ไม่มี",

      execution: "การดำเนินการ",
      automated: "อัตโนมัติ",

      chain: "เครือข่าย",
      polygon: "POLYGON BLOCKCHAIN",

      securityTerminal: "ศูนย์ความปลอดภัย",
      smartContract: "สมาร์ทคอนแทรค",
      creatorAddress: "ที่อยู่ผู้สร้าง",
      creatorPrivateKey: "คีย์ส่วนตัวของผู้สร้าง",

      copy: "คัดลอก",
      bscScan: "BSC SCAN",

      officialChannel: "ช่องทางอย่างเป็นทางการ",
      supportTeam: "ทีมสนับสนุน",

      builtOn: "สร้างบนบล็อกเชน BSC",
      decentralized: "กระจายศูนย์ • โปร่งใส • ปลอดภัย",
    },
  },

  zh: {
    translation: {
      welcome: "欢迎",
      login: "登录",

      apexCircle: "Apex Circle",
      buildTagline: "指数级构建机会",
      secureReliable: "安全 • 可靠 • 高回报",
      enterProtocol: "进入协议",
      wealthLine: "让财富增长触手可及",

      integrity: "诚信",
      immutable: "不可更改",

      custody: "托管",
      none: "无",

      execution: "执行",
      automated: "自动化",

      chain: "链",
      polygon: "POLYGON 区块链",

      securityTerminal: "安全终端",
      smartContract: "智能合约",
      creatorAddress: "创建者地址",
      creatorPrivateKey: "创建者私钥",

      copy: "复制",
      bscScan: "BSC SCAN",

      officialChannel: "官方频道",
      supportTeam: "支持团队",

      builtOn: "构建于 BSC 区块链",
      decentralized: "去中心化 • 透明 • 安全",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("selectedLang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;