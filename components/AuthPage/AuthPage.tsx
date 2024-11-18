import { useState } from "react";
import styles from "./AuthPage.module.css";

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");

    return (
        <div className={styles.container}>
            {/* Вкладки */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
                    onClick={() => setActiveTab("login")}
                >
                    Login
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
                    onClick={() => setActiveTab("register")}
                >
                    Register
                </button>
            </div>

            {/* Контент вкладки */}
            <div className={styles.content}>
                {activeTab === "login" ? (
                    <form className={styles.form}>
                        <h1 className={styles.title}>Login</h1>
                        <input type="email" placeholder="Email" className={styles.input} required />
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            required
                        />
                        <button className={styles.button}>Login</button>
                    </form>
                ) : (
                    <form className={styles.form}>
                        <h1 className={styles.title}>Register</h1>
                        <input type="text" placeholder="Username" className={styles.input} required />
                        <input type="email" placeholder="Email" className={styles.input} required />
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={styles.input}
                            required
                        />
                        <button className={styles.button}>Register</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
