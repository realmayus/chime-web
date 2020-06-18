import React from "react";
import styles from "./DashboardContent.module.sass";
import Sidebar from "../DashboardSidebar/Sidebar";
import {SpinnerBig} from "../Minor/Spinner";

export default function DashboardPlaceholder() {
    return(
        <div>
            <Sidebar/>
            <div className={styles.body}>
            </div>
        </div>

    )
}