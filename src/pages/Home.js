import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Faqs from "../components/Home Components/FAQS/Faqs";
import HomeFooter from "../components/Home Components/Footer/HomeFooter";
import HeaderImg from "../components/Home Components/Hero Section/heroSection";
import Howto from "../components/Home Components/Howto/Howto";
import Navbar from "../components/Home Components/Navigation/NavBar";
import Card from "../components/Home Components/Search Doctor/Card";
import Form from "../components/Home Components/Search Doctor/Form";
import Services from "../components/Home Components/Services/services";
import TrackMe from "../components/Home Components/Track Patient/Form";
const moment = require("moment");

export default function Home() {
  const [query, setQuery] = useSearchParams({
    Fname: "",
    Lname: "",
    specialization: "",
    HMO: "",
  });
  const [doctors, setdoctors] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectValues, setSelectValues] = useState({
    specialization: [],
    hmo: [],
  });

  localStorage.setItem("currentPage", 1);
  //Initialize Specialization and HMO list
  useEffect(() => {
    document.title = "Home";
    async function get() {
      const res = await axios.get(process.env.REACT_APP_ONLINE + "/initialize");
      const { data } = res.data;
      setSelectValues({ specialization: data.specialization, hmo: data.hmo });
    }
    get();
  }, []);
  //Update Seach Query
  useEffect(() => {
    async function get() {
      setLoading(true);
      const res = await axios.get(
        process.env.REACT_APP_ONLINE +
          "/doctors/search/?Fname=" +
          query.get("Fname") +
          "&Lname=" +
          query.get("Lname") +
          "&specialization=" +
          query.get("specialization") +
          "&HMO=" +
          query.get("HMO")
      );
      const { data } = res.data;

      setdoctors(data.result);
      filterSchedule(data.schedule);
      setLoading(false);
    }
    get();
  }, [query]);

  const filterSchedule = (sched) => {
    const filteredSchedule = sched.filter((obj) => {
      // Combine date and time strings into a single string
      const dateTimeString = obj.date + " " + obj.start;

      // Parse the date and time string into a Moment.js object
      const schedTime = moment(dateTimeString, "MMMM D, YYYY h:mmA");
      // Get the current time and add 1 hour
      const currentTime = moment().add(1, "hours");
      // Check if the schedTime is greater than the currentTime
      return schedTime.isAfter(currentTime);
    });
    setSchedule(filteredSchedule);
    return;
  };

  //Sub-Components
  return (
    <>
      <div className="home_body">
        {<Navbar />}
        {<HeaderImg />}
        {<Howto />}
        {<Services />}

        <Form
          query={query}
          setCurrentPage={setCurrentPage}
          setQuery={setQuery}
          selectValues={selectValues}
        />
        {
          <Card
            doctors={doctors}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            schedule={schedule}
            loading={loading}
          />
        }
        {<TrackMe />}
        {<Faqs />}
        {<HomeFooter />}
      </div>
    </>
  );
}
