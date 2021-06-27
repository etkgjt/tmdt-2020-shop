import samsung from "../assets/samsung.png";
import huawei from "../assets/huawei.jpg";
import nokia from "../assets/nokia.png";
import iphone from "../assets/iphon.jpg";
import oppo from "../assets/oppo.png";
import vivo from "../assets/vivo.png";
import vsmart from "../assets/vsmart.jpg";
import xiaomi from "../assets/xiaomi.png";

import apple from "../assets/apple.png";
import dell from "../assets/dell.png";
import msi from "../assets/msi.jpg";
import acer from "../assets/acer.png";
import asus from "../assets/asus.png";
import lenovo from "../assets/lenovo.png";
import hp from "../assets/hp.png";

const BASE_URL = "https://tgdd.azurewebsites.net"; //API url
const CITY = [
  "Hồ Chí Minh",
  "Hà Nội",
  "Cần Thơ",
  "Đà Nẵng",
  "Đồng Nai",
  "Tây Ninh",
  "Thừa Thiên Huế",
];
const DISTRICTS = [
  [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Tân Bình",
    "Gò Vấp",
    "Phú Nhuận",
  ],
  [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Tân Bình",
    "Gò Vấp",
    "Phú Nhuận",
  ],
  [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Tân Bình",
    "Gò Vấp",
    "Phú Nhuận",
  ],
  [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Tân Bình",
    "Gò Vấp",
    "Phú Nhuận",
  ],
  [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Tân Bình",
    "Gò Vấp",
    "Phú Nhuận",
  ],
  [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Tân Bình",
    "Gò Vấp",
    "Phú Nhuận",
  ],
  [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Tân Bình",
    "Gò Vấp",
    "Phú Nhuận",
  ],
];
const LAPTOP_BRAND = [
  { label: "Apple", value: 1 },
  { label: "Acer", value: 2 },
  { label: "Asus", value: 3 },
  { label: "MSI", value: 7 },
  { label: "Dell", value: 4 },
  { label: "HP", value: 5 },
  { label: "Lenovo", value: 6 },
];
const SMART_PHONE_BRAND = [
  { label: "Apple", value: 1 },
  { label: "Samsung", value: 7 },
  { label: "Xiaomi", value: 11 },
  { label: "Vivo", value: 12 },
  { label: "LG", value: 8 },
  { label: "Huawie", value: 9 },
  { label: "Oppo", value: 10 },
  { label: "Nokia", value: 13 },
  { label: "Sony", value: 14 },
  { label: "VSmart", value: 15 },
];
const TABLET_BRAND = [
  { label: "Apple", value: 1 },
  { label: "Samsung", value: 7 },
  { label: "Lennnovo", value: 6 },
];
const ACCESSORIES_BRAND = [
  { label: "ANNKO", value: 0 },
  { label: "Xiaomi", value: 1 },
  { label: "Samsung", value: 2 },
];
const CATEGORY_LIST = [
  { label: "Laptop", value: 0 },
  { label: "Smart Phone", value: 1 },
  { label: "TV", value: 2 },
  { label: "Smart Watch", value: 3 },
  { label: "Orthers", value: 4 },
];
const ITEMS_ORDER_LIST = [
  { label: "Giá giảm dần", value: 0 },
  { label: "Giá tăng dần", value: 1 },
  { label: "Ngày ra mắt", value: 2 },
  { label: "Yêu thích nhất", value: 3 },
];
const ITEM_COLORS = [
  { label: "Red", value: 0 },
  { label: "White", value: 1 },
  { label: "Green", value: 2 },
  { label: "Blue", value: 3 },
  { label: "Yellow", value: 4 },
];
const SMART_PHONE_BRAND_LOGO = [
  huawei,
  samsung,
  iphone,
  vsmart,
  vivo,
  nokia,
  oppo,
  xiaomi,
];
const LAPTOP_BRAND_LOGO = [apple, acer, asus, hp, dell, lenovo, msi];
const CLIENT_ID =
  "1043820103158-fa3na7ft67t50uqh7lrq9i5larhgnrje.apps.googleusercontent.com";
const CLIENT_SECRET = "a3lOhwA3Bd2tDWpe5bQi9d6U";
export {
  BASE_URL,
  CITY,
  DISTRICTS,
  LAPTOP_BRAND,
  SMART_PHONE_BRAND,
  TABLET_BRAND,
  ACCESSORIES_BRAND,
  CATEGORY_LIST,
  ITEMS_ORDER_LIST,
  ITEM_COLORS,
  SMART_PHONE_BRAND_LOGO,
  LAPTOP_BRAND_LOGO,
  CLIENT_ID,
  CLIENT_SECRET,
};
