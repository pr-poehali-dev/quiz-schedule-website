import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  date: string;
}

const Index = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  const weeks = [
    { value: 'current', label: 'Текущая неделя (15-21 авг)' },
    { value: 'next', label: 'Следующая неделя (22-28 авг)' },
    { value: 'future', label: 'Через неделю (29 авг - 4 сен)' },
  ];

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
      description: "Окунитесь в мир классического кинематографа! Вопросы о легендарных фильмах и режиссёрах.",
      date: "Чт, 15 авг"
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
      description: "Вспомните золотые хиты девяностых! Угадывайте песни и исполнителей легендарного десятилетия.",
      date: "Пт, 16 авг"
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
      description: "Проверьте свои знания о Вселенной! От квантовой физики до далёких галактик.",
      date: "Сб, 17 авг"
    },
    {
      id: 4,
      title: "История Липецка",
      venue: "Библиотека им. Пушкина",
      address: "ул. Ленина, 25",
      time: "17:00",
      price: "300₽",
      difficulty: "Средний",
      category: "История",
      website: "https://pushkin-lib.ru",
      description: "Узнайте больше об истории нашего родного города и его знаменитых жителях.",
      date: "Вс, 18 авг"
    },
    {
      id: 5,
      title: "IT-квиз для программистов",
      venue: "Коворкинг «TechSpace»",
      address: "ул. Гагарина, 33",
      time: "19:30",
      price: "450₽",
      difficulty: "Сложный",
      category: "IT",
      website: "https://techspace-lipetsk.ru",
      description: "Проверьте свои знания в области программирования, алгоритмов и современных технологий.",
      date: "Пн, 19 авг"
    },
    {
      id: 6,
      title: "Спортивный квиз",
      venue: "Спорт-бар «Чемпион»",
      address: "ул. Спортивная, 12",
      time: "21:00",
      price: "350₽",
      difficulty: "Легкий",
      category: "Спорт",
      website: "https://champion-bar.ru",
      description: "Вопросы о спорте, олимпийских играх и знаменитых спортсменах.",
      date: "Вт, 20 авг"
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

  const CompactQuizCard = ({ quiz }: { quiz: Quiz }) => (
    <Card 
      className="border-0 shadow-md bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={() => setSelectedQuiz(quiz)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-lipetsk-red mb-1 truncate">{quiz.title}</h3>
            <div className="flex items-center text-sm text-quiz-navy/70 mb-2">
              <Icon name="MapPin" size={14} className="mr-1 text-lipetsk-gold flex-shrink-0" />
              <span className="truncate">{quiz.venue}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getDifficultyColor(quiz.difficulty)} variant="outline">
                {quiz.difficulty}
              </Badge>
              <Badge className="bg-lipetsk-blue/10 text-lipetsk-blue border-lipetsk-blue/20">
                {quiz.category}
              </Badge>
            </div>
          </div>
          <div className="text-right ml-4 flex-shrink-0">
            <div className="text-sm text-quiz-navy/70 mb-1">{quiz.date}</div>
            <div className="text-lg font-bold text-lipetsk-red">{quiz.time}</div>
            <div className="text-sm font-bold text-lipetsk-gold">{quiz.price}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FullQuizCard = ({ quiz }: { quiz: Quiz }) => (
    <Card 
      className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
        selectedQuiz?.id === quiz.id ? 'ring-2 ring-lipetsk-red' : ''
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
        <div className="absolute top-4 right-4 bg-lipetsk-red text-white px-2 py-1 rounded text-sm font-bold">
          {quiz.date}
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-lipetsk-red mb-2">{quiz.title}</h3>
            <div className="flex items-center text-quiz-navy/70 mb-2">
              <Icon name="MapPin" size={16} className="mr-2 text-lipetsk-gold" />
              <span className="font-medium">{quiz.venue}</span>
            </div>
            <div className="flex items-center text-quiz-navy/70 mb-3">
              <Icon name="Navigation" size={16} className="mr-2 text-lipetsk-gold" />
              <span>{quiz.address}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-quiz-navy mb-2">
              <Icon name="Clock" size={16} className="mr-2 text-lipetsk-red" />
              <span className="font-bold text-lg">{quiz.time}</span>
            </div>
            <div className="text-lipetsk-gold font-bold text-lg">{quiz.price}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={getDifficultyColor(quiz.difficulty)}>
            {quiz.difficulty}
          </Badge>
          <Badge className="bg-lipetsk-blue/10 text-lipetsk-blue border-lipetsk-blue/20">
            {quiz.category}
          </Badge>
        </div>

        <p className="text-quiz-navy/70 mb-4">{quiz.description}</p>

        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            className="border-lipetsk-gold text-lipetsk-gold hover:bg-lipetsk-gold hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              const encodedAddress = encodeURIComponent(`${quiz.venue}, ${quiz.address}, Липецк`);
              window.open(`https://yandex.ru/maps/?text=${encodedAddress}`, '_blank');
            }}
          >
            <Icon name="MapPin" size={16} className="mr-2" />
            Показать на карте
          </Button>
          
          {quiz.website && (
            <Button 
              className="bg-lipetsk-blue hover:bg-lipetsk-blue/80 text-white"
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
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-quiz-skyblue/20 to-quiz-turquoise/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-quiz-turquoise/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-lipetsk-red border-2 border-lipetsk-gold rounded-lg flex items-center justify-center relative">
                <Icon name="Brain" className="text-lipetsk-white" size={24} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-lipetsk-gold rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-lipetsk-green rounded-full"></div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-lipetsk-red">
                Липецк Quiz
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-quiz-navy hover:text-lipetsk-red">
                <Icon name="Calendar" size={18} className="mr-2" />
                Расписание
              </Button>
              <Button variant="ghost" className="text-quiz-navy hover:text-lipetsk-red">
                <Icon name="MapPin" size={18} className="mr-2" />
                Заведения
              </Button>
              <Button variant="ghost" className="text-quiz-navy hover:text-lipetsk-red">
                <Icon name="Trophy" size={18} className="mr-2" />
                Рейтинг
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-quiz-navy mb-2 block">Выберите неделю:</label>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-64 border-lipetsk-gold/30 focus:ring-lipetsk-gold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {weeks.map((week) => (
                    <SelectItem key={week.value} value={week.value}>
                      {week.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-quiz-navy">Вид:</span>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-lipetsk-red hover:bg-lipetsk-red/80' : 'border-lipetsk-red text-lipetsk-red hover:bg-lipetsk-red hover:text-white'}
            >
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Полный
            </Button>
            <Button
              variant={viewMode === 'compact' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('compact')}
              className={viewMode === 'compact' ? 'bg-lipetsk-red hover:bg-lipetsk-red/80' : 'border-lipetsk-red text-lipetsk-red hover:bg-lipetsk-red hover:text-white'}
            >
              <Icon name="List" size={16} className="mr-2" />
              Компактный
            </Button>
          </div>
        </div>

        {/* Quiz List */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-quiz-navy mb-2">Квизы на выбранную неделю</h2>
          <p className="text-quiz-navy/70">Найдено {quizzes.length} мероприятий</p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {quizzes.map((quiz) => (
              <FullQuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <CompactQuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}

        {/* Weekly Stats */}
        <Card className="mt-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-quiz-navy flex items-center">
              <Icon name="BarChart3" size={20} className="mr-2 text-lipetsk-red" />
              Статистика недели
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-lipetsk-red/10 rounded-lg">
                <div className="text-2xl font-bold text-lipetsk-red mb-1">{quizzes.length}</div>
                <div className="text-quiz-navy/70 text-sm">Всего квизов</div>
              </div>
              <div className="text-center p-4 bg-lipetsk-gold/10 rounded-lg">
                <div className="text-2xl font-bold text-lipetsk-gold mb-1">12</div>
                <div className="text-quiz-navy/70 text-sm">Заведений</div>
              </div>
              <div className="text-center p-4 bg-lipetsk-blue/10 rounded-lg">
                <div className="text-2xl font-bold text-lipetsk-blue mb-1">6</div>
                <div className="text-quiz-navy/70 text-sm">Категорий</div>
              </div>
              <div className="text-center p-4 bg-lipetsk-green/10 rounded-lg">
                <div className="text-2xl font-bold text-lipetsk-green mb-1">450₽</div>
                <div className="text-quiz-navy/70 text-sm">Средняя цена</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;