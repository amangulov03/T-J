import "./page1.css";
import { useNavigate } from 'react-router-dom';
import React, { useState , useEffect} from 'react'; // Убрали useEffect, так как он не нужен

function Page1() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Устанавливаем видимость при монтировании
        setIsVisible(true);
    }, []);

    const handleCircleClick = () => {
        // Сначала скрываем элементы
        setIsVisible(false);
        // Задержка перед навигацией, чтобы анимация завершилась
        setTimeout(() => {
            navigate('/page2');
        }, 500); // Задержка соответствует длительности анимации (0.5s)
    };

    return (
        <>
            <header className="header">
                <div className="background"></div>
                <img src="/img/4.jpeg" loading="lazy" alt="Wedding Hands" className={`wedding-image ${isVisible ? 'fade-in' : 'fade-out'}`} />
            </header>
            <main className="main">
                <div className={`circle ${isVisible ? 'fade-in' : 'fade-out'}`} onClick={handleCircleClick}>
                    <div className="circle2">
                        <p>Чакырууну ачуу</p>
                    </div>
                </div>
                <div className={`text1 ${isVisible ? 'fade-in' : 'fade-out'}`}>
                    <p>
                        Үйлөнүү тоюбузга – <br />
                        <span>чакырабыз</span>
                    </p>
                </div>
            </main>
        </>
    );
}

export default Page1;
