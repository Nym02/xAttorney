import React from 'react';
import AboutUsHeroSection from '../components/About Us Page/About Us Hero Section/AboutUsHeroSection';
import AboutUsWhyUsSection from '../components/About Us Page/About Us Why Us Section/AboutUsWhyUsSection';
import ForDesktopSection from '../components/About Us Page/For Desktop Section/ForDesktopSection';
import ForMobileSection from '../components/About Us Page/For Mobile Section/ForMobileSection';
import GiveATrySection from '../components/About Us Page/Give A Try Section/GiveATrySection';
import LetUsKnowSection from '../components/About Us Page/Let Us Know Section/LetUsKnowSection';
import OurProductsSection from '../components/About Us Page/Our Products Section/OurProductsSection';

const AboutUsPageView = () => {
  return (
    <>
      <AboutUsHeroSection />
      <OurProductsSection />
      <ForMobileSection />
      <ForDesktopSection />
      <AboutUsWhyUsSection />
      <GiveATrySection />
      <LetUsKnowSection />
    </>
  );
};

export default AboutUsPageView;
