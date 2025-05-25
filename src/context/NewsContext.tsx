'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

interface NewsContextType {
  articles: NewsArticle[];
  addArticle: (article: Omit<NewsArticle, 'id'>) => void;
  updateArticle: (id: number, article: Partial<NewsArticle>) => void;
  deleteArticle: (id: number) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const initialArticles: NewsArticle[] = [
  {
    id: 1,
    title: "2IT FC Signs New Partnership Deal",
    date: "March 15, 2024",
    image: "/img/stadium3.jpg",
    excerpt: "Exciting new partnership announcement with leading tech company...",
    content: "2IT FC is proud to announce a groundbreaking partnership with a leading technology company..."
  },
  {
    id: 2,
    title: "Youth Academy Launches New Program",
    date: "March 12, 2024",
    image: "/img/stadium4.jpg",
    excerpt: "Our youth development program expands with new training initiatives...",
    content: "The 2IT FC Youth Academy is expanding its program with new training initiatives..."
  },
  {
    id: 3,
    title: "Fan Zone Updates for 2024/25 Season",
    date: "March 10, 2024",
    image: "/img/stadium5.jpg",
    excerpt: "New features and facilities coming to the stadium fan zone...",
    content: "Get ready for an enhanced matchday experience as we announce major updates..."
  },

  {
    id: 4,
    title: "New Stadium Expansion Plans Revealed",
    date: "March 8, 2024",
    image: "/img/stadium6.jpg",
    excerpt: "Ambitious stadium expansion project to increase capacity and enhance facilities...",
    content: "2IT FC has unveiled plans for a major stadium expansion that will increase capacity by 15,000 seats and add state-of-the-art facilities. The project includes new hospitality suites, improved accessibility features, and enhanced training facilities. The expansion is expected to be completed by the start of the 2025/26 season."
  },
  {
    id: 5,
    title: "Women's Team Secures Historic Victory",
    date: "March 5, 2024",
    image: "/img/stadium8.jpg",
    excerpt: "Women's team makes history with record-breaking performance...",
    content: "The 2IT FC Women's team has made history by securing their first major trophy in a thrilling final match. The team's outstanding performance throughout the season culminated in a dramatic penalty shootout victory. This achievement marks a significant milestone in the club's commitment to women's football development."
  },
  {
    id: 6,
    title: "Community Outreach Program Success",
    date: "March 3, 2024",
    image: "/img/stadium9.jpg",
    excerpt: "Local community initiative exceeds expectations in first year...",
    content: "Our community outreach program has exceeded all expectations in its first year, reaching over 10,000 young people across the region. The initiative focuses on using football as a tool for social development, providing opportunities for underprivileged youth and promoting physical activity in schools."
  },
  {
    id: 7,
    title: "New Technical Director Appointed",
    date: "March 1, 2024",
    image: "/img/stadium10.jpg",
    excerpt: "Experienced football professional joins club's technical team...",
    content: "2IT FC has appointed a new Technical Director with extensive experience in top European leagues. The appointment signals the club's commitment to developing a world-class football philosophy and implementing innovative training methodologies across all age groups."
  },
  {
    id: 8,
    title: "Sustainability Initiative Launched",
    date: "February 28, 2024",
    image: "/img/stadium12.jpg",
    excerpt: "Club announces ambitious environmental sustainability program...",
    content: "2IT FC has launched a comprehensive sustainability initiative aimed at reducing the club's environmental impact. The program includes solar panel installation, waste reduction measures, and a commitment to carbon neutrality by 2030. This initiative reflects the club's dedication to environmental responsibility."
  },
  {
    id: 9,
    title: "International Youth Tournament Success",
    date: "February 25, 2024",
    image: "/img/stadium11.jpg",
    excerpt: "Youth teams excel in prestigious international tournament...",
    content: "Our youth teams have achieved remarkable success in a prestigious international tournament, with both U16 and U18 teams reaching the finals. The tournament provided valuable experience against top international opposition and showcased the quality of our youth development program."
  }
];

export function NewsProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);

  const addArticle = (article: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = {
      id: Math.max(...articles.map(a => a.id)) + 1,
      ...article
    };
    setArticles([...articles, newArticle]);
  };

  const updateArticle = (id: number, updatedArticle: Partial<NewsArticle>) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, ...updatedArticle } : article
    ));
  };

  const deleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <NewsContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
} 