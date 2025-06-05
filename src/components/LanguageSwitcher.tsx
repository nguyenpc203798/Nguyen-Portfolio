'use client';

import React from 'react';
import { ToggleButton } from '@/once-ui/components';
import { useLanguage } from '@/app/resources/languageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <>
      <ToggleButton
        onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
        selected={false}
        aria-label={`Switch to ${language === 'en' ? 'Vietnamese' : 'English'}`}
      >
        <span>{language === 'en' ? 'VI' : 'EN'}</span>
      </ToggleButton>
    </>
  );
}; 