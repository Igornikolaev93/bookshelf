// components/StoreMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import './StoreMap.css';

const StoreMap = ({ stores, center = [55.7558, 37.6173], zoom = 11, onStoreSelect }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isYmapsLoaded, setIsYmapsLoaded] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  
  useEffect(() => {
    const loadYmaps = () => {
      
      if (window.ymaps) {
        window.ymaps.ready(() => {
          setIsYmapsLoaded(true);
        });
        return;
      }

      if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
        
        const checkYmaps = setInterval(() => {
          if (window.ymaps) {
            clearInterval(checkYmaps);
            window.ymaps.ready(() => {
              setIsYmapsLoaded(true);
            });
          }
        }, 100);
        return;
      }

      
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      
      script.onload = () => {
        window.ymaps.ready(() => {
          setIsYmapsLoaded(true);
        });
      };

      script.onerror = () => {
        console.error('Ошибка загрузки Яндекс.Карт');
        setIsYmapsLoaded(false);
      };

      document.head.appendChild(script);
    };

    loadYmaps();

    return () => {
      
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  
  useEffect(() => {
    if (!isYmapsLoaded || !mapRef.current) return;

    const initMap = () => {
      try {
        console.log('Инициализация карты с центром:', center, 'зум:', zoom);
        
        
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
        }

        
        const map = new window.ymaps.Map(mapRef.current, {
          center: center, // Москва
          zoom: zoom,
          controls: ['zoomControl', 'fullscreenControl'],
          behaviors: ['default', 'scrollZoom']
        });

        
        map.events.add('load', () => {
          console.log('Карта загружена, центр:', map.getCenter());
          setIsMapReady(true);
          
          
          map.setCenter(center, zoom, {
            duration: 0 
          });
        });

        
        stores.forEach(store => {
          const placemark = new window.ymaps.Placemark(
            [store.latitude, store.longitude],
            {
              balloonContentHeader: `<div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">${store.name}</div>`,
              balloonContentBody: `
                <div style="font-size: 14px; line-height: 1.4; padding: 5px 0;">
                  <div><strong>Адрес:</strong> ${store.address}</div>
                  <div><strong>Часы работы:</strong> ${store.workingHours}</div>
                  <div><strong>Телефон:</strong> ${store.phone}</div>
                </div>
              `,
              hintContent: store.name
            },
            {
              preset: 'islands#blueBookIcon',
              balloonCloseButton: true,
              hideIconOnBalloonOpen: false
            }
          );

        
          placemark.events.add('click', (e) => {
            e.preventDefault();
            
            
            map.balloon.open(
              [store.latitude, store.longitude],
              {
                contentHeader: `<div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">${store.name}</div>`,
                contentBody: `
                  <div style="font-size: 14px; line-height: 1.4;">
                    <div><strong>Адрес:</strong> ${store.address}</div>
                    <div><strong>Часы работы:</strong> ${store.workingHours}</div>
                    <div><strong>Телефон:</strong> ${store.phone}</div>
                    <button onclick="window.dispatchEvent(new CustomEvent('selectStore', { detail: '${store.id}' }))" 
                            style="margin-top: 10px; padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">
                      Выбрать магазин
                    </button>
                  </div>
                `,
                contentFooter: '<div style="font-size: 12px; color: #666; margin-top: 10px;">Нажмите для закрытия</div>'
              },
              {
                closeButton: true
              }
            );
            
            setSelectedStore(store);
            if (onStoreSelect) {
              onStoreSelect(store);
            }
          });

          map.geoObjects.add(placemark);
        });

        
        if (stores.length > 0) {
          
          const objectCollection = new window.ymaps.GeoObjectCollection();
          stores.forEach(store => {
            const placemark = new window.ymaps.Placemark([store.latitude, store.longitude]);
            objectCollection.add(placemark);
          });
          
          const bounds = objectCollection.getBounds();
          if (bounds) {
            setTimeout(() => {
              map.setBounds(bounds, {
                checkZoomRange: true,
                zoomMargin: 50
              });
            }, 1000); 
          }
        }

        mapInstanceRef.current = map;

      } catch (error) {
        console.error('Ошибка инициализации карты:', error);
        setIsMapReady(false);
      }
    };

    initMap();
  }, [isYmapsLoaded, stores, center, zoom, onStoreSelect]);

  
  useEffect(() => {
    if (isMapReady && mapInstanceRef.current) {
      const timer = setTimeout(() => {
        try {
          mapInstanceRef.current.setCenter(center, zoom, {
            duration: 300
          });
        } catch (error) {
          console.error('Ошибка при установке центра карты:', error);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMapReady, center, zoom]);

  return (
    <div className="store-map-container">
      <div ref={mapRef} className="store-map" />
      
      {!isYmapsLoaded && (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>Загрузка карты...</p>
        </div>
      )}
      
      
      
      {selectedStore && (
        <div className="store-info-sidebar">
          <button 
            className="close-btn"
            onClick={() => {
              setSelectedStore(null);
              
              if (mapInstanceRef.current) {
                mapInstanceRef.current.balloon.close();
              }
            }}
            aria-label="Закрыть"
          >
            ×
          </button>
          <h3>{selectedStore.name}</h3>
          <p><strong>Адрес:</strong> {selectedStore.address}</p>
          <p><strong>Часы работы:</strong> {selectedStore.workingHours}</p>
          <p><strong>Телефон:</strong> {selectedStore.phone}</p>
          <div className="sidebar-buttons">
            <button 
              className="route-btn"
              onClick={() => {
                const url = `https://yandex.ru/maps/?pt=${selectedStore.longitude},${selectedStore.latitude}&z=16&l=map`;
                window.open(url, '_blank');
              }}
            >
              Построить маршрут
            </button>
            <button 
              className="center-btn"
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.setCenter(
                    [selectedStore.latitude, selectedStore.longitude], 
                    16,
                    { duration: 500 }
                  );
                }
              }}
            >
              Центрировать на карте
            </button>
          </div>
        </div>
      )}
      
      {/* Кнопка "Вернуться в Москву" */}
      {isMapReady && (
        <button 
          className="reset-center-btn"
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setCenter(center, zoom, { duration: 500 });
            }
          }}
          title="Вернуться к общему виду"
        >
          📍 Москва
        </button>
      )}
    </div>
  );
};

export default StoreMap;