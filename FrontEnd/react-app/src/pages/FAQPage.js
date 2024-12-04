import { useState } from "react";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";
import { Accordion, Card } from "react-bootstrap";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Dreamy Goodies?",
      answer:
        "Dreamy Goodies is an e-commerce bakery platform that allows you to easily order fresh, high-quality baked goods online. We offer a variety of bakery items, including cakes, pastries, bread, and more, with the convenience of delivery straight to your door.",
    },
    {
      question:
        "How does Dreamy Goodies solve the problem of limited access to fresh bakery products?",
      answer:
        "We provide a convenient online platform that allows customers to order freshly baked goods without having to visit a physical store. This is especially beneficial for those with busy schedules or limited mobility who want to enjoy high-quality baked treats without leaving their homes.",
    },
    {
      question: "Can I customize my order?",
      answer:
        "Yes, Dreamy Goodies offers customization options for your bakery items. You can choose from a range of options, including gluten-free, vegan, and other dietary preferences, to suit your specific needs.",
    },
    {
      question: "How can I place an order?",
      answer:
        "To place an order, simply browse our website, select the items you'd like to purchase, choose any customization options, and proceed to checkout. You can pay securely online and have your order delivered to your doorstep.",
    },
    {
      question: "What types of payment do you accept?",
      answer:
        "We accept a variety of payment methods, including credit/debit cards, PayPal, and bank transfers. All payments are processed securely to ensure your information is protected.",
    },
    {
      question: "Is Dreamy Goodies available for delivery in my area?",
      answer:
        "Dreamy Goodies currently offers delivery within select regions. You can check the availability for your location during the checkout process by entering your delivery address.",
    },
    {
      question: "How do I know if my order has been shipped?",
      answer:
        "Once your order has been prepared and shipped, you will receive an email with a tracking number. You can use this tracking number to check the status of your delivery.",
    },
    {
      question: "What if I have an allergy or dietary restriction?",
      answer:
        "We take allergies and dietary restrictions seriously. Our platform offers options for gluten-free, vegan, and other dietary preferences. You can specify your needs during the customization process when placing your order.",
    },
    {
      question: "Can I return or exchange an item?",
      answer:
        "Due to the perishable nature of our products, we do not accept returns or exchanges. However, if there is an issue with your order, please contact our customer support team, and we will do our best to resolve it.",
    },
  ];

  const [error, setError] = useState("");

  return (
    <div className="index-container" style={{ overflow: "hidden" }}>
      <Navbar />
      <div className="faq-container">
        <div className="faq-section">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
            Frequently Asked Questions
          </h1>

          {error && <p className="error">{error}</p>}

          <Accordion defaultActiveKey="0">
            {" "}
            {faqData.map((faq, index) => (
              <Card key={index}>
                <Accordion.Item eventKey={String(index)}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>{faq.answer}</Accordion.Body>
                </Accordion.Item>
              </Card>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer pos={"relative"} />
    </div>
  );
};

export default FAQ;
