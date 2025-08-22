# Internationalization (i18n) Setup

This project uses `react-i18next` for internationalization with support for English and Spanish.

## Structure

```
src/locales/
├── en/
│   └── translation.json    # English translations
├── es/
│   └── translation.json    # Spanish translations
└── README.md               # This file
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent: React.FC = () => {
  const { t } = useTranslation();
  
  return <h1>{t('pages.home.title')}</h1>;
};
```

### Custom Hook

```tsx
import { useLocalization } from '../shared/hooks';

const MyComponent: React.FC = () => {
  const { t, changeLanguage, currentLanguage } = useLocalization();
  
  return (
    <div>
      <h1>{t('pages.home.title')}</h1>
      <button onClick={() => changeLanguage('es')}>
        Switch to Spanish
      </button>
      <p>Current language: {currentLanguage}</p>
    </div>
  );
};
```

### Language Switcher Component

```tsx
import { LanguageSwitcher } from '../shared/components';

const MyComponent: React.FC = () => {
  return (
    <div>
      <h1>My Page</h1>
      <LanguageSwitcher />
    </div>
  );
};
```

## Adding New Translations

1. Add the key to both `en/translation.json` and `es/translation.json`
2. Use the key in your component with `t('key.path')`

## Interpolation

For dynamic values, use interpolation:

```json
{
  "features": {
    "counter": {
      "currentValue": "Current value: {{count}}"
    }
  }
}
```

```tsx
const { t } = useTranslation();
return <p>{t('features.counter.currentValue', { count: 5 })}</p>;
```

## Language Detection

The app automatically detects the user's preferred language from:
1. localStorage (if previously set)
2. Browser language
3. HTML lang attribute

Falls back to English if no match is found.
