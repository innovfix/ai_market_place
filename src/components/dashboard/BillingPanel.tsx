"use client";

function PaymentMethodsSection() {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <div className="py-8">
      <h3 className="text-lg font-medium mb-2">Payment methods</h3>
      <p className="text-gray-400 mb-8">Easily manage your payments methods through our secure system.</p>

      <div className="max-w-xl">
        <div className="bg-black/80 border border-gray-800 rounded-xl p-6 mb-4">
          <div
            className="flex items-center gap-3 mb-6 cursor-pointer"
            onClick={() => setModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModalOpen(true); }}
          >
            <span className="text-gray-400 text-2xl font-semibold">P</span>
            <span className="text-gray-200 text-lg font-medium">PayPal</span>
          </div>
          <hr className="border-gray-700 mb-2" />
          <button
            className="flex items-center gap-2 text-lg font-semibold py-3 px-4 rounded-lg hover:bg-black/60 transition mt-2 cursor-pointer"
            style={{ color: '#16a34a' }}
            onClick={() => setModalOpen(true)}
            type="button"
          >
            <span className="text-2xl leading-none">+</span>
            <span className="text-base font-semibold">Add a payment method</span>
          </button>
        </div>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-2xl text-black hover:text-gray-600"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black">Add payment method</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <label className="flex items-center gap-4">
                <input type="radio" name="payment-method" className="w-5 h-5" />
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-2xl font-semibold">P</span>
                  <span className="text-xl font-semibold" style={{ color: '#003087' }}>
                    <span>Pay</span><span style={{ color: '#009cde' }}>Pal</span>
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function BillingPanel() {
  const tabs = ["Billing history", "Billing info", "Balances", "Payment methods"];
  const [activeTab, setActiveTab] = React.useState<string>(tabs[0]);
  const [query, setQuery] = React.useState("");
  const [dateRangeOpen, setDateRangeOpen] = React.useState(false);

  // placeholder empty data
  const invoices: any[] = [];

  const filtered = useMemo(() => {
    if (!query) return invoices;
    return invoices.filter((i) => JSON.stringify(i).toLowerCase().includes(query.toLowerCase()));
  }, [invoices, query]);

  const downloadCSV = () => {
    const headers = ["Date", "Document", "Service", "Order", "Currency", "Total"];
    const rows: string[][] = invoices.map((inv) => [inv.date, inv.document, inv.service, inv.order, inv.currency, inv.total]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "billing-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };


  // Document and Currency dropdown state
  const [documentOpen, setDocumentOpen] = React.useState(false);
  const [currencyOpen, setCurrencyOpen] = React.useState(false);

  // For closing dropdowns on outside click
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setDateRangeOpen(false);
      }
      if (documentRef.current && !documentRef.current.contains(event.target as Node)) {
        setDocumentOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    if (dateRangeOpen || documentOpen || currencyOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dateRangeOpen, documentOpen, currencyOpen]);

  // Date range state
  const [selectedMonth, setSelectedMonth] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");

  return (
    <div className="bg-black/95 rounded-xl border border-gray-800 p-8 text-white">
      <div className="border-b pb-4 mb-6">
        <nav className="flex gap-6 items-end">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 text-sm font-semibold ${activeTab === t ? 'text-white border-b-2 border-white pb-2' : 'text-gray-400'} focus:outline-none`}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === "Billing history" && (
        <div>
          <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-3 relative">
                  {/* Date Range Button & Dropdown */}
                  <Button
                    onClick={() => {
                      setDateRangeOpen((v) => !v);
                      setDocumentOpen(false);
                      setCurrencyOpen(false);
                    }}
                    className="min-w-[120px]"
                  >
                    Date range
                  </Button>
                  {dateRangeOpen && (
                    <div
                      ref={dateRangeRef}
                      className="absolute left-0 top-12 z-50 w-[370px] bg-black border border-gray-800 rounded-xl shadow-2xl p-6 text-white flex flex-col gap-4 animate-fade-in"
                    >
                      <div className="font-bold text-lg mb-2">Date range</div>
                      <div>
                        <label className="block text-sm mb-1 text-gray-300">Select a month</label>
                        <select
                          value={selectedMonth}
                          onChange={e => setSelectedMonth(e.target.value)}
                          className="w-full bg-black/80 border border-gray-700 rounded px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b5cff]"
                        >
                          <option value="">Select a month</option>
                          {/* Example months, can be dynamic */}
                          <option value="2025-09">September 2025</option>
                          <option value="2025-08">August 2025</option>
                          <option value="2025-07">July 2025</option>
                        </select>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="block text-sm mb-1 text-gray-300">From</label>
                          <input
                            type="date"
                            value={fromDate}
                            onChange={e => setFromDate(e.target.value)}
                            className="w-full bg-black/80 border border-gray-700 rounded px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b5cff]"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm mb-1 text-gray-300">To</label>
                          <input
                            type="date"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                            className="w-full bg-black/80 border border-gray-700 rounded px-3 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b5cff]"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button
                          className="w-28"
                          onClick={() => setDateRangeOpen(false)}
                          type="button"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Document Button & Dropdown */}
                  <Button
                    onClick={() => {
                      setDocumentOpen((v) => !v);
                      setDateRangeOpen(false);
                      setCurrencyOpen(false);
                    }}
                    className="min-w-[120px]"
                  >
                    Document
                  </Button>
                  {documentOpen && (
                    <div
                      ref={documentRef}
                      className="absolute left-[130px] top-12 z-50 w-[300px] bg-black border border-gray-800 rounded-xl shadow-2xl p-6 text-white flex flex-col gap-4 animate-fade-in"
                    >
                      <div className="font-bold text-lg mb-2">Document</div>
                      {/* Add any document filter fields here if needed */}
                      <div className="flex justify-end pt-2">
                        <Button
                          className="w-28"
                          onClick={() => setDocumentOpen(false)}
                          type="button"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Currency Button & Dropdown */}
                  <Button
                    onClick={() => {
                      setCurrencyOpen((v) => !v);
                      setDateRangeOpen(false);
                      setDocumentOpen(false);
                    }}
                    className="min-w-[120px]"
                  >
                    Currency
                  </Button>
                  {currencyOpen && (
                    <div
                      ref={currencyRef}
                      className="absolute left-[260px] top-12 z-50 w-[300px] bg-black border border-gray-800 rounded-xl shadow-2xl p-6 text-white flex flex-col gap-4 animate-fade-in"
                    >
                      <div className="font-bold text-lg mb-2">Currency</div>
                      {/* Add any currency filter fields here if needed */}
                      <div className="flex justify-end pt-2">
                        <Button
                          className="w-28"
                          onClick={() => setCurrencyOpen(false)}
                          type="button"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

            <div className="flex items-center gap-4">
      <div className="w-96">
                <div className="relative">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by invoice or order number"
        className="w-full bg-black/60 border border-gray-700 rounded px-3 py-3 text-sm text-gray-200 placeholder:text-gray-500"
                  />
                </div>
              </div>
              <button onClick={downloadCSV} className="flex items-center gap-2 text-white text-sm bg-gradient-to-r from-[#6b5cff] to-[#9b4cff] hover:from-[#5a3bff] hover:to-[#8a2bff] px-3 py-2 rounded-lg shadow-md">
                <Download className="w-4 h-4 text-white" />
                Download report
              </button>
            </div>
          </div>
            <div className="text-sm text-gray-400 mb-6">Showing {filtered.length} result{filtered.length === 1 ? '' : 's'}.</div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-t border-b border-gray-800 text-gray-300">
                  <tr>
                    <th className="py-4 px-4 w-12"><input type="checkbox" aria-label="select-all" className="accent-white" /></th>
                    <th className="py-4 px-6 text-gray-200 font-semibold">Date</th>
                    <th className="py-4 px-6 text-gray-200 font-semibold">Document</th>
                    <th className="py-4 px-6 text-gray-200 font-semibold">Service</th>
                    <th className="py-4 px-6 text-gray-200 font-semibold">Order</th>
                    <th className="py-4 px-6 text-gray-200 font-semibold">Currency</th>
                    <th className="py-4 px-6 text-gray-200 font-semibold">Total</th>
                    <th className="py-4 px-6 text-gray-200 font-semibold">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center">
                        <div className="max-w-md mx-auto">
                          {/* image removed per request */}
                          <h3 className="text-2xl font-semibold mb-3 text-white">No invoices yet...</h3>
                          <p className="text-gray-400 mb-6">Ready to place an order? Make sure <a href="#" className="underline text-gray-300">your billing info</a> is up to date.</p>
                          <a
                            href="/dashboard"
                            className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#6b5cff] to-[#9b4cff] hover:from-[#5a3bff] hover:to-[#8a2bff] shadow-md text-center inline-block"
                          >
                            Explore
                          </a>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((inv, i) => (
                      <tr key={i} className="border-b border-gray-800">
                        <td className="p-4"><input type="checkbox" /></td>
                        <td className="p-4 text-gray-200">{inv.date}</td>
                        <td className="p-4 text-gray-200">{inv.document}</td>
                        <td className="p-4 text-gray-200">{inv.service}</td>
                        <td className="p-4 text-gray-200">{inv.order}</td>
                        <td className="p-4 text-gray-200">{inv.currency}</td>
                        <td className="p-4 text-gray-200">{inv.total}</td>
                        <td className="p-4">{inv.pdf ? <a href={inv.pdf} className="text-blue-400">PDF</a> : '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
        </div>
      )}

      {activeTab === "Billing info" && (
        <div className="py-8 bg-black/95 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 flex items-start">
              <div className="w-full text-center md:text-left">
                <h3 className="text-xl font-semibold text-white mb-2">Billing information</h3>
                <p className="text-gray-400 text-sm">Manage your billing contact and address details. All fields marked (mandatory) are required.</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Full name <span className="text-gray-500">(mandatory)</span></label>
                  <input className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-white placeholder:text-gray-500" placeholder="Full name" />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Company name</label>
                  <input className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-white placeholder:text-gray-500" placeholder="Company name" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Country</label>
                    <select className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-white">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">State/Union territory <span className="text-gray-500">(mandatory)</span></label>
                    <select className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-white">
                      <option>Tamil Nadu</option>
                      <option>Karnataka</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Address</label>
                  <input className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-white placeholder:text-gray-500" placeholder="Street or POB" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">City</label>
                    <input className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Postal code</label>
                    <input className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-300 mb-2">Are you a citizen/resident of India? <span className="text-gray-500">(mandatory)</span></p>
                      <div className="flex items-center gap-4">
                        <label className="text-gray-300"><input type="radio" name="resident" className="mr-2" /> Yes</label>
                        <label className="text-gray-300"><input type="radio" name="resident" className="mr-2" /> No</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-300 font-medium">Invoices</p>
                  <p className="text-gray-400 text-sm mb-2">You will find your invoices under the Billing history tab.</p>
                  <label className="inline-flex items-center text-gray-300">
                    <input type="checkbox" className="mr-2" /> I want to get invoices via email as well.
                  </label>
                </div>

                <div className="pt-4">
                  <button type="button" className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-[#6b5cff] to-[#9b4cff] hover:from-[#5a3bff] hover:to-[#8a2bff] shadow-md">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Balances" && (
        <div className="py-8">
          <h2 className="text-2xl font-semibold mb-6">Available balances</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fiverr Balance Card */}
            <div className="bg-black/90 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Fiverr Balance</h3>

              <div className="bg-black/95 border border-gray-800 rounded p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Earnings <span className="text-gray-500">Ⓘ</span></p>
                    <div className="text-3xl font-bold mt-2">₹0.00</div>
                    <p className="text-sm text-gray-500 mt-2">Available for withdrawal or purchases.</p>
                  </div>
                  <div className="text-sm text-blue-400 hover:underline cursor-pointer">Your Earnings Page</div>
                </div>

                <div className="border-t border-gray-800 mt-4 pt-4">
                  <p className="text-sm text-gray-400">From canceled orders <span className="text-gray-500">Ⓘ</span></p>
                  <div className="text-2xl font-semibold mt-2">₹0.00</div>
                </div>
              </div>
            </div>

            {/* Credits Card */}
            <div className="bg-black/90 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-200 mb-4">Fiverr Credits</h3>

              <div className="bg-black/95 border border-gray-800 rounded p-6">
                <div>
                  <p className="text-sm text-gray-400">Credits <span className="text-gray-500">Ⓘ</span></p>
                  <div className="text-3xl font-bold mt-2">₹0.00</div>
                  <p className="text-sm text-gray-500 mt-2">Use for purchases.</p>
                </div>

                <div className="border-t border-gray-800 mt-6 pt-4">
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">Like to earn some credits?</h4>
                  <p className="text-sm text-gray-400 mb-4">Refer people you know and everyone benefits!</p>
                  <button className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#6b5cff] to-[#9b4cff] hover:from-[#5a3bff] hover:to-[#8a2bff] shadow-md">Earn Fiverr Credits</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Payment methods" && (
        <PaymentMethodsSection />
      )}
    </div>
  );
}
