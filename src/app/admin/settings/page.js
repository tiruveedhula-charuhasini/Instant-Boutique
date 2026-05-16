"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Check, Store, Phone, Globe, Search, CreditCard, Crown, ImagePlus } from "lucide-react";

const SETTING_SECTIONS = [
  { id: "boutique", label: "Boutique Details", icon: Store },
  { id: "whatsapp", label: "WhatsApp & Contact", icon: Phone },
  { id: "payment", label: "Payment Settings", icon: CreditCard },
  { id: "seo", label: "SEO Settings", icon: Search },
];

const inputCls = "w-full px-4 py-2.5 bg-[#F8F4FF] dark:bg-white/5 border border-[#E2C2C6]/30 dark:border-white/10 rounded-xl text-sm text-[#2F0147] dark:text-white placeholder:text-[#9C528B]/30 outline-none focus:border-[#9C528B]/60 transition-colors";

function SettingField({ label, hint, children }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40 mb-1.5 block">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-[#9C528B]/40 dark:text-white/20 mt-1">{hint}</p>}
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("boutique");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [boutique, setBoutique] = useState({
    name: "Instant Boutique",
    tagline: "Traditional elegance meets modern minimalism",
    email: "hello@instantboutique.com",
    phone: "+91 9876543210",
    address: "Bengaluru, Karnataka, India",
    logo: "",
    currency: "INR",
  });

  const [whatsapp, setWhatsapp] = useState({
    number: "+91 9876543210",
    defaultMessage: "Hi, I'm interested in your products!",
    businessHours: "Mon–Sat, 9AM–8PM",
  });

  const [payment, setPayment] = useState({
    upiId: "instantboutique@paytm",
    razorpayKey: "",
    codEnabled: true,
    upiEnabled: true,
    cardEnabled: false,
  });

  const [seo, setSeo] = useState({
    metaTitle: "Instant Boutique | Premium Ethnic Wear",
    metaDescription: "Traditional elegance mixed with modern minimalism. Premium handcrafted fashion brand.",
    keywords: "ethnic wear, sarees, kurtis, bridal, fashion",
    googleAnalytics: "",
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#2F0147] dark:text-white">Settings</h1>
        <p className="text-sm text-[#9C528B]/60 dark:text-white/40 mt-1">Configure your boutique portal</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Section Nav */}
        <div className="lg:w-56 space-y-1">
          {SETTING_SECTIONS.map(section => {
            const Icon = section.icon;
            return (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  activeSection === section.id ? "bg-[#610F7F] text-white shadow-md" : "text-[#9C528B] dark:text-white/60 hover:bg-[#F5E6FF] dark:hover:bg-white/10"
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Editor */}
        <div className="flex-1 bg-white dark:bg-[#1a0030]/60 rounded-2xl border border-[#E2C2C6]/20 dark:border-white/10 p-5 space-y-5">
          {activeSection === "boutique" && (
            <motion.div key="boutique" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">Boutique Details</h3>
              <div className="flex items-center gap-4 p-4 bg-[#F8F4FF] dark:bg-white/5 rounded-xl border-2 border-dashed border-[#E2C2C6]/40 dark:border-white/10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#9C528B] flex items-center justify-center shadow-md">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2F0147] dark:text-white mb-1">Store Logo</p>
                  <button className="inline-flex items-center gap-1.5 text-xs text-[#9C528B] bg-[#F5E6FF] dark:bg-[#610F7F]/20 px-3 py-1.5 rounded-lg hover:bg-[#E8D0F5] transition-colors">
                    <ImagePlus className="w-3.5 h-3.5" /> Upload Logo
                  </button>
                </div>
              </div>
              <SettingField label="Boutique Name">
                <input value={boutique.name} onChange={e => setBoutique(b => ({...b, name: e.target.value}))} className={inputCls} />
              </SettingField>
              <SettingField label="Tagline">
                <input value={boutique.tagline} onChange={e => setBoutique(b => ({...b, tagline: e.target.value}))} className={inputCls} />
              </SettingField>
              <div className="grid grid-cols-2 gap-4">
                <SettingField label="Contact Email">
                  <input type="email" value={boutique.email} onChange={e => setBoutique(b => ({...b, email: e.target.value}))} className={inputCls} />
                </SettingField>
                <SettingField label="Phone">
                  <input value={boutique.phone} onChange={e => setBoutique(b => ({...b, phone: e.target.value}))} className={inputCls} />
                </SettingField>
              </div>
              <SettingField label="Address">
                <textarea value={boutique.address} onChange={e => setBoutique(b => ({...b, address: e.target.value}))} rows={2} className={`${inputCls} resize-none`} />
              </SettingField>
            </motion.div>
          )}

          {activeSection === "whatsapp" && (
            <motion.div key="whatsapp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">WhatsApp & Contact</h3>
              <SettingField label="WhatsApp Number" hint="Include country code: +91 9876543210">
                <input value={whatsapp.number} onChange={e => setWhatsapp(w => ({...w, number: e.target.value}))} className={inputCls} />
              </SettingField>
              <SettingField label="Default WhatsApp Message">
                <textarea value={whatsapp.defaultMessage} onChange={e => setWhatsapp(w => ({...w, defaultMessage: e.target.value}))} rows={3} className={`${inputCls} resize-none`} />
              </SettingField>
              <SettingField label="Business Hours">
                <input value={whatsapp.businessHours} onChange={e => setWhatsapp(w => ({...w, businessHours: e.target.value}))} className={inputCls} />
              </SettingField>
            </motion.div>
          )}

          {activeSection === "payment" && (
            <motion.div key="payment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">Payment Settings</h3>
              <SettingField label="UPI ID">
                <input value={payment.upiId} onChange={e => setPayment(p => ({...p, upiId: e.target.value}))} className={inputCls} />
              </SettingField>
              <SettingField label="Razorpay Key ID" hint="For online card payments">
                <input value={payment.razorpayKey} onChange={e => setPayment(p => ({...p, razorpayKey: e.target.value}))} placeholder="rzp_live_..." className={inputCls} />
              </SettingField>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9C528B]/60 dark:text-white/40">Payment Methods</p>
                {[
                  { key: "codEnabled", label: "Cash on Delivery (COD)" },
                  { key: "upiEnabled", label: "UPI / QR Code" },
                  { key: "cardEnabled", label: "Credit / Debit Cards" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-[#F8F4FF] dark:bg-white/5 rounded-xl">
                    <span className="text-sm text-[#2F0147] dark:text-white">{label}</span>
                    <div onClick={() => setPayment(p => ({...p, [key]: !p[key]}))}
                      className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${payment[key] ? "bg-[#610F7F]" : "bg-[#E2C2C6] dark:bg-white/20"}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${payment[key] ? "left-6" : "left-1"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "seo" && (
            <motion.div key="seo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#2F0147] dark:text-white border-b border-[#E2C2C6]/20 dark:border-white/10 pb-3">SEO Settings</h3>
              <SettingField label="Meta Title" hint="Shown in browser tab and search results (50–60 chars)">
                <input value={seo.metaTitle} onChange={e => setSeo(s => ({...s, metaTitle: e.target.value}))} className={inputCls} />
                <div className="text-[11px] text-right text-[#9C528B]/40 mt-0.5">{seo.metaTitle.length}/60</div>
              </SettingField>
              <SettingField label="Meta Description" hint="Shown in search results (150–160 chars)">
                <textarea value={seo.metaDescription} onChange={e => setSeo(s => ({...s, metaDescription: e.target.value}))} rows={3} className={`${inputCls} resize-none`} />
                <div className="text-[11px] text-right text-[#9C528B]/40 mt-0.5">{seo.metaDescription.length}/160</div>
              </SettingField>
              <SettingField label="Keywords" hint="Comma-separated keywords">
                <input value={seo.keywords} onChange={e => setSeo(s => ({...s, keywords: e.target.value}))} className={inputCls} />
              </SettingField>
              <SettingField label="Google Analytics ID" hint="e.g. G-XXXXXXXXXX">
                <input value={seo.googleAnalytics} onChange={e => setSeo(s => ({...s, googleAnalytics: e.target.value}))} placeholder="G-XXXXXXXXXX" className={inputCls} />
              </SettingField>
            </motion.div>
          )}

          {/* Save */}
          <div className="flex justify-end border-t border-[#E2C2C6]/20 dark:border-white/10 pt-4">
            <motion.button onClick={handleSave} disabled={saving || saved} whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2F0147] to-[#610F7F] text-white text-sm font-semibold shadow-lg">
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
