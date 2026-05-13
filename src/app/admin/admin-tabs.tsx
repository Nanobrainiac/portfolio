"use client";

import { useState } from "react";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "links", label: "Links" },
];

export function AdminTabs({
  children,
  initialTab = "profile",
}: {
  children: React.ReactNode;
  initialTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(
    tabs.some((tab) => tab.id === initialTab) ? initialTab : "profile",
  );

  function selectTab(id: string) {
    setActiveTab(id);
    window.history.replaceState(null, "", `/admin?tab=${id}`);
  }

  return (
    <div>
      <div className="sticky top-[73px] z-40 mb-6 border-b border-white/10 bg-zinc-950/95 py-3 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectTab(tab.id)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-orange-500 text-zinc-950"
                  : "border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {Array.isArray(children)
          ? children.map((child) => {
              if (!child || typeof child !== "object" || !("props" in child)) return child;
              const childProps = child.props as { id?: string };
              return (
                <div key={childProps.id} className={childProps.id === activeTab ? "block" : "hidden"}>
                  {child}
                </div>
              );
            })
          : children}
      </div>
    </div>
  );
}
