const attributes = [
  { key: "screenDiagonal", label_ua: "Діагональ екрану", label_en: "Screen diagonal" },
  { key: "os", label_ua: "Операційна система", label_en: "OS" },
  { key: "frontCamera", label_ua: "Фронтальна камера", label_en: "Front camera" },
  { key: "mainCamera", label_ua: "Головна камера", label_en: "Main camera" },
  { key: "proccessorName", label_ua: "Назва процесора", label_en: "Processor name" },
  { key: "processorCores", label_ua: "Кількість ядер процесора", label_en: "Processor cores" },
  { key: "brand", label_ua: "Бренд", label_en: "Brand" },
  { key: "builtInMemory", label_ua: "Вбудована пам'ять", label_en: "Built in memory" },
  { key: "color", label_ua: "Колір", label_en: "Color" },
  { key: "battery", label_ua: "Ємність акумулятора", label_en: "Battery" },
  { key: "deliverySet", label_ua: "Комплект постачання", label_en: "Delivery set" },
  { key: "frontCamera", label_ua: "Фронтальна камера", label_en: "Front camera" },
  { key: "materials", label_ua: "Матеріали корпусу", label_en: "Materials" },
  { key: "price", label_ua: "Ціна", label_en: "Price" },
  { key: "ram", label_ua: "Оперативна пам'ять", label_en: "RAM" },
  { key: "simCount", label_ua: "Кількість сімкарт", label_en: "Sim count" },
  { key: "simFormat", label_ua: "Формат сімкарт", label_en: "Sim format" },
];

type AttributeKey = (typeof attributes)[number]["key"];

export const getProductAttributeLabel = (key: AttributeKey, language: "ua" | "en"): string => {
  const attribute = attributes.find((attr) => attr.key === key);
  return attribute ? attribute[`label_${language}`] : key;
};
