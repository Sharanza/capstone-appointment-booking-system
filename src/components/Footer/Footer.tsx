import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import awardLogo from "../../assets/images/silver-winner-logo.png";
import personaLogo from "../../assets/images/persona-homes-logo.png";

export function Footer() {
  const baseClass = "Footer";

  return (
    <section>
      <footer className={`${baseClass}__footer`}>
        <hr className={`${baseClass}__line-break`} />
        <div className={`${baseClass}__flex-container`}>
          <img
            className={`${baseClass}__persona-logo`}
            src={personaLogo}
            alt="Persona homes logo"
          />
          <img
            className={`${baseClass}__silver`}
            src={awardLogo}
            alt="Silver award image"
          />
        </div>
        <hr className={`${baseClass}__line-break`} />
        <section className={`${baseClass}__flex-container-parent`}>
          <div className={`${baseClass}__flex-container-touch`}>
            <h4 className={`${baseClass}__get-in-touch`}>
              <strong>Get in touch</strong>
            </h4>
            <a
              href="https://www.yourpersonahome.com/get-in-touch"
              className={`${baseClass}__get-in-touch`}
            >
              Meet our sales hosts dedicated to each of our developments.
            </a>
          </div>
          <div className={`${baseClass}__flex-container-legal`}>
            <h4 className={`${baseClass}__legal-stuff`}>
              <strong>Legal stuff</strong>
            </h4>
            <a
              href="https://www.yourpersonahome.com/legal/terms-and-conditions"
              className={`${baseClass}__legal-stuff`}
            >
              Persona terms & conditions
            </a>
            <a
              href="https://www.yourpersonahome.com/legal/cookie-policy"
              className={`${baseClass}__legal-stuff`}
            >
              Cookie policy
            </a>
            <a
              href="https://www.yourpersonahome.com/legal/privacy-policy"
              className={`${baseClass}__legal-stuff`}
            >
              Privacy policy
            </a>
          </div>
          <div className={`${baseClass}__flex-container-contact`}>
            <h4 className={`${baseClass}__get-in-touch`}>
              <strong>Get in touch</strong>
            </h4>
            <p className={`${baseClass}__get-in-touch`}>
              Call us: <strong>0808 196 1532</strong>
            </p>
            <p className={`${baseClass}__get-in-touch`}>
              Email us: <strong>contactus@yourpersonahome.com</strong>
            </p>
            <a href="https://www.facebook.com/yourpersonahome">
              <FontAwesomeIcon
                className={`${baseClass}__facebook`}
                icon={faFacebookF}
              ></FontAwesomeIcon>
            </a>
            <a href="https://twitter.com/yourpersonahome">
              <FontAwesomeIcon
                className={`${baseClass}__twitter`}
                icon={faTwitter}
              ></FontAwesomeIcon>
            </a>
            <a href="https://www.instagram.com/accounts/login/?next=/yourpersonahome/">
              <FontAwesomeIcon
                className={`${baseClass}__instagram`}
                icon={faInstagram}
              ></FontAwesomeIcon>
            </a>
            <a href="https://www.linkedin.com/persona-homes?_l=en_US">
              <FontAwesomeIcon
                className={`${baseClass}__linkedin`}
                icon={faLinkedin}
              ></FontAwesomeIcon>
            </a>
          </div>
        </section>
        <section>
          <div className={`${baseClass}__flex-container-disclaimers`}>
            <p className={`${baseClass}__footer-trademark`}>
              Persona it's your home – registered trade mark of Home Group
              Limited (charitable registered society no. 22981R). Home Group
              Developments Limited (registered in England Company no. 4664018)
              is a subsidiary of Home Group Limited. All copyrights and other
              intellectual property rights subsisting in this website and its
              contents are the property of Home Group, (including, but not
              limited to, all texts, documents, brochures, graphics, logos,
              trademarks, product names, images, website design and layouts).
              Any reproduction, transfer, modification, utilisation or
              publication of the website or its contents in its whole or part in
              any form, (including, but not limited to, framing, incorporation
              into other websites or other publications) for any public and/or
              commercial purpose is prohibited without the prior written consent
              of Home Group.
            </p>
            <p className={`${baseClass}__footer-disclaimer`}>
              Please note that all images are for illustrative purposes only and
              may feature similar Persona Homes developments or CGIs.
            </p>
            <p className={`${baseClass}__footer-copyright`}>
              © Home Group 2022
            </p>
          </div>
        </section>
      </footer>
    </section>
  );
}
