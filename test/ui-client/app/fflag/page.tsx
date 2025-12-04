"use client";

import Feature from "@/components/Feature";
import Header from "@/components/Header";
import NewFeature from "@/components/NewFeature";

export default function FFlagPage() {
  return (
    <div className="w-full h-full p-6 space-y-6">
      {/* Original content */}
      <Header />
      <div className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm mt-52">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Feature flag demo
          </h1>
        </div>
        <Feature />
      </div>
      <div className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <NewFeature />
      </div>
    </div>
  );
}
