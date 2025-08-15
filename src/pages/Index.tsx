import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Quiz {
  id: number;
  title: string;
  venue: string;
  address: string;
  time: string;
  price: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  category: string;
  website?: string;
  description: string;
}

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const quizzes: Quiz[] = [
    {
      id: 1,
      title: "Киноквиз: Классика мирового кино",
      venue: "Кафе «Артхаус»",
      address: "ул. Пушкина, 15",
      time: "19:00",
      price: "500₽",
      difficulty: "Средний",
      category: "Кино",
      website: "https://arthaus-cafe.ru",
      description: "Окунитесь в мир классического кинематографа! Вопросы о легендарных фильмах и режиссёрах."
    },
    {
      id: 2,
      title: "Музыкальный квиз: Хиты 90-х",
      venue: "Бар «Ностальгия»",
      address: "пр. Мира, 42",
      time: "20:30",
      price: "400₽",
      difficulty: "Легкий",
      category: "Музыка",
      website: "https://nostalgia-bar.ru",
      description: "Вспомните золотые хиты девяностых! Угадывайте песни и исполнителей легендарного десятилетия."
    },
    {
      id: 3,
      title: "Science Quiz: Космос и физика",
      venue: "Научное кафе «Атом»",
      address: "ул. Ломоносова, 8",
      time: "18:00",
      price: "600₽",
      difficulty: "Сложный",
      category: "Наука",
      website: "https://atom-cafe.ru",
      description: "Проверьте свои знания о Вселенной! От квантовой физики до далёких галактик."
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Легкий': return 'bg-green-100 text-green-800 border-green-200';
      case 'Средний': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Сложный': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-skyblue/20 to-quiz-turquoise/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-quiz-turquoise/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-quiz-orange to-quiz-turquoise rounded-full flex items-center justify-center">
                <Icon name="Brain" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-quiz-orange to-quiz-turquoise bg-clip-text text-transparent">
                Quiz Schedule
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-quiz-navy hover:text-quiz-orange">
                <Icon name="Calendar" size={18} className="mr-2" />
                Расписание
              </Button>
              <Button variant="ghost" className="text-quiz-navy hover:text-quiz-orange">
                <Icon name="MapPin" size={18} className="mr-2" />
                Заведения
              </Button>
              <Button variant="ghost" className="text-quiz-navy hover:text-quiz-orange">
                <Icon name="Trophy" size={18} className="mr-2" />
                Рейтинг
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-quiz-navy flex items-center">
                  <Icon name="Calendar" size={20} className="mr-2 text-quiz-orange" />
                  Календарь квизов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-quiz-orange rounded-full mr-2"></div>
                    <span className="text-quiz-navy">Сегодня: 3 квиза</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-3 h-3 bg-quiz-turquoise rounded-full mr-2"></div>
                    <span className="text-quiz-navy">Завтра: 2 квиза</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quiz List Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-quiz-navy mb-2">Квизы сегодня</h2>
              <p className="text-quiz-navy/70">
                {new Date().toLocaleDateString('ru-RU', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="space-y-6">
              {quizzes.map((quiz) => (
                <Card 
                  key={quiz.id} 
                  className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                    selectedQuiz?.id === quiz.id ? 'ring-2 ring-quiz-orange' : ''
                  } overflow-hidden`}
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <div className="relative">
                    <img 
                      src="/img/f57be9f6-a45b-462a-8dc1-e83c2cbc9562.jpg" 
                      alt={quiz.venue}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-bold text-lg">{quiz.venue}</h4>
                      <p className="text-sm opacity-90">{quiz.address}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-quiz-navy mb-2">{quiz.title}</h3>
                        <div className="flex items-center text-quiz-navy/70 mb-2">
                          <Icon name="MapPin" size={16} className="mr-2 text-quiz-turquoise" />
                          <span className="font-medium">{quiz.venue}</span>
                        </div>
                        <div className="flex items-center text-quiz-navy/70 mb-3">
                          <Icon name="Navigation" size={16} className="mr-2 text-quiz-turquoise" />
                          <span>{quiz.address}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-quiz-navy mb-2">
                          <Icon name="Clock" size={16} className="mr-2 text-quiz-orange" />
                          <span className="font-bold text-lg">{quiz.time}</span>
                        </div>
                        <div className="text-quiz-orange font-bold text-lg">{quiz.price}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>
                        {quiz.difficulty}
                      </Badge>
                      <Badge className="bg-quiz-turquoise/10 text-quiz-turquoise border-quiz-turquoise/20">
                        {quiz.category}
                      </Badge>
                    </div>

                    <p className="text-quiz-navy/70 mb-4">{quiz.description}</p>

                    <div className="flex justify-between items-center">
                      <Button 
                        variant="outline" 
                        className="border-quiz-turquoise text-quiz-turquoise hover:bg-quiz-turquoise hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Открываем карту с адресом заведения
                          const encodedAddress = encodeURIComponent(`${quiz.venue}, ${quiz.address}, Москва`);
                          window.open(`https://yandex.ru/maps/?text=${encodedAddress}`, '_blank');
                        }}
                      >
                        <Icon name="MapPin" size={16} className="mr-2" />
                        Показать на карте
                      </Button>
                      
                      {quiz.website && (
                        <Button 
                          className="bg-gradient-to-r from-quiz-orange to-quiz-turquoise hover:from-quiz-orange/80 hover:to-quiz-turquoise/80 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(quiz.website, '_blank');
                          }}
                        >
                          <Icon name="ExternalLink" size={16} className="mr-2" />
                          Сайт заведения
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weekly Stats */}
            <Card className="mt-8 border-0 shadow-xl bg-gradient-to-r from-quiz-orange/10 to-quiz-turquoise/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-quiz-navy flex items-center">
                  <Icon name="BarChart3" size={20} className="mr-2 text-quiz-orange" />
                  Статистика недели
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-quiz-orange mb-1">24</div>
                    <div className="text-quiz-navy/70 text-sm">Всего квизов</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-quiz-turquoise mb-1">12</div>
                    <div className="text-quiz-navy/70 text-sm">Заведений</div>
                  </div>
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-2xl font-bold text-quiz-skyblue mb-1">8</div>
                    <div className="text-quiz-navy/70 text-sm">Категорий</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;