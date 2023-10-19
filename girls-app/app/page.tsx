"use client";

import Link from "next/link";
import Head from 'next/head';
/* React hooks */
import React, { useEffect, useState, useRef } from 'react';
/* 더미데이터 */
import { artists, headlines, records } from "../data/hcode";
/* 메인 CSS */
import "../css/main.css";
/* Redux store 관련 */
import { useSelector, useDispatch } from "react-redux";
import { setImg, setTit, setAudio, updateImg } from "../ts/redux";
import { unwrapResult } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
/* Swiper */
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
/* Jquery */
import $ from 'jquery';
/* Material UI 컴포넌트 */
import IconButton from "@mui/material/IconButton";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import PauseIcon from '@mui/icons-material/Pause';
import AddBoxIcon from '@mui/icons-material/AddBox';

// RootState 타입 정의
type RootState = {
    ref: {
        imgSrc: string;
        alTit: string;
        audSrc: string; 
        loading: string,
    };
};

export default function Home() {
    let imgSrc = useSelector((state: RootState) => state.ref.imgSrc);
    let alTit = useSelector((state: RootState) => state.ref.alTit);
    let audSrc = useSelector((state: RootState) => state.ref.audSrc);
    let song_index = 0;
    const dispatch = useDispatch();
    
    // state hook
    const [isCheck, setIsCheck] = useState<number | boolean>(Number);
    
    // 헤드라인 재생버튼 클릭시 앨범 데이터 셋업 & 음원 재생/멈춤
    const setAlb = (img: string, audio: string, tit: string, el: HTMLAnchorElement) => {
        const audBtn:any = document.querySelector("#audio");
        dispatch(setImg(img));
        dispatch(setTit(tit));
        dispatch(setAudio(audio));
        
        // 플레이어 재생버튼 상태변경
        $(el).toggleClass('on').parent().siblings().find(".play_now_btn").removeClass("on");
        if ($(el).hasClass('on')) {
            setIsCheck(true);
            audBtn.play()
            .catch(() => {
                console.log("음원 재생!");
            });
        }
        else {
            setIsCheck(false);
            audBtn.pause();
        }
    }; ///////// setAlb 함수 ////////

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const audioEl:any = audioRef.current;
    
    // 플레이어 재생버튼 토글시 아이콘 변경
    const playSong = () => {
        const playBtn = document.querySelector("#play-pause") as HTMLAnchorElement;
        playBtn.addEventListener("click", function() {
            playBtn.classList.toggle("on");
            if(playBtn.classList.contains("on") && audSrc) {
                try {
                    setIsCheck(true);
                    // 오디오 재생
                    audioEl.play();
                }
                catch {
                    console.log("음원 재생");
                }
            }
            else if (!playBtn.classList.contains("on") && audSrc) {
                try {
                    setIsCheck(false);
                    // 오디오 중지
                    audioEl.pause()
                }
                catch {
                    console.log("음원 중지");
                }
            }
        });
    };

    // 음원 플레이리스트 추가
    const addSong = () => {
        let arr:any = [];
        const addbtn = document.querySelectorAll(".addbtn");
        const playList = document.querySelector("#play-list > ul") as HTMLElement;

        // 로컬스토리지 음반리스트 셋팅
        const saveList:any[] = JSON.parse(localStorage.getItem('song_item') || '[]');

        addbtn.forEach((el,i) => {
            el.addEventListener("click", function(this: HTMLElement) {
                this.classList.toggle('active');

                // 중복데이터 선별 변수(true/false)
                const isB = saveList.some(item => item.tit === records[i].tit);
                console.log("중복 판별 여부:", isB);

                // 버튼 클래스 on & 데이터 중복 아닐시
                if (this.classList.contains('active') && !isB) {
                    console.log('플레이리스트 추가');

                    const list = 
                    {   tit: records[i].tit,
                        alb: records[i].alb,
                        img: records[i].isrc,
                        time: records[i].time,
                        song: records[i].msrc
                    };

                    // 배열에 값 보내기
                    saveList.push(list);
                    localStorage.setItem('song_item', JSON.stringify(saveList));
                    updateList();
                }
                // 버튼 클래스 off시
                else if (!this.classList.contains('active')) {
                    console.log('플레이리스트 삭제');

                    // 해당 곡 로컬스에서 제거
                    const removeIndex = saveList.findIndex(item => item.tit === records[i].tit);
                    if (removeIndex !== -1) {
                        saveList.splice(removeIndex, 1);
                        localStorage.setItem('song_item', JSON.stringify(saveList));
                    }
                    updateList();
                }
            });
        });

        // 음원 목록 업데이트
        const updateList = () => {
            playList.innerHTML = "";
            saveList.forEach((item, i) => {
                const listItem = `
                    <li data-index=${i}>
                        <div class="imgarea">
                            <img src=${item.img} alt=${item.tit}>
                        </div>
                        <div class="txtarea">
                            <strong>${item.tit}</strong>
                            <em>${item.alb}</em>
                        </div>
                        <span data-duration=${item.time}>${item.time}</span>
                        <audio src=${item.song}></audio>
                    </li>
                `;
                playList.insertAdjacentHTML('beforeend', listItem);
            });
        }
        updateList();
    };

    // 전체 곡 목록 보기
    const showList = () => {
        const listBtn = document.querySelector(".list-btn") as HTMLAnchorElement;
        const playList = document.querySelector("#play-list") as HTMLAnchorElement;
        // 목록버튼 클릭시 플레이어리스트 보임/숨김
        listBtn.addEventListener("click", function() {
            listBtn.classList.toggle("on");
    
            if (listBtn.classList.contains("on")) {
                playList.style.display = "block";
                clkList();
            }
            else {
                playList.style.display = "none";
            }
        });
    };

    // 곡 선택시 해당 음원 재생
    const clkList = () => {
        const listAll = document.querySelectorAll("#play-list li");
        listAll.forEach((list, i) => {
            list.addEventListener("click", function(this: HTMLElement) {
                const listImg = list.querySelector("#play-list img") as HTMLImageElement;
                let listSrc = listImg.getAttribute("src");
                
                // 클릭시 클래스 on
                if (Number(list.getAttribute('data-index')) === i && !list.classList.contains("on")) {
                    list.classList.add("on");

                    // redux 상태 업데이트
                    dispatch(updateImg(listSrc) as AnyAction);

                    for(let x of listAll) {
                        if (x !== list) {
                            x.classList.remove("on");
                        }
                    }
                }
            });
        })
    };

    // 다음 곡 버튼 클릭시
    const nextSong = () => {
        // song_index++;
        // song_index = song_index%
    };

    //재생시간, 전체시간 표시 및 재생바
    const timeAudio = () => {
        // 원본 오디오 선택
        const crtAudio:any = $("#audio")[0];

        //전체시간 표시
        $("#audio").on("loadeddata", function() {
            const totTime =  $(".duration");
            const duration = crtAudio.duration || 0;
            
            // 음원 총 재생시간 구하기
            const min = Math.floor(duration / 60);
            const sec = Math.floor(duration % 60);
            const totMin = min.toString().padStart(2, "0");
            const totSec = sec.toString().padStart(2, "0");
            totTime.text(`${totMin}:${totSec}`);
        });
        
        // 현재시간 표시
        $("#audio").on("timeupdate", function() {
            const playTime = $(".current");
            const progress = $(".bar");
            let ctTime = crtAudio.currentTime;
            const duration = crtAudio.duration || 0;

            // 프로그레스 바 업데이트
            const progBar = (ctTime / duration) * 100 + "%";
            progress.css("width", `${progBar}`);

            let min = Math.floor(ctTime / 60);
            let sec = Math.floor(ctTime % 60);
            let ctMin = min.toString().padStart(2, "0");
            let ctSec = sec.toString().padStart(2, "0");
            playTime.text(`${ctMin}:${ctSec}`);
        });
    }

    useEffect(() => {
        // 로드후 재생버튼 클릭시 조건 실행
        if (audSrc && audioEl) {
            // 오디오 재생
            audioEl.play();
        }
        // 함수호출
        playSong();
        timeAudio();
        addSong();
        showList();
        nextSong();
        clkList();

    }, [audSrc, audioEl]);
    
    return (
        <div>
            <header>
                <div className="logowrap">
                    <Link href="/">
                        <img src="./images/logo.jpg" alt="로고" />
                    </Link>
                </div>
                <div className="menuwrap">
                    <nav className="navbar">
                        <Link href="/artists">프로필</Link>
                        <Link href="/albums">앨범</Link>
                        <Link href="/gallery">갤러리</Link>
                        <Link href="/videos">비디오</Link>
                    </nav>
                </div>
            </header>
            <div className="container">
                <div className="container_inner">
                    <h3 className="headline_title">Trending New Hits</h3>
                    <SwiperReact className="hd-swiper" pagination navigation modules={[Pagination, Navigation]} loop={true}>
                        {/* 헤드라인배너 출력 */}
                        {headlines.map((x, i) => (
                            <SwiperSlide className="headline" key={i}>
                                <div className="img_area">
                                    <img src={x.isrc} alt="헤드라인 배너이미지" />
                                </div>
                                <div className="txt_area">
                                    <div className="area_inner">
                                        <img className="icon_header" src="/images/header_txt.png" alt="히트작 아이콘" />
                                        <strong className="title">{x.tit.split("^")[0]}</strong>
                                        <br />
                                        <strong className="title">{x.tit.split("^")[1]}</strong>
                                        <div className="info">{x.desc}</div>
                                        <div className="sub">
                                            <span className="item">
                                                <em className="blind">아티스트</em>
                                                <span>(G)IDLe</span>
                                            </span>
                                            <span className="item">
                                                <em className="blind">발매일</em>
                                                <span>{x.date}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" role="button" className="play_now_btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAlb(x.albimg, x.msrc, x.mtit, e.currentTarget);
                                    }}>
                                    {isCheck ? <PauseIcon/> : <PlayArrowIcon/>}
                                    <em className="blind">재생하기</em>
                                </a>
                            </SwiperSlide>
                        ))}
                    </SwiperReact>
                    <div className="artists_bx">
                        <h3>멤버</h3>
                        <span>See all</span>
                        <ul>
                            {/* 멤버프로필 출력 */}
                            {artists.map((v, i) => (
                                <li key={i}>
                                    <figure className="imgbx">
                                        <img src={v.isrc + ".jpeg"} alt={v.name} />
                                        <figcaption className="member_name">{v.name}</figcaption>
                                    </figure>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* 뮤직 플레이어 */}
                    <div className="player_bx">
                        <div className="player_inner">
                            <div className="p_wrap">
                                <h3>
                                    플레이어
                                    <span className="list-btn">
                                        <QueueMusicIcon />
                                    </span>
                                </h3>
                                <div className="p_depth1">
                                    <div className="p_img">
                                        <img src={imgSrc} alt={alTit}/>
                                    </div>
                                    <div className="p_info">
                                        <p className="name">{alTit}</p>
                                        <p className="artist">(G)IDLe</p>
                                    </div>
                                    <div id="play-list">
                                        <ul></ul>
                                    </div>
                                </div>
                                <div className="timer">
                                    <span className="current">00:00</span>
                                    <div className="progress p_depth2">
                                        <div className="bar">
                                            <span className="pin"></span>
                                            <audio ref={audioRef} src={audSrc} id="audio"></audio>
                                        </div>
                                    </div>
                                    <span className="duration">00:00</span>
                                </div>
                            </div>
                            <div className="p_depth3">
                                <div className="p_control">
                                    <IconButton id="shuffle-btn" disableRipple>
                                        <RepeatIcon />
                                        <em className="blind">곡 전체 랜덤 반복</em>
                                    </IconButton>
                                    {/* 이전 곡 재생버튼 */}
                                    <IconButton id="prev-btn" disableRipple>
                                        <SkipPreviousIcon />
                                        <em className="blind">이전 버튼</em>
                                    </IconButton>
                                    {/* 중지/재생 버튼 */}
                                    <IconButton id="play-pause" disableRipple onClick={playSong}>
                                        {isCheck ? <PauseIcon/> : <PlayArrowIcon/>}
                                        <em className="blind">재생/중지 버튼</em>
                                    </IconButton>
                                    {/* 다음 곡 재생버튼 */}
                                    <IconButton id="next-btn" disableRipple>
                                        <SkipNextIcon />
                                        <em className="blind">다음 버튼</em>
                                    </IconButton>
                                    {/* 현재 곡 반복버튼 */}
                                    <IconButton id="repeat-btn" disableRipple>
                                        <ShuffleIcon />
                                        <em className="blind">현재 곡 반복</em>
                                    </IconButton>
                                </div>
                                <div className="lyrics_info">
                                    <ExpandLessRoundedIcon />
                                    <p>LYRICS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 음악 장르 */}
                    <div className="genre_bx">
                        <h3>장르</h3>
                        <span>See all</span>
                        <ul>
                            {/* 멤버프로필 출력 */}
                            <li className="beat">Dance<br/>Beat</li>
                            <li className="electro">Electro<br/>Pop</li>
                            <li className="indie">Alternative<br/>Indie</li>
                            <li className="hiphop">Hip<br/>Hop</li>
                            <li className="balad">Pop<br/>Ballad</li>
                            <li className="jazz">Hip Hop<br/>Jazz</li>
                        </ul>
                    </div>
                    {/* 전체 음반 */}
                    <div className="record_bx">
                        <h3>음반</h3>
                        <span>See all</span>
                        <ul>
                            {/* 음반리스트 출력 */}
                            {records.map((v, i) => (
                            <li key={i}>
                                <div className="alnum">0{i+1}</div>
                                <div className="alimg">
                                    <img src={v.isrc} alt={v.tit + '앨범이미지'} />
                                </div>
                                <div className="altit">
                                    <h5>{v.tit}</h5>
                                    <p>{v.alb}</p>
                                </div>
                                <div className="altime">{v.time}</div>
                                <div className="playbtn"> 
                                    <PlayArrowIcon/>
                                </div>
                                <div className= "addbtn"> 
                                    <AddBoxIcon/>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}