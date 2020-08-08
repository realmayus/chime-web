import React from "react";
import styles from "./StaticContent.module.sass"
import EmailQuiz from "../components/Minor/EmailQuiz";

export const version = "1.0.0";

export default function TermsOfService() {
    return(
        <div className={styles.contentWrapper}>
            <h1>Terms of Service</h1>
            <p>The following Terms of Service ("terms") rule your access and your use of the chime music bot within Discord and the chime web app. By using our products and services, you agree to abide by these Terms.</p>
            <ul>
                <li>Chime allows to stream audio from multiple sources to Discord for the end user to listen to.</li>
                <li>By requesting audio to be streamed through chime from these sources, users accept that chime will have no liability arising from the user's use of or access to any third-party content, service or website.</li>
                <li><b>To the maximum extent permitted by law, chime shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, good-will, or other intangible losses, resulting from
                    <ol type={"a"}>
                        <li>your access to or use of or inability to access or use the products or third party services;</li>
                        <li>any conduct or content of any third party on the products, including without limitation, any defamatory, offensive or illegal conduct of other users or third parties; or</li>
                        <li>unauthorized access, use or alteration of your transmissions or content.</li>
                    </ol>
                </b>
                </li>
                <li>Chime reserves the right to refuse service to anyone, without a specified reason.</li>
                <li>Chime reserves the right to change these terms without further notice.</li>
            </ul>
            <h3>Contact</h3>
            <p>In case of questions, please do not hesitate to contact me:</p>
            <EmailQuiz/>
            <p className={styles.centered}>Last change: 06/27/2020</p>
            <small>These Terms of service were inspired by Rythm Music Bot's ToS <a href={"https://rythmbot.co/tos"}>here.</a> </small>
        </div>
    )
}