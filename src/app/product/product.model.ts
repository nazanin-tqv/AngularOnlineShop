export interface Product {
  id: string;
  name: string;
  img_src: string;
  summary: string;
  brand: Brand;
  description: string;
  categories: string[];
}
export enum Brand {
  Apple,
  Samsung,
  Sony,
  Pixel,
  LG,
}

export interface Category {
  label: string;
  value: string;
  children?: Category[];
}
export const categoryList: Category[] = [
  {
    label: 'پوشاک',
    value: 'پوشاک',
    children: [
      {
        label: 'مردانه',
        value: 'مردانه',
        children: [
          { label: 'زمستانی', value: 'زمستانی' },
          { label: 'تابستانی', value: 'تابستانی' },
          { label: 'پاییزی', value: 'پاییزی' },
          { label: 'بهاری', value: 'بهاری' },
        ],
      },
      {
        label: 'زنانه',
        value: 'زنانه',
        children: [
          { label: 'زمستانی', value: 'زمستانی' },
          { label: 'تابستانی', value: 'تابستانی' },
          { label: 'پاییزی', value: 'پاییزی' },
          { label: 'بهاری', value: 'بهاری' },
        ],
      },
      {
        label: 'بچگانه',
        value: 'بچگانه',
        children: [
          { label: 'زمستانی', value: 'زمستانی' },
          { label: 'تابستانی', value: 'تابستانی' },
          { label: 'پاییزی', value: 'پاییزی' },
          { label: 'بهاری', value: 'بهاری' },
        ],
      },
    ],
  },
  {
    label: 'کالای دیجیتال',
    value: 'کالای دیجیتال',
    children: [
      {
        label: 'موبایل',
        value: 'موبایل',
        children: [
          { label: 'اندروید', value: 'اندروید' },
          { label: 'iOS', value: 'iOS' },
        ],
      },
      {
        label: 'تبلت',
        value: 'تبلت',
        children: [
          { label: 'اندروید', value: 'اندروید' },
          { label: 'iOS', value: 'iOS' },
        ],
      },
      {
        label: 'لپتاپ',
        value: 'لپتاپ',
        children: [
          { label: 'ویندوز', value: 'ویندوز' },
          { label: 'iOS', value: 'iOS' },
        ],
      },
    ],
  },
  {
    label: 'فرهنگی',
    value: 'فرهنگی',
    children: [
      {
        label: 'کتاب',
        value: 'کتاب',
        children: [
          { label: 'کمک آموزشی', value: 'کمک آموزشی' },
          { label: 'دانشگاهی', value: 'دانشگاهی' },
          { label: 'رمان', value: 'رمان' },
          { label: 'فلسفه', value: 'فلسفه' },
          { label: 'روانشناسی', value: 'روانشناسی' },
          { label: 'اقتصاد', value: 'اقتصاد' },
          { label: 'جامعه شناسی', value: 'جامعه شناسی' },
        ],
      },
      {
        label: 'لوازم تحریر',
        value: 'لوازم تحریر',
        children: [
          { label: 'دفتر', value: 'دفتر' },
          { label: 'مداد', value: 'مداد' },
          { label: 'خودکار', value: 'خودکار' },
        ],
      },
    ],
  },
];

export interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
