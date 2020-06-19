import React from "react"
import styles from "./Features.module.sass"
import {INVITE_URL, SERVER_INVITE_URL} from "../constants";
import PlaylistScrot from "../assets/playlistScrot.png";
import WebAppScrot from "../assets/webappScrot.png";
import HelpScrot from "../assets/HelpScrot.png";
import GithubLogo from "../assets/githubLogo.svg";


export default function Features() {
    return(
        <div className={styles.content}>
            <div className={styles.header}>
                <h1 className={styles.headline}>Features</h1>
            </div>
            <div className={styles.section}>
                <h1 className={styles.sectionHeadline}>Personal Playlists</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        There has always been one thing that
                        bothered me about the “big music bots”:
                        The lack of playlists that you can save and
                        populate with your own songs. Chime has
                        personal playlists built-in and you don’t
                        need any premium subscription for
                        something that I consider essential.</p>
                    <img src={PlaylistScrot} className={styles.sectionImage} alt="Screenshot showing a discord chat where chime lists a user's playlists"/>
                </div>
            </div>
            <div className={styles.section}>
                <h1 className={styles.sectionHeadline}>Web Interface</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        You can not only manage your personal
                        playlists in discord, you can also do that in
                        our web app.
                        But that’s not the only thing you can do
                        there: You can also manage chime’s settings
                        in the servers you have permissions in and
                        edit things like the queue.</p>
                    <img src={WebAppScrot} className={styles.sectionImage} alt="Screenshot showing a user's playlists in chime's webinterface"/>
                </div>
            </div>
            <div className={styles.section}>
                <h1 className={styles.sectionHeadline}>20+ intuitive commands</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        From the beginning, one of my goals was
                        making chime as user-friendly as possible.
                        That’s why every single command has been
                        well-wrought and has dozens of aliases.
                        Chime values user feedback and that’s why
                        we even included a feedback command.</p>
                    <img src={HelpScrot} className={styles.sectionImage} alt="Screenshot showing chime's command help"/>
                </div>
            </div>
            <div className={styles.section}>
                <h1 className={styles.sectionHeadline}>Free & Open Source</h1>
                <div className={styles.sectionContent}>
                    <p className={styles.sectionText}>
                        I have decided to make chime open source
                        so that the community can help make it
                        better. Also, chime’s userbase has a say in
                        what is becoming a feature and what not.</p>
                    <img src={GithubLogo} className={styles.sectionImageGithub} alt="GitHub Logo"/>
                </div>
            </div>
            <div className={styles.endSection}>
                <h1 className={styles.sectionHeadline} >So, what are you waiting for?</h1>
                <a className={styles.link} href={INVITE_URL}>-&gt; Invite Chime</a>
                <p className={styles.sectionText}>
                    If that didn’t sound convincing to you, you
                    can test chime on our official discord server</p>
                <a className={styles.link} href={SERVER_INVITE_URL}>-&gt; Join the discord server</a>
            </div>

        </div>
    )
}