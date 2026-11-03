// Temporary demo data layer. Shapes mirror future database tables
// (products, suppliers) so swapping to persistent records is a data-source change only.
import container from "@/assets/p-container.jpg";
import cups from "@/assets/p-cups.jpg";
import bags from "@/assets/p-bags.jpg";
import cutlery from "@/assets/p-cutlery.jpg";
import boxes from "@/assets/p-boxes.jpg";
import tote from "@/assets/p-tote.jpg";
import wrap from "@/assets/p-wrap.jpg";

export type Bi = { en: string; ar: string };

export const CATEGORIES = [
  { id: "containers", en: "Food Containers", ar: "علب الطعام" },
  { id: "cups", en: "Cups and Lids", ar: "أكواب وأغطية" },
  { id: "paper-bags", en: "Paper Bags", ar: "أكياس ورقية" },
  { id: "shopping-bags", en: "Shopping Bags", ar: "أكياس تسوق" },
  { id: "cutlery", en: "Cutlery", ar: "أدوات المائدة" },
  { id: "boxes", en: "Boxes and Cartons", ar: "صناديق وكراتين" },
  { id: "wrapping", en: "Wrapping Materials", ar: "مواد التغليف" },
  { id: "other", en: "Other Sustainable Packaging", ar: "تغليف مستدام آخر" },
] as const;
export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const MATERIALS = [
  { id: "bagasse", en: "Sugarcane bagasse", ar: "تفل قصب السكر" },
  { id: "kraft", en: "Kraft paper", ar: "ورق كرافت" },
  { id: "pla", en: "Plant-based PLA", ar: "PLA نباتي" },
  { id: "wood", en: "Birch wood", ar: "خشب البتولا" },
  { id: "cardboard", en: "Recycled cardboard", ar: "كرتون معاد تدويره" },
  { id: "cotton", en: "Organic cotton", ar: "قطن عضوي" },
  { id: "beeswax", en: "Beeswax & cotton", ar: "شمع العسل والقطن" },
] as const;
export type MaterialId = (typeof MATERIALS)[number]["id"];

export const ATTRIBUTES = [
  { id: "compostable", en: "Compostable", ar: "قابل للتحلل" },
  { id: "recyclable", en: "Recyclable", ar: "قابل لإعادة التدوير" },
  { id: "reusable", en: "Reusable", ar: "قابل لإعادة الاستخدام" },
  { id: "plastic-free", en: "Plastic-free", ar: "خالٍ من البلاستيك" },
  { id: "food-safe", en: "Food-safe", ar: "آمن للطعام" },
  { id: "local", en: "Locally made", ar: "صناعة محلية" },
] as const;
export type AttributeId = (typeof ATTRIBUTES)[number]["id"];

export type Supplier = { id: string; name: Bi; city: Bi; verified: boolean; since: number };

export const SUPPLIERS: Supplier[] = [
  { id: "zaytoun", name: { en: "Zaytoun Pack Co.", ar: "زيتون للتغليف" }, city: { en: "Nablus", ar: "نابلس" }, verified: true, since: 2019 },
  { id: "khalil", name: { en: "Al-Khalil Green Paper", ar: "الخليل للورق الأخضر" }, city: { en: "Hebron", ar: "الخليل" }, verified: true, since: 2016 },
  { id: "ramallah", name: { en: "Ramallah EcoSupply", ar: "رام الله إيكو" }, city: { en: "Ramallah", ar: "رام الله" }, verified: false, since: 2022 },
  { id: "jenin", name: { en: "Jenin Natural Goods", ar: "جنين للمنتجات الطبيعية" }, city: { en: "Jenin", ar: "جنين" }, verified: true, since: 2020 },
];

