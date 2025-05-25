'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image'; 
import Link from 'next/link';
import '../../style/squad.css';
import styles from '../layout.module.css'; // adjust path if needed


function Squadpage() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);
    const [modalPlayer, setModalPlayer] = useState(null);

    // Helper to get player info for modal
    const getPlayerInfo = (className, number, name) => {
        // You can expand this mapping as needed
        const playerMap = {
            tsherab: {
                photo: '/img/tsherab.jpg',
                bio: 'Jigme Tsherab Damchoe is a talented young goalkeeper known for his quick reflexes and leadership.',
                stats: { appearances: 8, save: 21, cleansheet: 4 },
                funFact: 'Loves penalty shootouts.'
            },
            rigyel: {
                photo: '/img/rigyel.jpg',
                bio: 'Tashi Rigyel is the tallest player in the squad and a reliable last line of defense.',
                stats: { appearances: 15, save: 42, cleansheet: 7 },
                funFact: 'Loves long-range shots.'
            },
            lepcha: {
                photo: '/img/lepcha.jpg',
                bio: 'Gyeltshen Lepcha is a versatile defender who can play both fullback positions.',
                stats: { appearances: 14, tackle: 27, interception: 18 },
                funFact: 'Can play both fullback positions.'
            },
            choejur: {
                photo: '/img/choejur.jpg',
                bio: 'Sonam Choejur is known for his love of sliding tackles and strong defensive play.',
                stats: { appearances: 11, tackle: 12, interception: 34 },
                funFact: 'Loves sliding tackles.'
            },
            pasang: {
                photo: '/img/pasang.jpg',
                bio: 'Pasang Gyeltshen once scored a goal from the halfway line.',
                stats: { appearances: 22, goals: 2, assists: 3 },
                funFact: 'Scored a goal from halfway line.'
            },
            titung: {
                photo: '/img/titung.jpg',
                bio: 'Karma Wangchuk Titung has never received a red card in his career.',
                stats: { appearances: 9, tackle: 27, interception: 18 },
                funFact: 'Has never received a red card.'
            },
            sherab: {
                photo: '/img/sherab.jpg',
                bio: 'Sherab Dorji is the team captain and a creative midfielder.',
                stats: { appearances: 13, goals: 7, assists: 2 },
                funFact: 'Team captain.'
            },
            chimi: {
                photo: '/img/chimi.jpg',
                bio: 'Chimi Gyeltshen loves long-range shots and is a key playmaker.',
                stats: { appearances: 20, goals: 3, assists: 5 },
                funFact: 'Tallest player in the squad.'
            },
            jigmet: {
                photo: '/img/jigmet.jpg',
                bio: 'Jigme Tshewang Yoezer is the youngest player in the squad.',
                stats: { appearances: 14, goals: 5, assists: 6 },
                funFact: 'Youngest player in the squad.'
            },
            player: {
                photo: '/img/ran2.jpg',
                bio: 'Choney Rangdel is a fan favorite midfielder.',
                stats: { appearances: 13, goals: 4, assists: 4 },
                funFact: 'Fan favorite.'
            },
            dorji: {
                photo: '/img/dorji.jpg',
                bio: 'Dorji Gyeltshen was the top scorer last season.',
                stats: { appearances: 21, goals: 8, assists: 2 },
                funFact: 'Top scorer last season.'
            },
            damber: {
                photo: '/img/damber.jpg',
                bio: 'Damber Khatiwara is the fastest sprinter in the team.',
                stats: { appearances: 13, goals: 7, assists: 2 },
                funFact: 'Fastest sprint in the team.'
            },
            laxu: {
                photo: '/img/laxu.jpg',
                bio: 'Laxu Man Ghalley is known for his bicycle kicks.',
                stats: { appearances: 14, goals: 14, assists: 3 },
                funFact: 'Known for bicycle kicks.'
            },
            karma: {
                photo: '/img/karma.jpg',
                bio: 'Karma Sonam scored in his debut match.',
                stats: { appearances: 17, goals: 5, assists: 3 },
                funFact: 'Scored in debut match.'
            },
            kt: {
                photo: '/img/kt.jpg',
                bio: 'Kinley Tenzin loves to celebrate with fans.',
                stats: { appearances: 12, goals: 9, assists: 2 },
                funFact: 'Loves to celebrate with fans.'
            },
            vander: {
                photo: '/img/thukten.jpg',
                bio: 'Vander is the manager and has coached in 3 countries.',
                stats: { matches: 25, wins: 18, winRate: "72%"},
                funFact: 'Has coached in 3 countries.'
            },
        };
        return playerMap[className] || { photo: '', bio: '', stats: {}, funFact: '' };
    };

    // Helper to extract name from card
    const getNameFromCard = (children) => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(getNameFromCard).join(' ');
        if (children && children.props && children.props.children) return getNameFromCard(children.props.children);
        return '';
    };

    return (
        <>
            <Head>
                <title>Squad</title>
            </Head>
            <div className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
                {/* Sidebar content */}
            </div>
            
            <button 
                className="toggle-sidebar"
                onClick={() => setIsSidebarActive(!isSidebarActive)}
            >
                {isSidebarActive ? 'Close Menu' : 'Open Menu'}
            </button>
            
            <main>
            <div className={styles.hideOnMobile} style={{ height: '150px' }} />
            <div className={styles.hideOnMobile} style={{ height: '200px', backgroundColor: 'white' }}></div>
                <div className="most">
                <h1>FOOTBALLER</h1>
                </div>
                <div className="most">
                    <h1>GOALKEEPER</h1>
                </div>
                <div className="card-container">
                    <div className="tsherab" onClick={() => { console.log('Clicked tsherab'); setModalPlayer({ className: 'tsherab', number: 1, name: 'JIGME TSHERAB DAMCHOE' }); }} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">1</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                JIGME
                                <br />
                                TSHERAB
                                <br />
                                DAMCHOE
                            </h3>
                        </div>
                    </div>
                    <div className="rigyel" onClick={() => { console.log('Clicked rigyel'); setModalPlayer({ className: 'rigyel', number: 99, name: 'TASHI RIGYEL' }); }} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">99</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                TASHI
                                <br />
                                RIGYEL
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="most">
                    <h1>DEFENDER</h1>
                </div>
                <div className="card-container">
                    <div className="lepcha" onClick={() => setModalPlayer({ className: 'lepcha', number: 4, name: 'GYELTSHEN LEPCHA' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">4</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                GYELT<span>SHEN</span>
                                <br />
                                LEPCH<span>A</span>
                            </h3>
                        </div>
                    </div>
                    <div className="choejur" onClick={() => setModalPlayer({ className: 'choejur', number: 3, name: 'SONAM CHOEJUR' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">3</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                SONAM
                                <br />
                                CHOEJUR
                            </h3>
                        </div>
                    </div>
                    <div className="pasang" onClick={() => setModalPlayer({ className: 'pasang', number: 13, name: 'PASANG GYELTSHEN' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">13</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                PASANG
                                <br />
                                GYELTSHEN
                            </h3>
                        </div>
                    </div>
                    <div className="titung" onClick={() => setModalPlayer({ className: 'titung', number: 6, name: 'KARMA WANGCHUK TITUNG' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">6</h1>
                        </div>
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                KARMA
                                <br />
                                WANGC<span>HUK</span>
                                <br />
                                TITUNG
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="most">
                    <h1>MIDFIELDER</h1>
                </div>
                <div className="card-container">
                    <div className="sherab" onClick={() => setModalPlayer({ className: 'sherab', number: 10, name: 'SHERAB DORJI' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">10</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                SHERAB
                                <br />
                                DORJI
                            </h3>
                        </div>
                    </div>
                    <div className="chimi" onClick={() => setModalPlayer({ className: 'chimi', number: 8, name: 'CHIMI GYELTSHEN' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">8</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                CHIMI
                                <br />
                                GYELT<span>SHEN</span>
                            </h3>
                        </div>
                    </div>
                    <div className="jigmet" onClick={() => setModalPlayer({ className: 'jigmet', number: 19, name: 'JIGME TSHEWANG YOEZER' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">19</h1>
                        </div>
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                JIGME
                                <br />
                                TSHEW<span>ANG</span>
                                <br />
                                YOEZER
                            </h3>
                        </div>
                    </div>
                    <div className="player" onClick={() => setModalPlayer({ className: 'player', number: 14, name: 'CHONEY RANGDEL' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">14</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                CHON<span>EY</span>
                                <br />
                                RAN<span>GDEL</span>
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="most">
                    <h1>FORWARD</h1>
                </div>
                <div className="card-container">
                    <div className="dorji" onClick={() => setModalPlayer({ className: 'dorji', number: 66, name: 'DORJI GYELTSHEN' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">66</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                DORJI
                                <br />
                                GYELTS<span>HEN</span>
                            </h3>
                        </div>
                    </div>
                    <div className="damber" onClick={() => setModalPlayer({ className: 'damber', number: 17, name: 'DAMBER KHATIWARA' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">17</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                DAMB<span>ER</span>
                                <br />
                                KHATI<span>WARA</span>
                            </h3>
                        </div>
                    </div>
                    <div className="laxu" onClick={() => setModalPlayer({ className: 'laxu', number: 11, name: 'LAXU MAN GHALLEY' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">11</h1>
                        </div>
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                LAXU
                                <br />
                                MAN
                                <br />
                                GHALLEY
                            </h3>
                        </div>
                    </div>
                    <div className="karma" onClick={() => setModalPlayer({ className: 'karma', number: 5, name: 'KARMA SONAM' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">5</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                KARMA
                                <br />
                                SONAM
                            </h3>
                        </div>
                    </div>
                    <div className="kt" onClick={() => setModalPlayer({ className: 'kt', number: 21, name: 'KINLEY TENZIN' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number">21</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">
                                KINLEY
                                <br />
                                TENZIN
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="most">
                    <h1>MANAGER</h1>
                </div>
                <div className="card-container">
                    <div className="vander" onClick={() => setModalPlayer({ className: 'vander', number: '', name: 'VANDER' })} style={{ cursor: 'pointer' }}>
                        <br />
                        <div className="card-body">
                            <h1 className="number player-number" />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize player-name">VANDER</h3>
                        </div>
                    </div>
                </div>
            </main>
            {/* Player Modal */}
            {modalPlayer && (
                <div className="player-modal-overlay" onClick={() => setModalPlayer(null)}>
                    <div className="player-modal-card" onClick={e => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setModalPlayer(null)}>&times;</button>
                        {(() => {
                            const info = getPlayerInfo(modalPlayer.className, modalPlayer.number, modalPlayer.name);
                            return (
                                <>
                                    <div className="modal-img-wrap">
                                        <Image src={info.photo} alt={modalPlayer.name} width={160} height={160} style={{ borderRadius: '50%', objectFit: 'cover', border: '4px solid #e31b23', background: '#fff' }} />
                                    </div>
                                    <div className="modal-player-info">
                                        <h2 className="modal-player-name">{modalPlayer.name}</h2>
                                        <div className="modal-player-meta">#{modalPlayer.number}</div>
                                        <div className="modal-player-bio">{info.bio}</div>
                                    </div>
                                    <div className="modal-player-stats">
                                        <div><strong>Appearances:</strong> {info.stats.appearances || 0}</div>
                                        <div><strong>Goals:</strong> {info.stats.goals || 0}</div>
                                        <div><strong>Assists:</strong> {info.stats.assists || 0}</div>
                                        <div style={{ color: '#e31b23', fontWeight: 600, marginTop: 8 }}><strong>Fun Fact:</strong> {info.funFact}</div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
            <style jsx global>{`
                .player-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.45);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .player-modal-card {
                    background: #fff;
                    border-radius: 18px;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.18);
                    max-width: 370px;
                    width: 95vw;
                    padding: 2.5rem 2rem 2rem 2rem;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    animation: fadeInModal 0.3s;
                }
                @keyframes fadeInModal {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: none; }
                }
                .close-modal-btn {
                    position: absolute;
                    top: 18px;
                    right: 18px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: #e31b23;
                    cursor: pointer;
                    z-index: 2;
                    transition: color 0.2s;
                }
                .close-modal-btn:hover {
                    color: #b80022;
                }
                .modal-img-wrap {
                    margin-bottom: 1.2rem;
                    display: flex;
                    justify-content: center;
                }
                .modal-player-info {
                    text-align: center;
                    margin-bottom: 1.2rem;
                }
                .modal-player-name {
                    font-family: 'Montserrat', Arial, sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    color: #e31b23;
                    margin: 0 0 0.2rem 0;
                }
                .modal-player-meta {
                    font-size: 1.1rem;
                    color: #333;
                    margin-bottom: 0.5rem;
                }
                .modal-player-bio {
                    font-size: 1.05rem;
                    color: #444;
                    margin-bottom: 0.5rem;
                }
                .modal-player-stats {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    font-size: 1rem;
                    color: #222;
                    text-align: left;
                }
                .player-number {
                    font-family: 'Montserrat', Arial, sans-serif;
                    font-size: 3rem;
                    font-weight: 800;
                    color: #222;
                }
                .player-name {
                    font-family: 'Montserrat', Arial, sans-serif;
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #fff;
                    letter-spacing: 1px;
                    text-shadow: 1px 1px 8px #000;
                }
                @media (max-width: 900px) {
                    .card-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 600px) {
                    .card-container {
                        grid-template-columns: 1fr;
                    }
                    .player-modal-card {
                        padding: 1.2rem 0.5rem 1.2rem 0.5rem;
                        max-width: 98vw;
                    }
                    .modal-img-wrap img {
                        width: 120px !important;
                        height: 120px !important;
                    }
                }
            `}</style>
        </>
    );
}

export default Squadpage;