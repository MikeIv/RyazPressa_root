import type { Banner } from '#shared/types/api'
import type { SiteTheme, SocialLink } from '#shared/types/site'
import { enrichSiteTheme } from '#shared/utils/siteThemeAssets'

/** Тема до ответа `/api/_site`. Цвета совпадают с прод-конфигом ryazpressa.ru. */
export const ryazpressaTheme: SiteTheme = enrichSiteTheme('ryazpressa', 'Рязпресса', {
  colorPrimary: '#1a4b8c',
  colorAccent: '#c62828',
  colorText: '#1a1a1a',
  colorBackground: '#ffffff',
  headerGradientStart: '#ffffff',
  radiusSm: '4px',
  radiusMd: '8px',
})

/**
 * Баннеры правой колонки главной (240×480, картинки — тот же S3, что у новостей).
 *
 * Временный статический источник: на legacy-сайте их отдавал Advanced Ads
 * (`advanced_ads` + Advanced Ads Slider), в API эндпоинта баннеров ещё нет.
 * Когда backend добавит `GET /api/banners`, заменить константу на `useApiFetch`
 * с нормализатором — компонент `BannerSlider` принимает уже готовый список.
 */
export const ryazpressaHomeBanners: Banner[] = [
  {
    id: 'vojska-bpla',
    link: 'https://ryazpressa.ru/ryazanczev-priglashayut-na-sluzhbu-po-kontraktu-v-podrazdeleniya-bespilotnyh-sistem/',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2026/02/banner-vojska-bpla.-16.2.26.jpg',
      alt: 'Служба по контракту в подразделениях беспилотных систем',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'gosuslugi-dom',
    link: 'https://dom.gosuslugi.ru/',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2025/05/gosuslugi.dom.jpg',
      alt: 'Госуслуги.Дом',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'mchs-google-play',
    link: 'https://play.google.com/store/apps/details?id=io.citizens.security&yqrid=NVoVbFyvFYb',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2025/04/mchs-gp.jpg',
      alt: 'Мобильное приложение МЧС России в Google Play',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'mchs-app-store',
    link: 'https://apps.apple.com/us/app/%D0%BC%D1%87%D1%81-%D1%80%D0%BE%D1%81%D1%81%D0%B8%D0%B8/id1530044766?yqrid=QFj7OUWYxil',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2025/04/mchs-appstore.jpg',
      alt: 'Мобильное приложение МЧС России в App Store',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'vybiraj-svoe',
    link: 'https://ryazpressa.ru/category/vybiraj-svoe/',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2024/01/vybiraj-svoe.jpeg',
      alt: 'Проект «Выбирай своё!»',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'finombudsman',
    link: 'https://finombudsman.ru/',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2024/10/banner-sfu_240x480.jpg',
      alt: 'Финансовый уполномоченный',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'mobilnye-ognevye-gruppy',
    link: 'https://ryazpressa.ru/v-ryazanskoj-oblasti-prodolzhayut-formirovat-mobilnye-ognevye-gruppy/',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2026/06/banner-mog.-17.6.26.jpg',
      alt: 'Мобильные огневые группы Рязанской области',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'vyhod31',
    link: 'https://xn--31-dlci3c0b2b.xn--p1ai/',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2026/08/banner-vyhod31.-28.8.26.jpg',
      alt: 'Проект «Выход 31»',
      width: 240,
      height: 480,
    },
  },
  {
    id: 'ncz-rossiya',
    link: 'https://vk.ru/gowithrussia_rzn',
    image: {
      url: 'https://93508d32-eb35-4424-b8d3-8377d03ffff9.selstorage.ru/2026/10/banner-ncz-rossiya.-2.10.26.jpg',
      alt: 'Национальный центр «Россия»',
      width: 240,
      height: 480,
    },
  },
]

/** Соцсети редакции — ссылки со старого сайта (блок под баннерами на главной). */
export const ryazpressaSocialLinks: SocialLink[] = [
  { network: 'telegram', label: 'Telegram', href: 'https://t.me/ryazpressa' },
  { network: 'vk', label: 'ВКонтакте', href: 'https://vk.com/club67072912' },
  { network: 'ok', label: 'Одноклассники', href: 'https://www.ok.ru/idpressa' },
]
