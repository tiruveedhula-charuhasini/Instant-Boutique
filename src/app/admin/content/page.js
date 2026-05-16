"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, ImagePlus, Globe, Menu, FileImage, MessageSquare, Loader2, Check } from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Hero Section", icon: FileImage },
  { id: "banners", label: "Banners & Sliders", icon: ImagePlus },
  { id: "navbar", label: "Navbar Menus", icon: Menu },
  { id: "social", label: "Social Media Links", icon: Globe },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
];

const inputCls = "w-full px-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/30 outline-none focus:border-[#9C528B]/60 transition-colors";

export default function ContentPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [heroData, setHeroData] = useState({
    headline: "Elegance Redefined",
    subheadline: "Discover the finest ethnic wear collection",
    ctaText: "Shop Now",
    ctaLink: "/collections",
    backgroundImage: "",
  });

  const [banners, setBanners] = useState([
    { id: 1, title: "Summer Collection", image: "", link: "/collections", active: true },
    { id: 2, title: "Bridal Specials", image: "", link: "/collections/bridal", active: true },
  ]);

  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com/instantboutique",
    facebook: "https://facebook.com/instantboutique",
    whatsapp: "+91 9876543210",
    youtube: "",
  });

  const saveSection = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">Content Management</h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">Edit website content, banners, and pages</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Section Nav */}
        <div className="lg:w-56 space-y-1">
          {SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  activeSection === section.id
                    ? "bg-[#610F7F] text-white shadow-md"
                    : "text-[#9C528B] dark:text-white/60 hover:bg-[#F5E6FF] dark:hover:bg-white/10"
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Section Editor */}
        <div className="flex-1 bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5">
          {activeSection === "hero" && (
            <motion.div key="hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">Hero Section</h3>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Main Headline</label>
                <input value={heroData.headline} onChange={e => setHeroData(d => ({...d, headline: e.target.value}))} className={inputCls} />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Sub-headline</label>
                <input value={heroData.subheadline} onChange={e => setHeroData(d => ({...d, subheadline: e.target.value}))} className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">CTA Button Text</label>
                  <input value={heroData.ctaText} onChange={e => setHeroData(d => ({...d, ctaText: e.target.value}))} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">CTA Link</label>
                  <input value={heroData.ctaLink} onChange={e => setHeroData(d => ({...d, ctaLink: e.target.value}))} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">Background Image URL</label>
                <input value={heroData.backgroundImage} onChange={e => setHeroData(d => ({...d, backgroundImage: e.target.value}))} placeholder="https://..." className={inputCls} />
              </div>
              {/* Preview */}
              <div className="rounded-xl overflow-hidden border border-[#E2C2C6]/30 dark:border-white/10">
                <div className="bg-gradient-to-br from-[#2F0147] to-[#610F7F] p-8 text-center">
                  <p className="font-serif text-2xl text-white font-bold">{heroData.headline || "Your Headline"}</p>
                  <p className="text-white/70 text-sm mt-1">{heroData.subheadline || "Your subheadline"}</p>
                  <button className="mt-4 px-5 py-2 bg-[#D4AF37] text-[#2F0147] rounded-lg text-sm font-bold">
                    {heroData.ctaText || "Shop Now"}
                  </button>
                </div>
                <div className="px-4 py-2 bg-[#F8F4FF] dark:bg-white/5 text-xs text-[#9C528B]/50 dark:text-white/30 text-center">Live Preview</div>
              </div>
            </motion.div>
          )}

          {activeSection === "banners" && (
            <motion.div key="banners" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">Banners & Sliders</h3>
              {banners.map((banner, i) => (
                <div key={banner.id} className="p-4 bg-[#F8F4FF] dark:bg-white/5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#2F0147] dark:text-white">Banner {i + 1}</span>
                    <label className="flex items-center gap-2 text-xs text-[#9C528B] dark:text-white/60 cursor-pointer">
                      <div onClick={() => setBanners(b => b.map(x => x.id === banner.id ? {...x, active: !x.active} : x))}
                        className={`w-9 h-5 rounded-full relative transition-colors ${banner.active ? "bg-[#610F7F]" : "bg-[#E2C2C6] dark:bg-white/20"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${banner.active ? "left-4" : "left-0.5"}`} />
                      </div>
                      {banner.active ? "Active" : "Hidden"}
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#9C528B]/60 dark:text-white/40 mb-1 block">Title</label>
                      <input value={banner.title} onChange={e => setBanners(b => b.map(x => x.id === banner.id ? {...x, title: e.target.value} : x))} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs text-[#9C528B]/60 dark:text-white/40 mb-1 block">Link</label>
                      <input value={banner.link} onChange={e => setBanners(b => b.map(x => x.id === banner.id ? {...x, link: e.target.value} : x))} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#9C528B]/60 dark:text-white/40 mb-1 block">Image URL</label>
                    <input value={banner.image} onChange={e => setBanners(b => b.map(x => x.id === banner.id ? {...x, image: e.target.value} : x))} placeholder="https://..." className={inputCls} />
                  </div>
                </div>
              ))}
              <button onClick={() => setBanners(b => [...b, { id: Date.now(), title: "", image: "", link: "", active: true }])}
                className="w-full py-3 border-2 border-dashed border-[#E2C2C6]/40 dark:border-white/10 rounded-xl text-sm text-[#9C528B]/60 dark:text-white/30 hover:border-[#9C528B]/40 transition-colors">
                + Add Banner
              </button>
            </motion.div>
          )}

          {activeSection === "social" && (
            <motion.div key="social" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">Social Media Links</h3>
              {Object.entries(socialLinks).map(([key, val]) => (
                <div key={key}>
                  <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block capitalize">{key}</label>
                  <input value={val} onChange={e => setSocialLinks(l => ({...l, [key]: e.target.value}))} placeholder={`${key} URL / number`} className={inputCls} />
                </div>
              ))}
            </motion.div>
          )}

          {(activeSection === "navbar" || activeSection === "testimonials") && (
            <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[#F5E6FF] dark:bg-[#610F7F]/20 flex items-center justify-center mb-4">
                {activeSection === "navbar" ? <Menu className="w-8 h-8 text-[#610F7F]" /> : <MessageSquare className="w-8 h-8 text-[#610F7F]" />}
              </div>
              <p className="text-sm font-medium text-[#2F0147] dark:text-white capitalize">{activeSection} Editor</p>
              <p className="text-xs text-[#9C528B]/50 dark:text-white/30 mt-1">Coming soon — connect MongoDB to enable this</p>
            </motion.div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end border-t border-[#E2C2C6]/20 dark:border-white/10 pt-4">
            <motion.button
              onClick={saveSection}
              disabled={saving || saved}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white text-sm font-semibold shadow-lg"
            >
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                : saved ? <><Check className="w-4 h-4" /> Saved!</>
                : <><Save className="w-4 h-4" /> Save Changes</>}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
