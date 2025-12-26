
export type Language = 'en' | 'es' | 'ru';

export const translations = {
  en: {
    nav: {
      services: 'Services',
      advisor: 'Style Advisor',
      visualizer: 'Virtual Mirror',
      team: 'The Team',
      location: 'Location',
      book: 'Book Now'
    },
    hero: {
      badge: 'Premium Barbershop',
      title: 'Elevating The Cut in Gaithersburg.',
      subtitle: 'Modern precision, classic atmosphere. Experience the best grooming Maryland has to offer. Our AI Style Advisor ensures you find your signature look.',
      ctaBook: 'Book Your Session',
      ctaAI: 'AI Style Advisor'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Expert grooming services designed for the modern man. We combine old-school techniques with new-school trends.',
      items: [
        { id: '1', name: 'Signature Haircut', price: '$45', duration: '45 mins', description: 'Precision cut tailored to your head shape and hair type. Includes hot towel finish.' },
        { id: '2', name: 'The Executive', price: '$75', duration: '90 mins', description: 'Complete transformation. Signature cut + beard grooming + skin care treatment.' },
        { id: '3', name: 'Beard Sculpting', price: '$30', duration: '30 mins', description: 'Detailed trimming and shaping with straight razor line-up and beard oil.' },
        { id: '4', name: 'Skin Fade', price: '$50', duration: '60 mins', description: 'The sharpest fade in Gaithersburg. Seamless transitions from skin to top.' },
        { id: '5', name: 'Buzz Cut & Lining', price: '$25', duration: '20 mins', description: 'Even all over with razor sharp perimeter detailing.' },
        { id: '6', name: 'Kids Cut', price: '$35', duration: '30 mins', description: 'Gentle and stylish. For our younger gentlemen under 12.' },
      ]
    },
    visualizer: {
      title: 'Virtual Mirror',
      subtitle: 'Wondering how a new look might suit you? Upload a clear photo of your face and select a style to see the magic happen.',
      uploadArea: 'Drop your photo here or click to browse',
      uploadHint: 'For best results, use a well-lit, front-facing portrait.',
      selectStyle: 'Choose a Style to Visualize',
      generate: 'Visualize New Look',
      generateVideo: 'Create Cinematic Video',
      apiKeyRequired: 'Paid API Key Required',
      apiKeyHint: 'Video generation requires a paid Google Cloud Project API key.',
      openKeyDialog: 'Select API Key',
      loading: 'Generating your new style...',
      loadingVideo: 'Crafting cinematic preview...',
      reassuringMessages: [
        'Setting up the virtual studio...',
        'Simulating hair texture and movement...',
        'Applying professional lighting...',
        'Polishing the final frames...',
        'Almost there, style takes time...'
      ],
      reset: 'Try Another Photo',
      styles: {
        buzz: 'Buzz Cut',
        pompadour: 'Pompadour',
        crew: 'Crew Cut',
        undercut: 'Classic Undercut',
        fade: 'High Skin Fade',
        long: 'Long Taper'
      }
    },
    advisor: {
      title: 'AI Style Advisor',
      subtitle: 'Not sure what cut fits you best? Describe your style or upload a photo, and our Gemini-powered AI will suggest the perfect look.',
      placeholder: 'e.g., "I want a professional look that\'s easy to maintain"...',
      upload: 'Upload Photo',
      change: 'Change Photo',
      remove: 'Remove',
      cta: 'Get Personalized Advice',
      loading: 'Consulting the Barber...',
      resultsPlaceholder: 'Your AI consultation results will appear here.',
      verdict: 'The Verdict',
      recommendation: 'Recommendation',
      tips: 'Pro Tips',
      maintenance: 'Maintenance',
      newConsultation: 'Start New Consultation'
    },
    team: {
      title: 'Meet Our Artisans',
      subtitle: 'Our team is composed of passionate professionals who view barbering as an art form.',
      roles: {
        owner: 'Owner & Master Barber',
        senior: 'Senior Barber',
        stylist: 'Barber Stylist',
        apprentice: 'Apprentice Barber'
      }
    },
    location: {
      title: 'Find Us in Gaithersburg',
      subtitle: 'Experience the finest grooming at The G-Burg Cut. Our shop is conveniently located in the heart of Gaithersburg, Maryland.',
      address: 'Our Address',
      directions: 'Get Directions',
      hours: 'Hours of Operation',
      monFri: 'Mon - Fri',
      satSun: 'Sat - Sun',
      explorerTitle: 'AI Neighborhood Explorer',
      explorerDesc: 'Discover the best coffee, food, and parking around our shop.',
      explorerCTA: 'Find Nearby Gems',
      explorerLoading: 'Scanning Area...',
      mapLabel: 'Gaithersburg Studio',
      mapFallback: 'Open directly in Google Maps'
    },
    chatbot: {
      title: 'Concierge',
      welcome: 'Hello! How can I help you today at The G-Burg Cut?',
      placeholder: 'Ask a question...',
      send: 'Send',
      thinking: 'Typing...',
      error: 'Sorry, something went wrong. Try again.'
    }
  },
  es: {
    nav: {
      services: 'Servicios',
      advisor: 'Asesor de Estilo',
      visualizer: 'Espejo Virtual',
      team: 'El Equipo',
      location: 'Ubicación',
      book: 'Reservar Ahora'
    },
    hero: {
      badge: 'Barbería Premium',
      title: 'Elevando el Corte en Gaithersburg.',
      subtitle: 'Precisión moderna, atmósfera clásica. Experimenta el mejor cuidado que Maryland ofrece. Nuestro Asesor de IA te asegura un look único.',
      ctaBook: 'Reserva tu Sesión',
      ctaAI: 'Asesor de Estilo IA'
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Servicios expertos diseñados para el hombre moderno. Combinamos técnicas clásicas con tendencias actuales.',
      items: [
        { id: '1', name: 'Corte de Autor', price: '$45', duration: '45 mins', description: 'Corte de precisión adaptado a tu forma de cabeza. Incluye toalla caliente.' },
        { id: '2', name: 'El Ejecutivo', price: '$75', duration: '90 mins', description: 'Transformación completa. Corte de autor + cuidado de barba + tratamiento facial.' },
        { id: '3', name: 'Esculpido de Barba', price: '$30', duration: '30 mins', description: 'Recorte detallado y perfilado con navaja clásica y aceite premium.' },
        { id: '4', name: 'Skin Fade', price: '$50', duration: '60 mins', description: 'El degradado más nítido de Gaithersburg. Transiciones perfectas.' },
        { id: '5', name: 'Corte Buzz y Perfilado', price: '$25', duration: '20 mins', description: 'Corte uniforme con detallado perimetral ultra preciso.' },
        { id: '6', name: 'Corte Infantil', price: '$35', duration: '30 mins', description: 'Elegante y cómodo. Para jóvenes caballeros menores de 12 años.' },
      ]
    },
    visualizer: {
      title: 'Espejo Virtual',
      subtitle: '¿Te preguntas cómo te quedaría un nuevo look? Sube una foto clara de tu cara y selecciona un estilo para ver la magia.',
      uploadArea: 'Suelta tu foto aquí o haz clic para buscar',
      uploadHint: 'Para mejores resultados, usa un retrato de frente bien iluminado.',
      selectStyle: 'Elige un Estilo para Visualizar',
      generate: 'Visualizar Nuevo Look',
      generateVideo: 'Crear Video Cinemático',
      apiKeyRequired: 'Se Requiere Clave API de Pago',
      apiKeyHint: 'La generación de video requiere una clave API de un proyecto de Google Cloud de pago.',
      openKeyDialog: 'Seleccionar Clave API',
      loading: 'Generando tu nuevo estilo...',
      loadingVideo: 'Creando vista previa cinemática...',
      reassuringMessages: [
        'Configurando el estudio virtual...',
        'Simulando textura y movimiento del cabello...',
        'Aplicando iluminación profesional...',
        'Pulido de fotogramas finales...',
        'Ya casi está, el estilo toma tiempo...'
      ],
      reset: 'Probar con otra foto',
      styles: {
        buzz: 'Corte Rapado (Buzz)',
        pompadour: 'Pompadour',
        crew: 'Corte Militar',
        undercut: 'Undercut Clásico',
        fade: 'Degradado Alto',
        long: 'Taper Largo'
      }
    },
    advisor: {
      title: 'Asesor de Estilo IA',
      subtitle: '¿No estás seguro de qué corte te queda mejor? Describe tu estilo o sube una foto y nuestra IA te sugerirá el look perfecto.',
      placeholder: 'ej., "Quiero un look profesional que sea fácil de mantener"...',
      upload: 'Subir Foto',
      change: 'Cambiar Foto',
      remove: 'Eliminar',
      cta: 'Obtener Asesoría Personalizada',
      loading: 'Consultando al Barbero...',
      resultsPlaceholder: 'Los resultados de tu consulta aparecerán aquí.',
      verdict: 'El Veredicto',
      recommendation: 'Recomendación',
      tips: 'Consejos Pro',
      maintenance: 'Mantenimiento',
      newConsultation: 'Nueva Consulta'
    },
    team: {
      title: 'Conoce a Nuestros Artesanos',
      subtitle: 'Nuestro equipo está formado por profesionales apasionados que ven la barbería como un arte.',
      roles: {
        owner: 'Dueño y Maestro Barbero',
        senior: 'Barbero Senior',
        stylist: 'Barbero Estilista',
        apprentice: 'Aprendiz de Barbero'
      }
    },
    location: {
      title: 'Visítanos en Gaithersburg',
      subtitle: 'Experimenta el mejor cuidado en The G-Burg Cut. Nuestra tienda está convenientemente ubicada en el corazón de Gaithersburg.',
      address: 'Nuestra Dirección',
      directions: 'Cómo llegar',
      hours: 'Horario de Atención',
      monFri: 'Lun - Vie',
      satSun: 'Sáb - Dom',
      explorerTitle: 'Explorador de Vecindario IA',
      explorerDesc: 'Descubre el mejor café, comida y estacionamiento cerca de nosotros.',
      explorerCTA: 'Buscar Joyas Locales',
      explorerLoading: 'Escaneando Área...',
      mapLabel: 'Estudio Gaithersburg',
      mapFallback: 'Abrir directamente en Google Maps'
    },
    chatbot: {
      title: 'Conserje',
      welcome: '¡Hola! ¿En qué puedo ayudarte hoy en The G-Burg Cut?',
      placeholder: 'Escribe tu pregunta...',
      send: 'Enviar',
      thinking: 'Escribiendo...',
      error: 'Lo siento, algo salió mal. Inténtalo de nuevo.'
    }
  },
  ru: {
    nav: {
      services: 'Услуги',
      advisor: 'ИИ-стилист',
      visualizer: 'Виртуальное зеркало',
      team: 'Команда',
      location: 'Адрес',
      book: 'Записаться'
    },
    hero: {
      badge: 'Премиальный Барбершоп',
      title: 'Новый уровень стрижки в Гейтерсберге.',
      subtitle: 'Современная точность, классическая атмосфера. Лучший уход в Мэриленде. Наш ИИ-стилист поможет найти ваш идеальный образ.',
      ctaBook: 'Записаться сейчас',
      ctaAI: 'Совет стилиста'
    },
    services: {
      title: 'Наши Услуги',
      subtitle: 'Экспертный уход для современных мужчин. Мы сочетаем старую школу с новыми трендами.',
      items: [
        { id: '1', name: 'Авторская стрижка', price: '$45', duration: '45 мин', description: 'Стрижка с учетом формы головы и типа волос. Завершается горячим полотенцем.' },
        { id: '2', name: 'Представительский уход', price: '$75', duration: '90 мин', description: 'Полное преображение. Авторская стрижка + уход за бородой + уход за кожей.' },
        { id: '3', name: 'Моделирование бороды', price: '$30', duration: '30 мин', description: 'Детальная стрижка и придание формы опасной бритвой с использованием масла.' },
        { id: '4', name: 'Skin Fade', price: '$50', duration: '60 мин', description: 'Самый четкий фейд в Гейтерсберге. Бесшовные переходы.' },
        { id: '5', name: 'Buzz Cut и контуры', price: '$25', duration: '20 мин', description: 'Ровная стрижка под машинку с ультрачеткими контурами.' },
        { id: '6', name: 'Детская стрижка', price: '$35', duration: '30 мин', description: 'Стильно и бережно. Для юных джентльменов до 12 лет.' },
      ]
    },
    visualizer: {
      title: 'Виртуальное Зеркало',
      subtitle: 'Хотите узнать, как вам подойдет новый образ? Загрузите четкое фото лица и выберите стиль, чтобы увидеть магию.',
      uploadArea: 'Перетащите фото сюда или нажмите для выбора',
      uploadHint: 'Для лучшего результата используйте портрет при хорошем освещении.',
      selectStyle: 'Выберите стиль для визуализации',
      generate: 'Визуализировать образ',
      generateVideo: 'Создать видео',
      apiKeyRequired: 'Требуется платный API-ключ',
      apiKeyHint: 'Генерация видео требует API-ключа платного проекта Google Cloud.',
      openKeyDialog: 'Выбрать API-ключ',
      loading: 'Создаем ваш новый стиль...',
      loadingVideo: 'Создаем видеопревью...',
      reassuringMessages: [
        'Настройка виртуальной студии...',
        'Симуляция текстуры волос...',
        'Настройка освещения...',
        'Финальная обработка...',
        'Почти готово, стиль требует времени...'
      ],
      reset: 'Попробовать другое фото',
      styles: {
        buzz: 'Стрижка под машинку',
        pompadour: 'Помпадур',
        crew: 'Крю-кат',
        undercut: 'Классический андеркат',
        fade: 'Высокий фейд',
        long: 'Удлиненный тейпер'
      }
    },
    advisor: {
      title: 'ИИ-консультант по стилю',
      subtitle: 'Не уверены, какая стрижка вам подходит? Опишите свой стиль или загрузите фото, и наш ИИ предложит идеальный вариант.',
      placeholder: 'напр., "Я хочу деловой образ, за которым легко ухаживать"...',
      upload: 'Загрузить фото',
      change: 'Изменить фото',
      remove: 'Удалить',
      cta: 'Получить совет',
      loading: 'Консультация барбера...',
      resultsPlaceholder: 'Результаты консультации появятся здесь.',
      verdict: 'Вердикт',
      recommendation: 'Рекомендация',
      tips: 'Профессиональные советы',
      maintenance: 'Уход за стрижкой',
      newConsultation: 'Новая консультация'
    },
    team: {
      title: 'Наши мастера',
      subtitle: 'Наша команда — это увлеченные профессионалы, для которых барберинг — это искусство.',
      roles: {
        owner: 'Владелец и шеф-барбер',
        senior: 'Старший барбер',
        stylist: 'Барбер-стилист',
        apprentice: 'Младший барбер'
      }
    },
    location: {
      title: 'Мы в Гейтерсберге',
      subtitle: 'Оцените премиальный сервис в The G-Burg Cut. Наш салон удобно расположен в самом центре Гейтерсберга.',
      address: 'Наш адрес',
      directions: 'Маршрут',
      hours: 'Время работы',
      monFri: 'Пн - Пт',
      satSun: 'Сб - Вс',
      explorerTitle: 'ИИ-гид по району',
      explorerDesc: 'Найдите лучший кофе, еду и парковку рядом с нашим салоном.',
      explorerCTA: 'Найти интересные места',
      explorerLoading: 'Сканирование местности...',
      mapLabel: 'Студия в Гейтерсберге',
      mapFallback: 'Открыть прямо в Google Картах'
    },
    chatbot: {
      title: 'Консьерж',
      welcome: 'Привет! Чем я могу помочь вам сегодня в The G-Burg Cut?',
      placeholder: 'Задайте вопрос...',
      send: 'Отправить',
      thinking: 'Печатает...',
      error: 'Извините, произошла ошибка. Попробуйте еще раз.'
    }
  }
};
