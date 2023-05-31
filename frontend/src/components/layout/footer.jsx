import "../../styles/footer.css";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="terms">
        <h5>About</h5>
        <li>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us </Link>
          <Link to="/policy">Terms & policy </Link>
        </li>
      </div>

      <div className="address">
        <h5>Address</h5>
        <p>
          Aech Internet Private Limited,
          <br /> Buildings Alyssa, Begonia & Clove Embassy Tech Village,
          <br /> Outer Ring Road,
          <br /> Devarabeesanahalli Village,
          <br /> Bengaluru, 560103, Karnataka, India
        </p>
      </div>
      <div className="social">
        <div >
          <a href="#facebook">
            <FaFacebookSquare />
          </a>
          <a href="#twitter">
            <FaTwitterSquare />
          </a>
          <a href="#instagram">
            <FaInstagramSquare />
          </a>
          <a href="#youtube">
            <FaYoutubeSquare />
          </a>
        </div>
        <div className="copyright">
          <p>@2023 Aech, Inc. All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
