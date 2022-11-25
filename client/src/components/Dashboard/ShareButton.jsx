import { React } from "react";
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    TwitterShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    TelegramIcon,
    WhatsappIcon,
    TwitterIcon,
} from "react-share";

const url = "https://prograrmorprealpha2.herokuapp.com/";
const title = "Online Budget Analysis Tool";
const quote = "Online Budget Analysis Tool";
const subject = "Online Budget Analysis Tool";
const body = "Online Budget Analysis Tool";

function ShareButton(props) {
    return (
        <div className="btn-group dropup large-margin-updown" style={{ marginTop: "" + parseInt(props.marginTop - props.marginTop * 0.5) + "px" }}>
            <button type="button" className="btn btn-white btn-bat dropdown-toggle w100" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Partager <span className="caret"></span>
            </button>
            <div className="dropdown-menu report-footer-item-share">
                <EmailShareButton
                    url={url}
                    title={title}
                    quote={quote}
                    subject={subject}
                    body={body}
                >
                    <EmailIcon
                        size={32}
                        round />
                </EmailShareButton>
                <TwitterShareButton
                    url={url}
                    title={title}
                    quote={quote}>
                    <TwitterIcon
                        size={32}
                        round />
                </TwitterShareButton>
                <FacebookShareButton
                    url={url}
                    quote={quote}>
                    <FacebookIcon
                        size={32}
                        round />
                </FacebookShareButton>
                <TelegramShareButton
                    url={url}
                    title={title}
                    quote={quote}>
                    <TelegramIcon
                        size={32}
                        round />
                </TelegramShareButton>
                <WhatsappShareButton
                    url={url}
                    title={title}
                    quote={quote}>
                    <WhatsappIcon
                        size={32}
                        round />
                </WhatsappShareButton>
            </div>
        </div>
    )
}

export default ShareButton;

