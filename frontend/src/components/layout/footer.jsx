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
      <div className="social">
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
      <div className="terms">
        <li>
          <Link to="/policy">Terms & policy |</Link>
          <Link to="/about" >About |</Link>
          <Link to="/contact" >Contact </Link>
        </li>
      </div>
      <div className="copyright">
          <p>@2023 Aech, Inc. All Rights Reserved</p>
        </div>
    </div>
    
  );
};

export default Footer;
