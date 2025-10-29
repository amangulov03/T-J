import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Импорт для анимаций
import "./page2.css";
import { IoIosHeart } from "react-icons/io";
import music from "../songs/S-j-m-seni-Mirbek-Atabekov-ft.-Dj-Teddme-Premera-klipa-2018.mp3";
import Map2GIS from "../components/Map2GIS.jsx";
import Forms from "../components/Forms.jsx";

function Page2() {
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true); // По умолчанию музыка включена
    const audioRef = useRef(new Audio(music));
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem("isPlaying", isPlaying);
        const audio = audioRef.current;
        audio.loop = true;
        if (isPlaying) {
            audio.play().catch((error) => console.log("Ошибка воспроизведения:", error));
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    // Новый useEffect для автозапуска при монтировании
    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.play().catch((error) => console.log("Ошибка воспроизведения:", error));

        return () => {
            audio.pause();
            audio.currentTime = 0; // сбросить на начало
        };
    }, []); // Пустой массив зависимостей — выполняется один раз при монтировании

    const toggleMusic = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        const targetDate = new Date("2025-11-17T12:00:00+06:00").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
    }

    // Анимации при скролле
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <>
            <header className="header">
                <motion.div
                    className="weding_day"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={variants}
                >
                    <h1>Той куну</h1>
                    <p>17.11.2025</p>
                </motion.div>
                <div className="background"></div>
                <img
                    src="/img/5.jpeg"
                    loading="lazy"
                    alt="Wedding Hands"
                    className={`wedding-image ${isVisible ? "fade-in" : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.div
                    className="text_i_and_j"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={variants}
                >
                    <h1>Тилебалды  & Жаркынай</h1>
                    <p>
                        Үйлөнүү тоюубуздун кечесин <br /> Сиздер менен бөлүшкүбүз келет!
                    </p>
                    <IoIosHeart className="heart" />
                </motion.div>
            </header>
            <motion.div
                className="songs"
                onClick={toggleMusic}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="72"
                    viewBox="0 0 16 42"
                    fill="none"
                >
                    <g clipPath="url(#clip0_6517_136)">
                        <path
                            d="M13.9948 21.7715C13.1848 21.1504 11.8429 20.8916 10.8589 20.8447C10.3421 20.8201 10.28 20.9236 10.024 20.5539C9.78796 20.2088 9.78051 19.3856 9.69354 18.9715C9.47239 17.919 9.25372 16.869 9.03257 15.8166C11.3658 14.387 13.1152 12.0454 13.8159 9.41552C14.5166 6.78559 14.1613 3.89439 12.8443 1.50601C12.4244 0.746854 11.7535 -0.0468078 10.8813 2.3232e-05C10.2278 0.0369951 9.70596 0.539812 9.3059 1.05495C8.04359 2.68664 7.38262 4.72256 7.18135 6.7708C6.98256 8.81904 7.22111 10.8845 7.62117 12.9032C7.65844 13.0954 7.6982 13.3 7.63359 13.4849C7.56402 13.6845 7.38511 13.8275 7.21614 13.9581C4.75613 15.8412 2.10975 17.7391 0.810173 20.5366C0.0373819 22.1979 -0.19371 24.1007 0.15914 25.8951C0.521929 27.7437 1.54569 29.5134 3.15091 30.5215C4.202 31.1821 5.43946 31.4902 6.66698 31.6824C8.2225 31.9289 9.83269 32.0078 11.3609 31.6307C11.5373 32.5525 11.6864 33.4817 11.8007 34.4134C11.8926 35.1479 11.9846 35.8972 12.0169 36.6416C12.0268 36.8807 12.0094 37.1123 12.0094 37.349C11.9622 37.8345 11.7709 38.3152 11.505 38.7243C11.3882 38.9067 11.2515 39.0792 11.1025 39.237C10.6477 39.7127 10.0762 40.0676 9.47239 40.3289C9.04251 40.5162 8.58032 40.6296 8.11068 40.6518C7.87462 40.6641 7.63856 40.6518 7.40499 40.6123C7.38511 40.6099 7.36523 40.605 7.34535 40.6025C8.27717 40.1046 8.91826 39.1384 8.91826 38.0145C8.91826 36.3828 7.58638 35.0616 5.9414 35.0616C4.29643 35.0616 2.96454 36.3828 2.96454 38.0145C2.96454 38.5099 3.09873 38.9683 3.31491 39.3775L3.29752 39.3726C3.33976 39.4539 3.38946 39.5229 3.43667 39.5993C3.45406 39.6289 3.47146 39.6585 3.48885 39.6856C5.04934 42.1307 8.47099 41.9951 8.47099 41.9951C8.88845 42.0148 9.33075 41.9261 9.73081 41.825C10.6254 41.5983 11.4652 41.1521 12.1113 40.4965C12.4194 40.1835 12.6828 39.8261 12.8965 39.4416C13.0729 39.1261 13.227 38.7983 13.309 38.4458C13.4233 37.9578 13.386 37.4574 13.3388 36.9645C13.2295 35.8183 13.0133 34.6845 12.7872 33.5532C12.7325 33.2845 12.6803 33.0183 12.6257 32.7497C12.5288 32.2715 12.4319 31.7933 12.3374 31.3152C12.3325 31.2905 12.3275 31.2659 12.3225 31.2437C12.3225 31.2437 15.1876 30.4155 15.7839 27.9285C15.7839 27.9285 16.917 24.0219 13.9923 21.7715H13.9948ZM8.86111 4.04474C10.029 2.48207 12.5536 3.17467 12.735 5.112C12.735 5.112 13.0903 7.88981 10.6527 10.6405C10.2576 11.1754 9.41275 11.9937 8.43123 12.8712L8.13802 11.4909C8.11814 11.3898 8.10323 11.131 8.08584 11.03C7.82741 9.37362 7.78268 7.00002 7.93923 6.08066C8.14796 4.86059 8.86111 4.04474 8.86111 4.04474ZM4.13243 29.4764C2.91236 28.4511 2.02527 26.9747 1.95072 25.3898C1.86375 23.5708 2.82291 21.8578 3.9734 20.4381C5.14128 18.9962 6.53777 17.7342 8.09826 16.7162C8.36663 17.8648 8.6325 19.0134 8.90087 20.162C8.95802 20.4035 9.01269 20.6673 8.90584 20.8916C8.79154 21.1381 8.52317 21.2662 8.28462 21.3969C6.52535 22.3483 5.44692 24.256 5.41213 26.2254C5.39971 26.9697 5.51152 27.7388 5.91159 28.3673C6.31165 28.9958 7.0422 29.4543 7.78765 29.3754C7.46711 29.4099 6.95523 28.037 6.88317 27.8028C6.68438 27.1521 6.64462 26.4497 6.76886 25.7792C7.03474 24.3595 8.12062 23.3835 9.58421 23.2479C10.111 25.6018 10.7223 28.3969 11.2168 30.8469C11.2168 30.8592 11.2217 30.8715 11.2242 30.8838C8.82632 31.6405 6.05322 31.0909 4.13491 29.4764H4.13243ZM12.1312 30.4402L11.9249 29.368C11.92 29.3384 11.92 29.3088 11.915 29.2793L10.6254 23.2134C11.4454 23.2578 13.7389 23.6546 14.3353 26.7011C14.3353 26.7011 14.8471 28.9933 12.1312 30.4402Z"
                            fill="#929783"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_6517_136">
                            <rect width="16" height="42" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p>Вкл/выкл музыку</p>
            </motion.div>
            <motion.div
                className="calendar"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
            >
                <h2>2025</h2>
                <div className="months">
                     <span>Октябрь</span> | <span>Ноябрь</span> |{" "}
                    <span>Декабрь</span>
                </div>
                <div className="days">
                    <span>1</span> <span>2</span> <span>3</span> <span>4</span>{" "}
                    <span>5</span> <span>6</span> <span>7</span>
                    <span>8</span> <span>9</span> <span>10</span> <span>11</span>{" "}
                    <span>12</span> <span>13</span> <span>14</span>
                    <span>15</span> <span>16</span> <span className="day" >17
                        <IoIosHeart className="highlight" style={{ color: "#97966c" }} /></span> <span>18</span>{" "}
                    <span>19</span> <span>20</span> <span>21</span>
                    <span>22</span> <span>23</span> <span>24</span> <span>25</span>{" "}
                    <span>26</span>
                    <span>27</span>{" "}
                    <span>28</span> <span>29</span> <span>30</span> <span>31</span>
                </div>
            </motion.div>
            <motion.div
                className="wedding-gallery"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    ...variants,
                    visible: {
                        ...variants.visible,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                <motion.div className="photo-frame" variants={variants}>
                    <img src="/img/1.jpeg" alt="Couple holding hands" loading="lazy"/>
                </motion.div>
                <motion.div className="photo-frame" variants={variants}>
                    <img src="/img/4.jpeg" alt="Bride with bouquet" loading="lazy"/>
                </motion.div>
                <motion.div className="photo-frame" variants={variants}>
                    <img src="/img/3.jpeg" alt="Wedding rings" loading="lazy"/>
                </motion.div>
            </motion.div>
            <motion.div
                className="schedule"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
            >
                <h1>Тойдун программасы</h1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="524"
                    height="873"
                    viewBox="0 0 110 633"
                    fill="none"
                >
                    <path
                        d="M55.5 0.5L32 67L16 121L14.2896 128.376C5.99519 164.146 24.2575 200.769 57.818 215.667L66.5354 219.537C123.605 244.871 123.89 325.764 67 351.5V351.5L63.0756 353.92C46.0394 364.426 32.3201 379.533 23.5 397.5V397.5V397.5C11.9967 449.904 22.2763 504.733 51.9811 549.411L67 572"
                        stroke="url(#paint0_linear_5497_82)"
                        strokeDasharray="6 4"
                    />
                    <circle cx="15" cy="124" r="6" fill="#262626" />
                    <circle cx="103" cy="255" r="6" fill="#262626" />
                    <circle cx="23" cy="406" r="6" fill="#262626" />
                    <defs>
                        <linearGradient
                            id="paint0_linear_5497_82"
                            x1="107"
                            y1="0.5"
                            x2="107"
                            y2="493.5"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopOpacity="0" />
                            <stop offset="0.177885" stopOpacity="0" />
                            <stop offset="0.317308" />
                            <stop offset="0.813449" stopColor="#262626" />
                            <stop offset="0.975962" stopColor="#262626" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
                <motion.div
                    className="first"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                   
                </motion.div>
                <motion.div
                    className="second"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1>15:30</h1>
                    <p>Конокторду <br></br>тосуп алуу</p>
                </motion.div>
                <motion.div
                    className="third"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h1>16:00</h1>
                    <p>Банкет</p>
                </motion.div>
                <motion.div
                    className="heart"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <IoIosHeart
                        style={{
                            fontSize: "40px",
                            position: "absolute",
                            top: -340,
                            left: 8,
                            color: "#97966c",
                            zIndex: 999,
                        }}
                    />
                </motion.div>
            </motion.div>
            <motion.div
                className="venue-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
            >
                <h2>Салтанат өтүүчү жай</h2>
                <div className="venue-image">
                    <motion.img
                        src="/img/B.jpeg"
                        loading="lazy"
                        alt="Khan Tengri Venue"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    />
                </div>
                <div className="venue-info">
                    <p>Ресторан</p>
                    <h1>«Ордо»</h1>
                    <p>Нарын шаары</p>
                </div>
            </motion.div>
            <motion.div
                className="map"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
            >
                <Map2GIS />
                <h4 style={{ paddingTop: 60 }}>
                    Урматтуу туугандар, <br />
                    жакындар жана достор!
                </h4>
                <p>
                    Сиздерди балдарыбыздын <br />
                    үйлөнүү тоюна арналган салтанатка келип, <br />
                    ак дасторкондун үстүндө бата берип, <br />
                    кадырлуу коногубуз болуп кетүүгө чакырабыз!
                </p>
                <h4>
                    Той ээлери: <b>Бейшенбек </b>жана <b>Роза</b>
                </h4>
            </motion.div>
            <motion.div
                className="forms"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
            >
                <h1>Коноктун анкетасы</h1>
                <p>
                    Сураныч 2025-жылдын 27-сентябрь айына чейин салтанатка Катышаарыңызды
                    ырастап коюңуз.
                </p>
                <Forms />
            </motion.div>
            <motion.div
                className="sections"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={variants}
            >
                <img src="/img/2.jpeg" alt="" loading="lazy"/>
            </motion.div>
            <motion.div
                className="countdown-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    ...variants,
                    visible: {
                        ...variants.visible,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                <div className="text">Аркылуу көрүшкөнчө</div>
                <div className="time-boxes">
                    <motion.div className="time-box" variants={variants}>
                        {timeLeft.days}
                        <span>Күн</span>
                    </motion.div>
                    <motion.div className="time-box" variants={variants}>
                        {timeLeft.hours}
                        <span>Саат</span>
                    </motion.div>
                    <motion.div className="time-box" variants={variants}>
                        {timeLeft.minutes}
                        <span>Мүнөт</span>
                    </motion.div>
                    <motion.div className="time-box" variants={variants}>
                        {timeLeft.seconds}
                        <span>Секунд</span>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}

export default Page2;
