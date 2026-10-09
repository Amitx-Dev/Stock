import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { MarketTicker } from '../../components/home/MarketTicker';
import { HeroSection } from '../../components/home/HeroSection';
import { StatsBand } from '../../components/home/StatsBand';
import { ProductsGrid } from '../../components/home/ProductsGrid';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { BrokerageComparison } from '../../components/home/BrokerageComparison';
import { MarketSnapshot } from '../../components/home/MarketSnapshot';
import { Testimonials } from '../../components/home/Testimonials';
import { FaqAccordion } from '../../components/home/FaqAccordion';
import { CtaBanner } from '../../components/home/CtaBanner';
import { Footer } from '../../components/home/Footer';

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <MarketTicker />
      <main className="flex-1">
        <HeroSection />
        <StatsBand />
        <ProductsGrid />
        <WhyChooseUs />
        <BrokerageComparison />
        <MarketSnapshot />
        <Testimonials />
        <FaqAccordion />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
};
