import React from "react";
import styles from "./DashboardContent.module.sass";
import Sidebar from "../DashboardSidebar/Sidebar";

export default function DashboardPlaceholder(props) {
    return(
        <div>
            <Sidebar/>
            <div className={styles.body}>
                {props.children}
            </div>
        </div>

    )
}