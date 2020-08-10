import React from "react"
import styles from "./StaticContent.module.sass"
import EmailQuiz from "../components/Minor/EmailQuiz";


export const version = "1.0.2";

export default function PrivacyPolicy() {

    return(
        <div className={styles.contentWrapper}>
            <h1>Privacy Policy for chime</h1>

            <p>At chime, accessible from https://chime.realmayus.xyz, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by chime and how we use it.</p>

            <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

            <h2>Consent</h2>

            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

            <h2>Information we collect</h2>

            This web app and the discord bot collects the following data:
            <ul>
                <li>Your Discord user id (for identifying you and knowing which playlist data is yours)</li>
                <li>The playlists you have created (name of the playlist, contents of the playlist)</li>
            </ul>
            I reserve the right of temporarily storing your IP-Address as well, to prevent abuse, if necessary.
            When you log in with your Discord account, an "access token" will be transmitted securely to our servers to extract your Discord user ID from it.
            We do not store those access tokens.

            <h2>How we use your information</h2>

            <p>We use the information we collect in various ways, including to:</p>

            <ul>
                <li>Provide, operate, and maintain our webste</li>
                <li>Find and prevent fraud</li>
            </ul>

            <h2>Log Files</h2>

            <p>Chime temporarily stores your device's IP address in log files. The reason for this is to prevent abuse.</p>


            <h2>Cookies / localStorage</h2>
                <p>Chime *itself* does not store any cookies on your device but it stores your discord token on your PC by using <code>localStorage</code>. localStorage is a built-in browser feature which allows developers to store simple key-value pairs (text) in your browser's cache. By emptying this cache, the localStorage entries get deleted. This allows you to conveniently use the web app without having to re-authorize the web app through discord. If you want to delete the localStorage entry, you can do so by clicking on your avatar and choosing "Sign Out". The value of the localStorage entry then gets overwritten by <code>null</code>. The localStorage entry only gets used for this very purpose and isn't being used to e.g. track you.</p>
                <p>Also, it stores a value that tells us whether you have clicked on the 'X' of the privacy & terms of service popup so that we don't need to show it you again. We also store the last version of the read privacy policy and terms of service so that we can show you a popup so you know when these policies changed.</p>
                <p>However, due to the fact that chime uses CloudFlare to protect its web services against malicious users and DDoS attacks there are some cookies placed on your device by CloudFlare. <a href="https://support.cloudflare.com/hc/en-us/articles/200170156-Understanding-the-Cloudflare-Cookies">Refer to this CloudFlare document</a> in order to understand what these cookies are being used for. In short, the cookies that CloudFlare places on your device are not being used for cross-site tracking, won't follow users from site to site or correspond to a user ID in our application.</p>
                <p>These cookies are necessary for our site's protection and can therefore not be turned off.</p>
            <h2>Related Privacy Policies</h2>
                <p>Due to chime's features it interfaces with the Discord app. When you sign in, you will be redirected to Discord's servers in order to authorize chime for your Discord account. <a href={"https://discord.com/privacy"}>See Discord's Privacy Policy here.</a> </p>
                <p>As mentioned earlier, chime's web app uses CloudFlare as a proxy to protect itself from users with e.g. malicious intent and DDoS attacks <a href={"https://www.cloudflare.com/privacypolicy/"}>See CloudFlare's privacy policy here.</a> </p>

            <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

            <p>Under the CCPA, among other rights, California consumers have the right to:</p>
            <p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
            <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
            <p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

            <h2>GDPR Data Protection Rights</h2>

            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
            <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
            <p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
            <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
            <p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
            <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
            <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

            <h2>Children's Information</h2>

            <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>

            <p>chime does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>

            <br/>
            <br/>
            <br/>

            <p>Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info">Privacy Policy Generator</a> and the <a href="https://www.privacypolicyonline.com/privacy-policy-generator/">Online Privacy Policy Generator</a>.</p>

            <h2>Contact</h2>
            <p>If you have any questions or inquiries, please do not hesitate to contact me at:</p>
            <EmailQuiz/>

        </div>
    )
}