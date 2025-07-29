import { useEffect, useRef } from "react";

export default function YandexMap() {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!window.ymaps || !mapRef.current) return;

        window.ymaps.ready(() => {
            const map = new window.ymaps.Map(mapRef.current, {
                center: [41.42602, 76.039950],
                zoom: 15,
                controls: ['zoomControl', 'typeSelector'],
            });

            const placemark = new window.ymaps.Placemark(
                [41.42602, 76.039950],
                {
                    balloonContent: "Нарын шаары, Ресторан Ордо",
                },
                {
                    iconLayout: "default#image",
                    iconImageHref: "/heart-icon.svg", // или PNG
                    iconImageSize: [32, 32],
                    iconImageOffset: [-16, -16],
                }
            );

            map.geoObjects.add(placemark);

            map.behaviors.disable("scrollZoom");
            map.behaviors.disable('drag');
        });
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
}
