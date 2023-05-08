import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { CloseButton, Modal } from "react-bootstrap";
export default function TermsAndConditionsModal(props) {
  const { showTermsModal, handleCloseTerms, acceptTermsHandler } = props;
  const smallScreen = useMediaQuery(
    "(min-width: 701px) and (max-width: 1255px)"
  );
  const isMobile = useMediaQuery("(max-width:700px");
  const buttonwidthS = smallScreen
    ? "120px"
    : "100px" | isMobile
    ? "100px"
    : "100px";
  return (
    <>
      <Modal show={showTermsModal} centered>
        <Modal.Header>
          <Modal.Title className="modalCalendarHeader">
            Terms & Condition
          </Modal.Title>
          <CloseButton onClick={handleCloseTerms}></CloseButton>
        </Modal.Header>
        <Modal.Body>
          <div className="greetingTerms">
            Welcome to our hospital appointment system. By using our system, you
            agree to comply with and be bound by the following terms and
            conditions of use, which together with our privacy policy govern our
            relationship with you in relation to this system. If you disagree
            with any part of these terms and conditions, please do not use our
            system.
          </div>
          <div className="termscontent mt-4">
            <div className="wordlistterms">
              <label className="numberlistedTerms">1. </label>
              Use of the system is subject to acceptance of these terms and
              conditions.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">2. </label>
              The system is for booking hospital appointments only and any other
              use is prohibited.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">3. </label>
              The accuracy of the information provided is the responsibility of
              the user.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">4. </label>
              Users must not share their login details with others.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">5. </label>
              The hospital reserves the right to cancel appointments or limit
              access to the system without notice.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">6. </label>
              Users must not use the system for any unlawful or malicious
              purposes.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">7. </label>
              The hospital is not responsible for any loss or damage caused by
              the use of the system.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">8. </label>
              The hospital may update or modify the system and these terms and
              conditions at any time.
            </div>
            <div className="wordlistterms">
              <label className="numberlistedTerms">9. </label>
              Any disputes will be subject to the laws of the relevant
              jurisdiction.
            </div>{" "}
            <div className="wordlistterms">
              <label className="numberlistedTerms">10. </label>
              By using the system, users agree to these terms and conditions.
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            radius="xl"
            size="sm"
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#2F9D44",
              minWidth: buttonwidthS,
            }}
            onClick={acceptTermsHandler}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
