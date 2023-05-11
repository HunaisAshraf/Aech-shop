import React from "react";
import Layout from "../layout/layout";
import "../../styles/contact.css";
import { MdCall, MdEmail, MdLocationPin } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { RiFacebookLine, RiInstagramLine, RiTwitterLine} from "react-icons/ri"

const Contact = () => {
  return (
    <Layout title={"Contact"}>
      <div className="contact  d-md-flex justify-content-evenly ">
        <div className="contact-info col-md-4 mb-5 mx-4">
          <h1 >Contact Us</h1>
          <p>Fill up the form and our team will contact you in 24 hours</p>
          <div className="cont-detail">
          <p>
            <MdCall /> +91 9977889999
          </p>
          <p>
            <MdEmail /> aechshop@gmail.com
          </p>
          <p>
            <MdLocationPin /> 108, Brigade Majestic, Gandhi Nagar, Bangalore
          </p>
          </div>
          <div className="social-log d-flex ">
            <h3><RiFacebookLine /></h3>
            <h3><RiTwitterLine /></h3>
            <h3><RiInstagramLine /></h3>
          </div>
        </div>

        <div className="contact-form bg-light col-md-4 mb-5 mx-4">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Label>Message</Form.Label>
            <FloatingLabel controlId="floatingTextarea2" label="Message">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "200px" }}
              />
            </FloatingLabel>
            <Button className="mt-4 btns" type="submit">
              Send Message
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
