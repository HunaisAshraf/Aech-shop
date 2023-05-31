import React from "react";
import Layout from "../layout/layout";
import "../../styles/about.css";

const About = () => {
  return (
    <Layout title={"About"}>
      <div className="about">
        <div className="abt-content">
          <h3>Aech: The One-stop Shopping Destination</h3>
          <p>
            E-commerce is revolutionizing the way we all shop in India. Why do
            you want to hop from one store to another in search of the latest
            phone when you can find it on the Internet in a single click? Not
            only mobiles.  houses everything you can possibly imagine,
            from trending electronics like laptops, tablets, smartphones, and
            mobile accessories to in-vogue fashion staples like shoes, clothing
            and lifestyle accessories; from modern furniture like sofa sets,
            dining tables, and wardrobes to appliances that make your life easy
            like washing machines, TVs, ACs, mixer grinder juicers and other
            time-saving kitchen and small appliances; from home furnishings like
            cushion covers, mattresses and bedsheets to toys and musical
            instruments, we got them all covered. You name it, and you can stay
            assured about finding them all here. For those of you with erratic
            working hours, Aech is your best bet. Shop in your PJs, at night
            or in the wee hours of the morning. This e-commerce never shuts
            down.
          </p>

          <h3>Aech Plus</h3>
          <p>
            What's more, you can even use the Aech supercoins for a number
            of exciting services, like:
          </p>
          <p>An annual Zomato Gold membership</p>
          <p>An annual Hotstar Premium membership</p>
          <p>6 months Gaana plus subscription</p>
          <p>Rupees 550 instant discount on flights on ixigo</p>
          <p>
            Check out https://www.aech.com/plus/all-offers for the entire
            list. Terms and conditions apply.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
