"use client";

import React, { useState } from "react";

const CUSTOMER_LIST = [
  "ALEM CINEMA",
  "AWLO BUSINESS CENTER",
  "CENTURY MALL",
  "CENTURY ADDIS REAL ESTATE PLC",
  "DEMBEL CITY CENTER",
  "GETU GELETE",
  "LAPTHO MALL",
  "POWER CINEMA ADDIS",
  "ELIANA MALL",
  "CBE CINEMA",
  "D AFRIQUE TRADING PLC",
  "HAGER FIKIR THEATRE",
  "BOSTON DAY AND SPA",
  "GAST SOLAR MECHANICS PLC",
  "NEGA BONGER SEID",
  "CHILDREN AND YOUTH THEATRE",
  "ETHIOPIAN NATIONAL THEATRE",
  "ENTERTAINMENTS ALIANCE PLC",
  "BOLE BESHALE CONSTRACTION RESIDENCE HOUSE OWNERS",
  "EXHIBITION CENTER AND MARKET DEVELOPMENET ENTERPRIS",
  "WORKU ZELEKE TREADING",
  "DAAYO PHYSICAL FITNESS PLC",
  "MEKONNEN BITEW CINEMA",
  "KEBRON GUEST HOUSE",
  "ETHIOPIAN POSTAL SERVICE ENTERPRISE MAIN SERVICE",
];

export default function Home() {
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [session, setSession] = useState("FULLDAY");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !customer) {
      setNotification("Please select both a date and a customer.");
      return;
    }

    setIsLoading(true);

    const data = {
      employeeName: "Ephrem Awulachew",
      branch: "Head Office",
      address: "Addis Ababa",
      session,
      reason: "System Support",
      manager: "Hawariat",
      date,
      customer,
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setNotification("Exit request submitted successfully! 🚀");
        setDate("");
        setCustomer("");
      } else {
        setNotification("Failed to send request. Please try again.");
      }
    } catch {
      setNotification("An error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {notification && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm z-50 transition-all">
          {notification}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-slate-900">Office Exit Request</h1>
          <p className="text-xs text-slate-500 mt-1">Submit your schedule details below.</p>
        </div>

        <form onSubmit={submitForm} className="space-y-4">
          <Input label="Employee Name" value="Ephrem Awulachew" disabled />

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Customer / Project
            </label>
            <select
              required
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-slate-900"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            >
              <option value="" disabled>Select a customer...</option>
              {CUSTOMER_LIST.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Branch" value="Head Office" disabled />
            <Input label="Address" value="Addis Ababa" disabled />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Session
              </label>
              <select
                required
                className="w-full border border-slate-300 p-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-slate-900"
                value={session}
                onChange={(e) => setSession(e.target.value)}
              >
                <option value="FULLDAY">Full Day</option>
                <option value="HALFDAY_MORNING">Half Day (Morning)</option>
                <option value="HALFDAY_AFTERNOON">Half Day (Afternoon)</option>
              </select>
            </div>
            <Input label="Reason" value="System Support" disabled />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Date
            </label>
            <input
              type="date"
              required
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-slate-900"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-red-600 text-white p-3 rounded-lg text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Sending Request..." : "Submit to Telegram"}
          </button>
        </form>
      </div>
    </main>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
        {label}
      </label>
      <input
        className="w-full border border-slate-300 p-2.5 rounded-lg text-sm bg-white text-slate-900 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}