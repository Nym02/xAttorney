import React from 'react';
import CommunitySection from '../components/Landing Page/Community Section/CommunitySection';
import CountSection from '../components/Landing Page/Count Section/CountSection';
import QuestionSection from '../components/Landing Page/FAQ Section/QuestionSection';
import HeroSection from '../components/Landing Page/Hero Section/HeroSection';
import LatestNewsSection from '../components/Landing Page/Latest News Section/LatestNewsSection';
import WhatPeopleSaySection from '../components/Landing Page/What People Say Section/WhatPeopleSaySection';
import WhatWeDoSection from '../components/Landing Page/What We Do Section/WhatWeDoSection';
import WhyChooseUsSection from '../components/Landing Page/Why Choose Us Section/WhyChooseUsSection';
import WhyUsSection from '../components/Landing Page/Why Us Section/WhyUsSection';

const LandingPageView = () => {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <WhatWeDoSection />
      <WhyChooseUsSection />
      <WhatPeopleSaySection />
      <CountSection />
      <LatestNewsSection />
      <CommunitySection />
      <QuestionSection />
    </>
  );
};

export default LandingPageView;
