import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { accountStrings } from "./account/strings";

export type Lang = "en" | "ar";

const dict = {
  en: {
    account: accountStrings.en,
    nav: { home: "Home", marketplace: "Marketplace", how: "How It Works", group: "Group Buying", impact: "Environmental Impact", about: "About Us", login: "Log in", signup: "Sign up", menu: "Menu" },
    demo: "Demo data",
    comingSoon: "Coming in the next phase",
    hero: {
      eyebrow: "Sustainable packaging marketplace · Palestine",
      title1: "Smarter Packaging.",
      title2: "Greener Business.",
      text: "Discover sustainable packaging solutions, connect with trusted suppliers, and make your business transition easier, smarter, and more affordable.",
      cta1: "Explore Sustainable Packaging",
      cta2: "Find My Best Alternative",
      stat1: "Product categories", stat2: "Local suppliers (demo)", stat3: "Prices in shekels",
    },
    intro: {
      eyebrow: "The challenge",
      title: "Palestine runs on single-use plastic. It doesn't have to.",
      text: "Restaurants, cafés and shops across Palestine rely on cheap plastic packaging that ends up in streets, valleys and the sea. Alternatives exist — but they're scattered, hard to compare and often priced for big buyers only. GreenSwitch brings them into one trusted marketplace built for local businesses.",
      p1: "One place to discover", p1t: "Verified suppliers and comparable product data in a single catalogue.",
      p2: "Fair pricing", p2t: "Group orders give small businesses the volume prices of large ones.",
      p3: "Measurable progress", p3t: "Estimate how much plastic your switch keeps out of the environment.",
    },
    how: {
      eyebrow: "How it works", title: "Five steps from plastic to planet-friendly",
      s1: "Tell us about your business", s1t: "Your sector, volumes and the packaging you use today.",
      s2: "Discover suitable alternatives", s2t: "Matched products across materials and categories.",
      s3: "Compare products, prices and suppliers", s3t: "Side-by-side specs, MOQs and shekel pricing.",
      s4: "Purchase individually or join group orders", s4t: "Order alone or pool demand for better prices.",
      s5: "Track your environmental impact", s5t: "Estimate plastic avoided over time.",
    },
    featured: { eyebrow: "Featured products", title: "Packaging your customers will notice", all: "View all products" },
    product: { moq: "MOQ", by: "by", verified: "Verified", unverified: "Not yet verified", details: "View details" },
    ai: {
      eyebrow: "Smart recommendations", title: "Your best alternative, recommended in seconds",
      text: "Our upcoming AI advisor will analyse your current packaging, budget and volumes to suggest the most suitable sustainable replacements and the suppliers who carry them.",
      cta: "Preview the advisor",
    },
    group: {
      eyebrow: "Group buying", title: "Buy together. Pay less.",
      text: "Many small businesses can't reach supplier minimums alone. GreenSwitch pools orders from cafés, restaurants and shops in the same area to unlock volume pricing everyone can share.",
      b1: "Join an open order near you", b2: "Hit the volume tier together", b3: "Each business pays the lower price",
      cta: "See how group buying works",
      tier: "Example price tiers", t1: "1 business", t2: "5 businesses", t3: "12 businesses",
    },
    impact: {
      eyebrow: "Environmental impact", title: "See the plastic you're keeping out of Palestine's land and sea",
      text: "Every order will feed an impact estimate based on the plastic each product replaces.",
      example: "Illustrative example — not real data",
      m1: "Plastic avoided this year", m2: "Single-use items replaced", m3: "Switch progress",
      cta: "Learn about impact tracking",
    },
    supplier: { title: "Become a GreenSwitch Supplier", text: "Reach hundreds of Palestinian businesses actively looking for sustainable packaging. List your products, receive group orders and grow with the green economy.", cta: "Register as a supplier" },
    footer: { tagline: "A Palestinian sustainable procurement platform helping businesses switch away from single-use plastic.", platform: "Platform", company: "Company", legal: "Legal", suppliers: "Suppliers", contact: "Contact", sustainability: "Sustainability", privacy: "Privacy Policy", terms: "Terms of Service", rights: "All rights reserved." },
    market: {
      title: "Marketplace", subtitle: "Compare sustainable packaging from trusted suppliers across Palestine.",
      search: "Search products, materials, suppliers…", filters: "Filters", category: "Category", material: "Material", price: "Max price (₪)", supplier: "Supplier", moq: "Max minimum order", attributes: "Sustainability", sort: "Sort by", any: "Any", all: "All",
      sortFeatured: "Featured", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low", sortMoq: "Lowest MOQ",
      results: "products", reset: "Reset filters", emptyTitle: "No products match your filters", emptyText: "Try widening the price range or removing a filter.",
    },
    detail: {
      back: "Back to marketplace", composition: "Material composition", specs: "Specifications", sizes: "Available sizes", envAttrs: "Environmental attributes", cert: "Certification & documentation",
      certDocumented: "Documentation provided by supplier", certPending: "Documentation under review", certNone: "No documentation submitted yet",
      quantity: "Quantity", addCart: "Add to cart", compare: "Compare", related: "Related products", supplierInfo: "Supplier", since: "On GreenSwitch since", savedPer: "est. plastic avoided per unit",
      placeholderCart: "Cart & ordering arrive in the next phase.", placeholderCompare: "Product comparison arrives in the next phase.", minNote: "Minimum order is",
      notFound: "Product not found",
    },
    auth: {
      loginTitle: "Welcome back", loginText: "Log in to manage orders and track your impact.", email: "Work email", password: "Password", loginBtn: "Log in", noAccount: "New to GreenSwitch?", haveAccount: "Already have an account?",
      signupTitle: "Create your account", signupText: "Choose how you'll use GreenSwitch.", buyer: "Business Buyer", buyerText: "Restaurants, cafés, shops & institutions", supplierRole: "Packaging Supplier", supplierText: "Manufacturers & distributors", business: "Business name", fullName: "Full name", signupBtn: "Create account",
      notice: "Accounts are not active yet — sign-in will be connected in the next phase. Nothing you enter here is stored.",
    },
    soon: { back: "Back home", explore: "Explore marketplace" },
  },
  ar: {
    account: accountStrings.ar,
    nav: { home: "الرئيسية", marketplace: "السوق", how: "كيف يعمل", group: "الشراء الجماعي", impact: "الأثر البيئي", about: "من نحن", login: "تسجيل الدخول", signup: "إنشاء حساب", menu: "القائمة" },
    demo: "بيانات تجريبية",
    comingSoon: "قريباً في المرحلة القادمة",
    hero: {
      eyebrow: "سوق التغليف المستدام · فلسطين",
      title1: "تغليف أذكى.",
      title2: "أعمال أكثر خضرة.",
      text: "اكتشف حلول التغليف المستدام، وتواصل مع موردين موثوقين، واجعل تحوّل عملك أسهل وأذكى وأقل تكلفة.",
      cta1: "استكشف التغليف المستدام",
      cta2: "اعثر على أفضل بديل لي",
      stat1: "فئات المنتجات", stat2: "موردون محليون (تجريبي)", stat3: "الأسعار بالشيكل",
    },
    intro: {
      eyebrow: "التحدي",
      title: "فلسطين تعتمد على البلاستيك أحادي الاستخدام. لكن ليس بالضرورة.",
      text: "تعتمد المطاعم والمقاهي والمتاجر في فلسطين على تغليف بلاستيكي رخيص ينتهي في الشوارع والأودية والبحر. البدائل موجودة، لكنها متفرقة وصعبة المقارنة وغالباً ما تُسعّر للمشترين الكبار فقط. يجمعها GreenSwitch في سوق واحد موثوق مصمم للأعمال المحلية.",
      p1: "مكان واحد للاكتشاف", p1t: "موردون موثّقون وبيانات منتجات قابلة للمقارنة في كتالوج واحد.",
      p2: "أسعار عادلة", p2t: "الطلبات الجماعية تمنح الأعمال الصغيرة أسعار الكميات الكبيرة.",
      p3: "تقدّم قابل للقياس", p3t: "قدّر كمية البلاستيك التي يمنعها تحوّلك من الوصول إلى البيئة.",
    },
    how: {
      eyebrow: "كيف يعمل", title: "خمس خطوات من البلاستيك إلى بدائل صديقة للأرض",
      s1: "أخبرنا عن عملك", s1t: "قطاعك وكمياتك والتغليف الذي تستخدمه اليوم.",
      s2: "اكتشف البدائل المناسبة", s2t: "منتجات مطابقة عبر المواد والفئات.",
      s3: "قارن المنتجات والأسعار والموردين", s3t: "مواصفات وحد أدنى للطلب وأسعار بالشيكل جنباً إلى جنب.",
      s4: "اشترِ منفرداً أو انضم لطلب جماعي", s4t: "اطلب وحدك أو اجمع الطلب للحصول على سعر أفضل.",
      s5: "تابع أثرك البيئي", s5t: "قدّر كمية البلاستيك التي تجنبتها مع الوقت.",
    },
    featured: { eyebrow: "منتجات مميزة", title: "تغليف سيلاحظه زبائنك", all: "عرض كل المنتجات" },
    product: { moq: "الحد الأدنى", by: "من", verified: "موثّق", unverified: "غير موثّق بعد", details: "عرض التفاصيل" },
    ai: {
      eyebrow: "توصيات ذكية", title: "أفضل بديل لك خلال ثوانٍ",
      text: "سيحلل مستشارنا الذكي القادم تغليفك الحالي وميزانيتك وكمياتك ليقترح أنسب البدائل المستدامة والموردين الذين يوفرونها.",
      cta: "اطّلع على المستشار",
    },
    group: {
      eyebrow: "الشراء الجماعي", title: "اشترِ مع غيرك. وادفع أقل.",
      text: "كثير من الأعمال الصغيرة لا تصل إلى الحد الأدنى للمورد وحدها. يجمع GreenSwitch طلبات المقاهي والمطاعم والمتاجر في المنطقة نفسها لفتح أسعار الجملة للجميع.",
      b1: "انضم لطلب مفتوح قريب منك", b2: "اصلوا معاً لشريحة الكمية", b3: "يدفع كل عمل السعر الأقل",
      cta: "تعرّف على الشراء الجماعي",
      tier: "مثال على شرائح الأسعار", t1: "عمل واحد", t2: "5 أعمال", t3: "12 عملاً",
    },
    impact: {
      eyebrow: "الأثر البيئي", title: "شاهد البلاستيك الذي تُبعده عن أرض فلسطين وبحرها",
      text: "سيُغذّي كل طلب تقديراً للأثر بناءً على البلاستيك الذي يستبدله كل منتج.",
      example: "مثال توضيحي — ليست بيانات حقيقية",
      m1: "بلاستيك تم تجنبه هذا العام", m2: "قطع أحادية الاستخدام تم استبدالها", m3: "تقدّم التحوّل",
      cta: "تعرّف على تتبع الأثر",
    },
    supplier: { title: "كن مورداً في GreenSwitch", text: "صِل إلى مئات الأعمال الفلسطينية التي تبحث عن تغليف مستدام. اعرض منتجاتك واستقبل الطلبات الجماعية وانمُ مع الاقتصاد الأخضر.", cta: "سجّل كمورد" },
    footer: { tagline: "منصة فلسطينية للمشتريات المستدامة تساعد الأعمال على التحوّل عن البلاستيك أحادي الاستخدام.", platform: "المنصة", company: "الشركة", legal: "قانوني", suppliers: "الموردون", contact: "تواصل معنا", sustainability: "الاستدامة", privacy: "سياسة الخصوصية", terms: "شروط الخدمة", rights: "جميع الحقوق محفوظة." },
    market: {
      title: "السوق", subtitle: "قارن التغليف المستدام من موردين موثوقين في أنحاء فلسطين.",
      search: "ابحث عن منتجات أو مواد أو موردين…", filters: "التصفية", category: "الفئة", material: "المادة", price: "أقصى سعر (₪)", supplier: "المورد", moq: "أقصى حد أدنى للطلب", attributes: "الاستدامة", sort: "الترتيب", any: "أي", all: "الكل",
      sortFeatured: "المميزة", sortPriceAsc: "السعر: من الأقل", sortPriceDesc: "السعر: من الأعلى", sortMoq: "أقل حد أدنى",
      results: "منتج", reset: "إعادة الضبط", emptyTitle: "لا توجد منتجات مطابقة", emptyText: "جرّب توسيع نطاق السعر أو إزالة أحد المرشحات.",
    },
    detail: {
      back: "العودة إلى السوق", composition: "تركيب المادة", specs: "المواصفات", sizes: "المقاسات المتاحة", envAttrs: "الخصائص البيئية", cert: "الشهادات والوثائق",
      certDocumented: "وثائق مقدّمة من المورد", certPending: "الوثائق قيد المراجعة", certNone: "لم تُقدَّم وثائق بعد",
      quantity: "الكمية", addCart: "أضف إلى السلة", compare: "قارن", related: "منتجات ذات صلة", supplierInfo: "المورد", since: "على GreenSwitch منذ", savedPer: "تقدير البلاستيك المُتجنَّب لكل قطعة",
      placeholderCart: "السلة والطلب في المرحلة القادمة.", placeholderCompare: "مقارنة المنتجات في المرحلة القادمة.", minNote: "الحد الأدنى للطلب",
      notFound: "المنتج غير موجود",
    },
    auth: {
      loginTitle: "مرحباً بعودتك", loginText: "سجّل الدخول لإدارة طلباتك وتتبع أثرك.", email: "البريد الإلكتروني للعمل", password: "كلمة المرور", loginBtn: "تسجيل الدخول", noAccount: "جديد على GreenSwitch؟", haveAccount: "لديك حساب؟",
      signupTitle: "أنشئ حسابك", signupText: "اختر طريقة استخدامك لـ GreenSwitch.", buyer: "مشترٍ تجاري", buyerText: "مطاعم ومقاهٍ ومتاجر ومؤسسات", supplierRole: "مورد تغليف", supplierText: "مصنّعون وموزعون", business: "اسم العمل", fullName: "الاسم الكامل", signupBtn: "إنشاء الحساب",
      notice: "الحسابات غير مفعّلة بعد — سيتم ربط تسجيل الدخول في المرحلة القادمة. لا يتم حفظ أي شيء تُدخله هنا.",
    },
    soon: { back: "العودة للرئيسية", explore: "استكشف السوق" },
  },
} as const;

export type Dict = (typeof dict)["en"];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict; dir: "ltr" | "rtl" };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("gs-lang");
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("gs-lang", l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dict[lang] as unknown as Dict, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export const formatILS = (n: number, lang: Lang) =>
  new Intl.NumberFormat(lang === "ar" ? "ar-PS" : "en-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 2 }).format(n);
