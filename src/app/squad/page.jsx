'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image'; 
import Link from 'next/link';
import '../../style/squad.css';

function Squadpage() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    return (
        <>
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
                <div style={{ height: '150px' }} />
                <div style={{ height: '200px', backgroundColor: 'white' }}></div>
                <div className="most">
                <h1>FOOTBALLER</h1>
                </div>
                <div className="most">
                    <h1>GOALKEEPER</h1>
                </div>
                <div className="card-container">
                    <div className="tsherab">
                        <br />
                        <div className="card-body">
                            <h1 className="number">1</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                JIGME
                                <br />
                                TSHERAB
                                <br />
                                DAMCHOE
                            </h3>
                        </div>
                    </div>
                    <div className="rigyel">
                        <br />
                        <div className="card-body">
                            <h1 className="number">99</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
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
                    <div className="lepcha">
                        <br />
                        <div className="card-body">
                            <h1 className="number">4</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                GYELT<span>SHEN</span>
                                <br />
                                LEPCH<span>A</span>
                            </h3>
                        </div>
                    </div>
                    <div className="choejur">
                        <br />
                        <div className="card-body">
                            <h1 className="number">3</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                SONAM
                                <br />
                                CHOEJUR
                            </h3>
                        </div>
                    </div>
                    <div className="pasang">
                        <br />
                        <div className="card-body">
                            <h1 className="number">13</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                PASANG
                                <br />
                                GYELTSHEN
                            </h3>
                        </div>
                    </div>
                    <div className="titung">
                        <br />
                        <div className="card-body">
                            <h1 className="number">6</h1>
                        </div>
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
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
                    <div className="sherab">
                        <br />
                        <div className="card-body">
                            <h1 className="number">10</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                SHERAB
                                <br />
                                DORJI
                            </h3>
                        </div>
                    </div>
                    <div className="chimi">
                        <br />
                        <div className="card-body">
                            <h1 className="number">8</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                CHIMI
                                <br />
                                GYELT<span>SHEN</span>
                            </h3>
                        </div>
                    </div>
                    <div className="jigmet">
                        <br />
                        <div className="card-body">
                            <h1 className="number">19</h1>
                        </div>
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                JIGME
                                <br />
                                TSHEW<span>ANG</span>
                                <br />
                                YOEZER
                            </h3>
                        </div>
                    </div>
                    <a href="playerstats/ranposter.html" style={{ textDecoration: "none" }}>
                        <div className="player">
                            <br />
                            <div className="card-body">
                                <h1 className="number">14</h1>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="card-body">
                                <h3 className="fsize">
                                    CHON<span>EY</span>
                                    <br />
                                    RAN<span>GDEL</span>
                                </h3>
                            </div>
                        </div>
                    </a>
                </div>
                <div className="most">
                    <h1>FORWARD</h1>
                </div>
                <div className="card-container">
                    <div className="dorji">
                        <br />
                        <div className="card-body">
                            <h1 className="number">66</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                DORJI
                                <br />
                                GYELTS<span>HEN</span>
                            </h3>
                        </div>
                    </div>
                    <div className="damber">
                        <br />
                        <div className="card-body">
                            <h1 className="number">17</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                DAMB<span>ER</span>
                                <br />
                                KHATI<span>WARA</span>
                            </h3>
                        </div>
                    </div>
                    <div className="laxu">
                        <br />
                        <div className="card-body">
                            <h1 className="number">11</h1>
                        </div>
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                LAXU
                                <br />
                                MAN
                                <br />
                                GHALLEY
                            </h3>
                        </div>
                    </div>
                    <div className="karma">
                        <br />
                        <div className="card-body">
                            <h1 className="number">5</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
                                KARMA
                                <br />
                                SONAM
                            </h3>
                        </div>
                    </div>
                    <div className="kt">
                        <br />
                        <div className="card-body">
                            <h1 className="number">21</h1>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">
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
                    <div className="vander">
                        <br />
                        <div className="card-body">
                            <h1 className="number" />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="card-body">
                            <h3 className="fsize">VANDER</h3>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Squadpage;