import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const AboutUs = () => {

    return(


        <div>
            <Navbar/>
                <div className="abt-container">
                    <div className="abt-content">
                        <h1 style={{marginBottom: "25px"}}>About Us</h1>
                        <section>
                            <h2>Our History</h2>
                            <p>
                                Dreamy Goodies was founded in 2024 by a group of passionate Humber Polytechnic Computer
                                Programming (& Analysis)
                                students who shared a love for baking and technology. The founders realized the
                                potential in
                                combining their skills to create a seamless online platform for ordering baked goods.
                                Since
                                its inception, SweetTooth has achieved several milestones, including rapid growth in
                                customer
                                base, expansion of product offerings, and partnerships with local businesses.
                            </p>
                        </section>
                        <section>
                            <h2>Our Mission</h2>
                            <p>
                                SweetTooth's mission is to deliver happiness and satisfaction through our delectable
                                baked
                                goods, catering to individuals and businesses alike, while fostering a sustainable,
                                innovative,
                                and customer-centric culture.SweetTooth's purpose is to revolutionize the way people
                                enjoy
                                baked goods by providing a convenient, user-friendly online platform that caters to a
                                wide
                                range of tastes and preferences. We aim to become a leading online bakery, known for our
                                exceptional products, unrivaled customer service, and commitment to sustainability.
                            </p>
                        </section>
                        <section>
                            <h2>Our Values</h2>
                            <p><span className="bold_text">Customer Centricity</span>: We prioritize our customers'
                                needs and strive to exceed their expectations.<br/>
                                <span className="bold_text">Quality</span>: We are committed to providing high-quality,
                                delicious baked goods made from the finest ingredients.<br/>
                                <span className="bold_text">Innovation</span>: We continually seek to improve our
                                processes and offerings through the integration of technology and creative
                                problem-solving.<br/>
                                <span className="bold_text">Sustainability</span>: We are dedicated to minimizing our
                                environmental impact and promoting eco-friendly practices.<br/>
                                <span className="bold_text">Teamwork</span>: We foster a collaborative and supportive
                                work environment that empowers our team members to grow and excel.</p>
                        </section>
                        <h2 style={{marginBottom: "25px"}}>Our Team</h2>
                        <section className="team_block">
                            <div className="member_block">
                                <h2 className="member_name">Bruno Fernandes Da Cunha Santos</h2>
                                <h4 className="member_credentials">CEO & Lead Developer</h4>
                                {/*<div className="photo_block">*/}
                                {/*    <img className="member_photo" src=""*/}
                                {/*         alt="Photo of Bruno Fernandes"/>*/}
                                {/*</div>*/}
                                <p className="member_about">A natural leader with a strong background in computer
                                    programming, Bruno oversees the company's operations and spearheads the development
                                    of the online platform.</p>
                            </div>
                            <div className="member_block">
                                <h2 className="member_name">Katherine Dorensky</h2>
                                <h4 className="member_credentials">COO & Customer Relations</h4>
                                {/*<div className="photo_block">*/}
                                {/*    <img className="member_photo" src=""*/}
                                {/*         alt="Photo of Katherine Dorensky"/>*/}
                                {/*</div>*/}
                                <p className="member_about"> With a talent for organization and a dedication to customer
                                    satisfaction, Katherine manages the day-to-day operations and ensures a seamless
                                    customer experience.</p>
                            </div>
                            <div className="member_block" >
                                <h2 className="member_name">Suellen Reis Santos De Oliveira Motta</h2>
                                <h4 className="member_credentials">CFO & Marketing Strategist</h4>
                                {/*<div className="photo_block">*/}
                                {/*    <img className="member_photo" src=""*/}
                                {/*         alt="Photo of Sullen Reis"/>*/}
                                {/*</div>*/}
                                <p className="member_about">Suellen's keen financial acumen and marketing prowess have
                                    been instrumental in shaping SweetTooth's brand and ensuring its financial
                                    stability.</p>
                            </div>
                        </section>
                    </div>
                </div>
            <Footer/>
        </div>
);
}
export default AboutUs;