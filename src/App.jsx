// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// Components
import Header from "./components/Header";
import FloatingIcons from "./components/FloatingIcons";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Dharshan from "./pages/Dharshan";
import Yagnas from "./pages/Yagnas";
import PoojaServices from "./pages/PoojaServices.jsx";
import SpecialServices from "./pages/SpecialServices.jsx";
import BookingForm from "./pages/BookingForm.jsx";
import BookingForm1 from "./components/BookingForm1.jsx";
import DonationsPage from "./pages/DonationPage.jsx";
import DonationSuccess from "./pages/DonationSuccess.jsx";
import OfflineDonations from "./pages/OfflineDonations.jsx";
import DayCalendar from "./pages/DayCalendar.jsx";
import MonthCalendar from "./pages/MonthCalendar.jsx";
import WeekCalendar from "./pages/WeekCalendar.jsx";
import YearCalendar from "./pages/YearCalendar.jsx";
import StaffLogin from "./pages/StaffLogin.jsx";

// Event Donation Pages (new)
import EventDonationPage from "./pages/EventDonationPage.jsx";
import EventRegistrationForm from "./pages/EventRegistrationForm.jsx";
import EventSuccess from "./pages/EventSuccess.jsx";

// Data
import DonationSchemes from "./data/DonationSchemes.jsx";

import "./App.css";

function App() {
  const navigate = useNavigate();

  // --- POOJA BOOKING ---
  const [poojaToBook, setPoojaToBook] = useState(null);

  // --- DONATIONS ---
  const initialSchemeId = DonationSchemes[0]?.id || null;
  const [selectedScheme, setSelectedScheme] = useState(initialSchemeId);
  const [donationAmount, setDonationAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- HANDLERS ---
  const handleDonationSubmit = (donorDetails) => {
    setIsSubmitting(true);
    console.log("Donation Data Sent to API:", {
      scheme: selectedScheme,
      amount: donationAmount,
      ...donorDetails,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/donations/success");
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleNewDonation = () => {
    setDonationAmount(0);
    setSelectedScheme(initialSchemeId);
    navigate("/donations/online");
    window.scrollTo(0, 0);
  };

  const handlePoojaBooking = (poojaName) => {
    setPoojaToBook(poojaName);
    navigate("/booking");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <FloatingIcons />

      <Routes>
        {/* 🔹 Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/dharshan" element={<Dharshan />} />
        <Route path="/yagnas" element={<Yagnas />} />

        {/* 🔹 Pooja Services */}
        <Route
          path="/pooja"
          element={<PoojaServices onBookPooja={handlePoojaBooking} />}
        />
        <Route
          path="/booking"
          element={
            <BookingForm
              poojaName={poojaToBook}
              onBack={() => navigate("/pooja")}
            />
          }
        />
        <Route path="/booking-form1" element={<BookingForm1 />} />

        {/* 🔹 Special Services */}
        <Route path="/special" element={<SpecialServices />} />

        {/* 🔹 Event Calendars */}
        <Route path="/events/day" element={<DayCalendar />} />
        <Route path="/events/week" element={<WeekCalendar />} />
        <Route path="/events/month" element={<MonthCalendar />} />
        <Route path="/events/year" element={<YearCalendar />} />

        {/* 🔹 Staff Login */}
        <Route path="/staff-login" element={<StaffLogin />} />

        {/* 🔹 Online Donations */}
        <Route
          path="/donations/online"
          element={
            <DonationsPage
              selectedScheme={selectedScheme}
              setSelectedScheme={setSelectedScheme}
              amount={donationAmount}
              setAmount={setDonationAmount}
              handleDonationSubmit={handleDonationSubmit}
              isSubmitting={isSubmitting}
            />
          }
        />

        {/* 🔹 Offline Donations */}
        <Route path="/donations/offline" element={<OfflineDonations />} />

        {/* 🔹 Donation Success */}
        <Route
          path="/donations/success"
          element={
            <DonationSuccess
              amount={donationAmount}
              onNewDonation={handleNewDonation}
            />
          }
        />

        {/* ✅ NEW: Event Donations */}
        <Route path="/events" element={<EventDonationPage />} />
        <Route
          path="/events/register/:id"
          element={<EventRegistrationForm />}
        />
        <Route path="/events/success" element={<EventSuccess />} />
      </Routes>

      <Footer />
    </>
  );
}

// ✅ Wrap App with Router
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