export type Product = {
  id: string;
  name: Bi;
  description: Bi;
  category: CategoryId;
  material: MaterialId;
  attributes: AttributeId[];
  price: number; // ILS
  unit: Bi;
  moq: number;
  supplierId: string;
  image: string;
  sizes: string[];
  specs: { label: Bi; value: Bi }[];
  certification: "documented" | "pending" | "none";
  plasticSavedG: number; // illustrative grams of plastic avoided per unit
  stock?: number;
  composition?: string;
  volumeDiscounts?: {min_quantity:number;unit_price:number}[];
  documents?: {name:string;url:string}[];
  images?: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "bagasse-clamshell",
    name: { en: "Bagasse Clamshell Box", ar: "علبة صدفية من تفل القصب" },
    description: { en: "Sturdy, grease-resistant takeaway box molded from sugarcane fiber. Microwave and freezer safe.", ar: "علبة طعام متينة ومقاومة للدهون مصنوعة من ألياف قصب السكر، آمنة للميكروويف والتجميد." },
    category: "containers", material: "bagasse", attributes: ["compostable", "plastic-free", "food-safe"],
    price: 0.65, unit: { en: "per unit", ar: "للقطعة" }, moq: 500, supplierId: "zaytoun", image: container,
    sizes: ["6\" × 6\"", "8\" × 8\"", "9\" × 6\""],
    specs: [
      { label: { en: "Weight", ar: "الوزن" }, value: { en: "28 g", ar: "28 غ" } },
      { label: { en: "Heat range", ar: "مدى الحرارة" }, value: { en: "-20°C to 120°C", ar: "-20 إلى 120 درجة" } },
      { label: { en: "Breakdown", ar: "التحلل" }, value: { en: "~90 days industrial compost", ar: "~90 يوماً في التسميد الصناعي" } },
    ],
    certification: "documented", plasticSavedG: 22,
  },
  {
    id: "kraft-cup-12",
    name: { en: "Kraft Cup with Plant-based Lid", ar: "كوب كرافت بغطاء نباتي" },
    description: { en: "Double-wall kraft paper cup for hot drinks, paired with a PLA lid. Ideal for cafés.", ar: "كوب ورقي مزدوج الجدار للمشروبات الساخنة مع غطاء PLA. مثالي للمقاهي." },
    category: "cups", material: "kraft", attributes: ["compostable", "food-safe"],
    price: 0.48, unit: { en: "per unit", ar: "للقطعة" }, moq: 1000, supplierId: "khalil", image: cups,
    sizes: ["8 oz", "12 oz", "16 oz"],
    specs: [
      { label: { en: "Wall", ar: "الجدار" }, value: { en: "Double wall", ar: "مزدوج" } },
      { label: { en: "Lining", ar: "البطانة" }, value: { en: "Aqueous coating", ar: "طلاء مائي" } },
    ],
    certification: "documented", plasticSavedG: 14,
  },
  {
    id: "kraft-bag-twisted",
    name: { en: "Kraft Bag, Twisted Handle", ar: "كيس كرافت بمقبض ملفوف" },
    description: { en: "Recyclable brown kraft carrier bag with twisted paper handles for retail and takeaway.", ar: "كيس كرافت بني قابل لإعادة التدوير بمقابض ورقية للمتاجر والطلبات الخارجية." },
    category: "paper-bags", material: "kraft", attributes: ["recyclable", "plastic-free", "local"],
    price: 0.9, unit: { en: "per unit", ar: "للقطعة" }, moq: 300, supplierId: "khalil", image: bags,
    sizes: ["S 18×22 cm", "M 26×32 cm", "L 32×40 cm"],
    specs: [{ label: { en: "Paper weight", ar: "وزن الورق" }, value: { en: "100 gsm", ar: "100 غ/م²" } }],
    certification: "pending", plasticSavedG: 8,
  },
  {
    id: "birch-cutlery-set",
    name: { en: "Birch Wood Cutlery Set", ar: "طقم أدوات خشب البتولا" },
    description: { en: "Smooth, splinter-free fork, knife and spoon set. Individually paper-wrapped option available.", ar: "طقم شوكة وسكين وملعقة ناعم وخالٍ من الشظايا، مع خيار التغليف الورقي الفردي." },
    category: "cutlery", material: "wood", attributes: ["compostable", "plastic-free", "food-safe"],
    price: 45, unit: { en: "per pack of 100 sets", ar: "لعبوة 100 طقم" }, moq: 10, supplierId: "jenin", image: cutlery,
    sizes: ["16 cm"],
    specs: [{ label: { en: "Finish", ar: "التشطيب" }, value: { en: "Untreated, polished", ar: "غير معالج، مصقول" } }],
    certification: "documented", plasticSavedG: 9,
  },
  {
    id: "recycled-mailer",
    name: { en: "Recycled Corrugated Cartons", ar: "كراتين مموجة معاد تدويرها" },
    description: { en: "Mailer boxes and shipping cartons made from 100% recycled fiber.", ar: "صناديق شحن وتوصيل مصنوعة من ألياف معاد تدويرها بنسبة 100%." },
    category: "boxes", material: "cardboard", attributes: ["recyclable", "plastic-free", "local"],
    price: 2.4, unit: { en: "per unit", ar: "للقطعة" }, moq: 200, supplierId: "ramallah", image: boxes,
    sizes: ["20×15×8 cm", "30×22×12 cm", "40×30×20 cm"],
    specs: [{ label: { en: "Flute", ar: "التموج" }, value: { en: "E-flute / B-flute", ar: "E / B" } }],
    certification: "none", plasticSavedG: 0,
  },
  {
    id: "cotton-tote",
    name: { en: "Organic Cotton Tote", ar: "حقيبة قطن عضوي" },
    description: { en: "Durable reusable shopping tote — customizable with your store's logo.", ar: "حقيبة تسوق متينة قابلة لإعادة الاستخدام، يمكن طباعة شعار متجرك عليها." },
    category: "shopping-bags", material: "cotton", attributes: ["reusable", "plastic-free"],
    price: 6.5, unit: { en: "per unit", ar: "للقطعة" }, moq: 100, supplierId: "zaytoun", image: tote,
    sizes: ["38×42 cm"],
    specs: [{ label: { en: "Fabric", ar: "القماش" }, value: { en: "220 gsm canvas", ar: "كانفاس 220 غ/م²" } }],
    certification: "pending", plasticSavedG: 300,
  },
  {
    id: "beeswax-glassine",
    name: { en: "Beeswax Wraps & Glassine Rolls", ar: "أغلفة شمع العسل ولفائف الغلاسين" },
    description: { en: "Reusable beeswax wraps and compostable glassine paper to replace cling film.", ar: "أغلفة شمع عسل قابلة لإعادة الاستخدام وورق غلاسين قابل للتحلل بديلاً عن النايلون اللاصق." },
    category: "wrapping", material: "beeswax", attributes: ["reusable", "compostable", "food-safe"],
    price: 38, unit: { en: "per pack", ar: "للعبوة" }, moq: 20, supplierId: "jenin", image: wrap,
    sizes: ["Pack of 3", "50 m roll"],
    specs: [{ label: { en: "Lifespan", ar: "العمر" }, value: { en: "Up to 12 months (wraps)", ar: "حتى 12 شهراً (الأغلفة)" } }],
    certification: "none", plasticSavedG: 120,
  },
  {
    id: "bagasse-bowl",
    name: { en: "Bagasse Soup Bowl", ar: "وعاء شوربة من تفل القصب" },
    description: { en: "Leak-resistant round bowl for soups, salads and hot dishes.", ar: "وعاء دائري مقاوم للتسرب للشوربات والسلطات والأطباق الساخنة." },
    category: "containers", material: "bagasse", attributes: ["compostable", "plastic-free", "food-safe"],
    price: 0.55, unit: { en: "per unit", ar: "للقطعة" }, moq: 500, supplierId: "ramallah", image: container,
    sizes: ["12 oz", "16 oz", "24 oz"],
    specs: [{ label: { en: "Weight", ar: "الوزن" }, value: { en: "18 g", ar: "18 غ" } }],
    certification: "pending", plasticSavedG: 15,
  },
];

export const getSupplier = (id: string) => SUPPLIERS.find((s) => s.id === id);
export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const labelOf = <T extends { id: string; en: string; ar: string }>(list: readonly T[], id: string) =>
  list.find((x) => x.id === id);
