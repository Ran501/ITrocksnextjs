'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import styles from './PlayerStats.module.css';

// Import ChartSetup directly since we need its exports
import ChartSetup, { ChartJS } from './ChartSetup';

// Only dynamically import the Radar component
const Radar = dynamic(() => import('react-chartjs-2').then(mod => mod.Radar), { ssr: false });

interface PlayerStatsProps {
  currentPlayer: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const players = [
  {
    id: 1,
    name: "JIGME",
    surname: "TSHERAB",
    position: "GOALKEEPER",
    number: "1",
    image: "/img/playercrop/sticker2.jpg",
    stats: {
      minutes: "720",
      appearances: "8",
      cleanSheets: "4",
      saves: "21",
      radarStats: {
        handling: 85,
        reflexes: 88,
        positioning: 82,
        aerialAbility: 78,
        distribution: 75,
        communication: 80
      }
    },
    social: {
      facebook: "https://www.facebook.com/jigumee.baka",
    }
  },
  {
    id: 2,
    name: "KARMA",
    surname: "TITUNG",
    position: "DEFENDER",
    number: "6",
    image: "/img/playercrop/karmatitung.jpg",
    stats: {
      minutes: "810",
      appearances: "9",
      tackles: "27",
      interceptions: "18",
      radarStats: {
        tackling: 85,
        marking: 82,
        heading: 78,
        positioning: 84,
        passing: 75,
        strength: 80
      }
    },
    social: {
      facebook: "https://www.facebook.com/karma.wangchuk.tmg",
    }
  },

  {
    id: 3,
    name: "PASANG",
    surname: "GYELTSHEN",
    position: "MIDFIELDER",
    number: "4",
    image: "/img/playercrop/passanggyeltshen.jpg",
    stats: {
      minutes: "810",
      appearances: "6",
      goals: "3",
      assists: "1",
      radarStats: {
        tackling: 82,
        marking: 78,
        heading: 78,
        positioning: 74,
        passing: 75,
        strength: 80
      }
    },
    social: {
      facebook: "https://www.facebook.com/pasang.gyaltshen",
    }
  },

  {
    id: 4,
    name: "LAXUMAN ",
    surname: "GHALLEY",
    position: "FORWARD",
    number: "11",
    image: "/img/playercrop/laxumanghalley.jpg",
    stats: {
      minutes: "845",
      appearances: "12",
      goals: "14",
      assists: "3",
      radarStats: {
        finishing: 76,
        dribbling: 91,
        pace: 93,
        shooting: 80,
        heading: 70,
        positioning: 80
        }
    },
    social: {
      facebook: "https://www.facebook.com/laxman.bro.319",
    }
  },

  {
    id: 5,
    name: "KARMA",
    surname: "SONAM",
    position: "DEFENDER",
    number: "6",
    image: "/img/playercrop/karmasonam.jpg",
    stats: {
      minutes: "810",
      appearances: "8",
      tackles: "32",
      interceptions: "11",
      radarStats: {
        tackling: 70,
        marking: 79,
        heading: 81,
        positioning: 78,
        passing: 81,
        strength: 90
      }
    },
    social: {
      facebook: "https://www.facebook.com/karma.sonam.266836",
    }
  },


  {
    id: 6,
    name: "CHIMI",
    surname: "GYELTSHEN",
    position: "MIDFIELDER",
    number: "8",
    image: "/img/playercrop/chimi.jpg",
    stats: {
      minutes: "880",
      appearances: "14",
      goals: "1",
      assists: "6",
      radarStats: {
      tackling: 84,
      marking: 83,
      heading: 75,
      positioning: 82,
      passing: 80,
      strength: 78
      }
    },
    social: {
      facebook: "https://www.facebook.com/chimi.gyeltshen.501289",
    }
  },

  {
    id: 7,
    name: "CHONEY",
    surname: "RANGDEL",
    position: "MIDFIELDER",
    number: "14",
    image: "/img/playercrop/choneyrangdel.jpg",
    stats: {
      "minutes": "850",
      "appearances": "13",
      "goals": "4",
      "assists": "4",
      "radarStats": {
        finishing: 86,
        dribbling: 83,
        pace: 88,
        shooting: 84,
        heading: 79,
        positioning: 82
        
      }
    },
    social: {
      facebook: "https://www.facebook.com/choney.rangdel.16",
    }
  },

  {
    id: 8,
    name: "DAMBER",
    surname: "KHATIVARA",
    position: "FORWARD",
    number: "17",
    image: "/img/playercrop/sticker7.jpg",
    stats: {
      minutes: "820",
      appearances: "13",
      goals: "7",
      assists: "2",
      radarStats: {
        finishing: 78,
        dribbling: 78,
        pace: 89,
        shooting: 72,
        heading: 78,
        positioning: 83 
      }
    },
    social: {
      facebook: "https://www.facebook.com/damber.sarma.5",
    }
  },

  {
    id: 9,
    name: "GYELTSHEN ",
    surname: "LEPCHA",
    position: "DEFENDER",
    number: "4",
    image: "/img/playercrop/sticker8.jpg",
    stats: {
      minutes: "880",
      appearances: "14",
      tackles: "18",
      interceptions: "27",
      radarStats: {
        tackling: 78,
        marking: 76,
        heading: 72,
        positioning: 84,
        passing: 86,
        strength: 75
      }
    },
    social: {
      facebook: "https://www.facebook.com/gyeltshen.lepcha.37",
    }
  },

  {
    id: 10,
    name: "SHERAB",
    surname: "DORJI",
    position: "FORWARD",
    number: "10",
    image: "/img/playercrop/sticker33.jpg",
    stats: {
      minutes: "820",
      appearances: "13",
      goals: "7",
      assists: "2",
      radarStats: {
        finishing: 85,
        dribbling: 82,
        pace: 84,
        shooting: 86,
        heading: 78,
        positioning: 83
      }
    },
    social: {
      facebook: "https://www.facebook.com/sherab.dorji.3994",
    }
  },

  {
    id: 11,
    name: "JIGME",
    surname: "TSHEWANG",
    position: "FORWARD",
    number: "19",
    image: "/img/playercrop/sticker45.jpg",
    stats: {
      minutes: "860",
    appearances: "14",
    goals: "5",
    assists: "6",
    radarStats: {
      tackling: 75,
      marking: 74,
      heading: 70,
      positioning: 82,
      passing: 83,
      strength: 76
      }
    },
    social: {
      facebook: "https://www.facebook.com/jigme.yoezer.77",
    }
  },

  {
    id: 12,
    name: "TASHI",
    surname: "RIGYEL",
    position: "GOALKEEPER",
    number: "99",
    image: "/img/playercrop/tashirigyel.jpg",
    stats: {
      minutes: "950",
      appearances: "15",
      cleanSheets: "7",
      saves: "42",
      radarStats: {
        handling: 85,
        reflexes: 86,
        positioning: 84,
        aerialAbility: 80,
        distribution: 78,
        communication: 82
      }
    },
    social: {
      facebook: "https://www.facebook.com/tashi.rigyel.7",
    }
  },

  {
    id: 13,
    name: "KINLEY",
    surname: "TENZIN",
    position: "FORWARD",
    number: "21",
    image: "/img/playercrop/sticker13.jpg",
    stats: {
      minutes: "780",
      appearances: "12",
      goals: "9",
      assists: "2",
      radarStats: {
        finishing: 86,
        dribbling: 82,
        pace: 85,
        shooting: 85,
        heading: 78,
        positioning: 84
        }
    },
    social: {
      facebook: "https://www.facebook.com/search/top?q=smiley%20kt",
    }
  },

  {
    id: 14,
    name: "SONAM",
    surname: "CHOEJUR",
    position: "DEFENDER",
    number: "3",
    image: "/img/playercrop/sticker4.jpg",
    stats: {
      minutes: "675",
      appearances: "11",
      tackles: "12",
      interceptions: "34",
      radarStats: {
        tackling: 78,
        marking: 76,
        heading: 72,
        positioning: 84,
        passing: 86,
        strength: 75
      }
    },
    social: {
      facebook: "https://www.facebook.com/sonam.choenjur",
    }
  },

];

const PlayerStats: React.FC<PlayerStatsProps> = ({ currentPlayer, onPrevious, onNext }) => {
  const [player, setPlayer] = useState(players[currentPlayer]);
  const [highlightedStat, setHighlightedStat] = useState<string | null>(null);
  const [transitionClass, setTransitionClass] = useState('');

  useEffect(() => {
    setPlayer(players[currentPlayer]);
  }, [currentPlayer]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    setTransitionClass(direction === 'prev' ? styles.transitionLeft : styles.transitionRight);
    if (direction === 'prev') {
      onPrevious();
    } else {
      onNext();
    }
    setTimeout(() => setTransitionClass(''), 300);
  };

  return (
    <section className={styles.playerStats}>
      <ChartSetup />
      <div className={styles.navigation}>
        <button 
          className={styles.navButton} 
          onClick={() => handleNavigation('prev')}
          aria-label="Previous player"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button 
          className={styles.navButton} 
          onClick={() => handleNavigation('next')}
          aria-label="Next player"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className={`${styles.content} ${transitionClass}`}>
        <div className={styles.playerInfo}>
          <div className={styles.category}>MEN</div>
          <div className={styles.number}>{player.number}</div>
          <div className={styles.name}>
            <h1>{player.name}</h1>
            <h2>{player.surname}</h2>
          </div>
          <div className={styles.position}>{player.position}</div>
          <div className={styles.social}>
            {Object.entries(player.social).map(([platform, url]) => (
              <Link 
                key={platform} 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${platform} profile`}
              >
                <FontAwesomeIcon 
                  icon={
                    platform === 'instagram' 
                      ? faInstagram 
                      : platform === 'facebook' 
                        ? faFacebookF 
                        : faXTwitter
                  } 
                />
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.playerImage}>
          <Image
            src={player.image}
            alt={`${player.name} ${player.surname}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.mainStats}>
            <div 
              className={`${styles.stat} ${highlightedStat === 'minutes' ? styles.highlighted : ''}`}
              onMouseEnter={() => setHighlightedStat('minutes')}
              onMouseLeave={() => setHighlightedStat(null)}
            >
              <span className={styles.value}>{player.stats.minutes}</span>
              <span className={styles.label}>MINUTES PLAYED</span>
            </div>
            <div 
              className={`${styles.stat} ${highlightedStat === 'appearances' ? styles.highlighted : ''}`}
              onMouseEnter={() => setHighlightedStat('appearances')}
              onMouseLeave={() => setHighlightedStat(null)}
            >
              <span className={styles.value}>{player.stats.appearances}</span>
              <span className={styles.label}>APPEARANCES</span>
            </div>
            {player.position === 'GOALKEEPER' && player.stats.cleanSheets !== undefined && (
              <div 
                className={`${styles.stat} ${highlightedStat === 'cleanSheets' ? styles.highlighted : ''}`}
                onMouseEnter={() => setHighlightedStat('cleanSheets')}
                onMouseLeave={() => setHighlightedStat(null)}
              >
                <span className={styles.value}>{player.stats.cleanSheets}</span>
                <span className={styles.label}>CLEAN SHEETS</span>
              </div>
            )}
            {player.position === 'GOALKEEPER' && player.stats.saves !== undefined && (
              <div 
                className={`${styles.stat} ${highlightedStat === 'saves' ? styles.highlighted : ''}`}
                onMouseEnter={() => setHighlightedStat('saves')}
                onMouseLeave={() => setHighlightedStat(null)}
              >
                <span className={styles.value}>{player.stats.saves}</span>
                <span className={styles.label}>SAVES</span>
              </div>
            )}
            {player.position === 'DEFENDER' && player.stats.tackles !== undefined && (
              <div 
                className={`${styles.stat} ${highlightedStat === 'tackles' ? styles.highlighted : ''}`}
                onMouseEnter={() => setHighlightedStat('tackles')}
                onMouseLeave={() => setHighlightedStat(null)}
              >
                <span className={styles.value}>{player.stats.tackles}</span>
                <span className={styles.label}>TACKLES</span>
              </div>
            )}
            {player.position === 'DEFENDER' && player.stats.interceptions !== undefined && (
              <div 
                className={`${styles.stat} ${highlightedStat === 'interceptions' ? styles.highlighted : ''}`}
                onMouseEnter={() => setHighlightedStat('interceptions')}
                onMouseLeave={() => setHighlightedStat(null)}
              >
                <span className={styles.value}>{player.stats.interceptions}</span>
                <span className={styles.label}>INTERCEPTIONS</span>
              </div>
            )}
            {player.stats.goals !== undefined && (
              <div 
                className={`${styles.stat} ${highlightedStat === 'goals' ? styles.highlighted : ''}`}
                onMouseEnter={() => setHighlightedStat('goals')}
                onMouseLeave={() => setHighlightedStat(null)}
              >
                <span className={styles.value}>{player.stats.goals}</span>
                <span className={styles.label}>GOALS</span>
              </div>
            )}
            {player.stats.assists !== undefined && (
              <div 
                className={`${styles.stat} ${highlightedStat === 'assists' ? styles.highlighted : ''}`}
                onMouseEnter={() => setHighlightedStat('assists')}
                onMouseLeave={() => setHighlightedStat(null)}
              >
                <span className={styles.value}>{player.stats.assists}</span>
                <span className={styles.label}>ASSISTS</span>
              </div>
            )}
          </div>

          <div className={styles.radarChart}>
            <div style={{ 
              width: '100%', 
              height: '300px',
              position: 'relative',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '20px',
              borderRadius: '10px'
            }}>
              <Radar
                data={{
                  labels: Object.keys(player.stats.radarStats),
                  datasets: [{
                    label: 'Player Attributes',
                    data: Object.values(player.stats.radarStats),
                    backgroundColor: 'rgba(227, 24, 55, 0.2)',
                    borderColor: 'rgba(227, 24, 55, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: 'rgba(227, 24, 55, 1)',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(227, 24, 55, 1)',
                    pointRadius: 4,
                    pointHoverRadius: 6
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      min: 0,
                      max: 100,
                      beginAtZero: true,
                      angleLines: {
                        color: 'rgba(255, 255, 255, 0.2)'
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                      },
                      pointLabels: {
                        color: '#fff',
                        font: {
                          size: 12
                        }
                      },
                      ticks: {
                        color: '#fff',
                        backdropColor: 'transparent'
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerStats; 