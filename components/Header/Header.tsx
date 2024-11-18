import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false); // Состояние модального окна
    const [activeTab, setActiveTab] = useState<"login" | "register">("login"); // Активная вкладка

    const toggleAuthModal = () => {
        setShowAuthModal((prev) => !prev); // Переключение состояния
    };

    const switchTab = (tab: "login" | "register") => {
        setActiveTab(tab); // Переключение вкладок
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.title}>The Movies App</h1>
                <div className={styles.searchContainer}>
                    <Link href="/">
                        <button className={styles.homeButton}>Home</button>
                    </Link>
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Search for a movie..."
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>Search</button>
                    </div>
                    <div className={styles.authContainer}>
                        {/* Проверяем кнопку Home */}

                        <button
                            className={styles.authButton}
                            onClick={toggleAuthModal} // Логика открытия/закрытия
                        >
                            Login / Sign Up
                        </button>
                    </div>
                </div>
            </div>

            {/* Модальное окно */}
            {showAuthModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={toggleAuthModal}>
                            ×
                        </button>
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${
                                    activeTab === "login" ? styles.activeTab : ""
                                }`}
                                onClick={() => switchTab("login")}
                            >
                                Login
                            </button>
                            <button
                                className={`${styles.tab} ${
                                    activeTab === "register" ? styles.activeTab : ""
                                }`}
                                onClick={() => switchTab("register")}
                            >
                                Register
                            </button>
                        </div>
                        {activeTab === "login" && (
                            <form>
                                <h2>Login</h2>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className={styles.input}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                />
                                <button type="submit" className={styles.button}>
                                    Login
                                </button>
                            </form>
                        )}
                        {activeTab === "register" && (
                            <form>
                                <h2>Register</h2>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className={styles.input}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={styles.input}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={styles.input}
                                />
                                <button type="submit" className={styles.button}>
                                    Register
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
