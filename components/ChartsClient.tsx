"use client";

import dynamic from "next/dynamic";
import ParallaxSection from "./ParallaxSection";

const InteractiveChart = dynamic(() => import("./InteractiveChart"), { ssr: false });
const ComparisonChart = dynamic(() => import("./ComparisonChart"), { ssr: false });

export default function ChartsClient() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="container mx-auto px-4 relative">
        <ParallaxSection offset={30}>
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            <InteractiveChart />
            <ComparisonChart />
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
}
