"use client";

import Link from "next/link";
/* React hooks */
import React, { useState } from 'react';
/* 더미데이터 */
import { artists, headlines } from "../data/hcode";
/* 메인 CSS */
import "../css/main.css";
/* Redux store 관련 */
import { useSelector, useDispatch } from "react-redux";
import { setImg, setTit, setAudio } from "../ts/redux";
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

// RootState 타입 정의
type RootState = {
    ref: {
        imgSrc: string;
        alTit: string;
        audSrc: string; 
    };
};

export default function Home() {
    const imgSrc = useSelector((state: RootState) => state.ref.imgSrc);
    const alTit = useSelector((state: RootState) => state.ref.alTit);
    const audSrc = useSelector((state: RootState) => state.ref.audSrc);
    const dispatch = useDispatch();

    // state hook
    const [isCheck, setIsCheck] = useState(Boolean);

    // 헤드라인 재생버튼 클릭시 앨범 데이터 셋업
    const setAlb = (img: string, audio: string, tit: string, el: HTMLAnchorElement) => {
        dispatch(setImg(img));
        dispatch(setTit(tit));
        dispatch(setAudio(audio));

        // 플레이어 재생버튼 상태변경
        $(el).toggleClass('on').parent().siblings().find(".play_now_btn").removeClass("on");
        if ($(el).hasClass('on')) {
            setIsCheck(true);
        }
        else {
            setIsCheck(false);
        }
    };

    const playSong = () => {

    }

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
                        <h3>Artists</h3>
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
                                    Player
                                    <span>
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
                                </div>
                                <div className="timer">
                                    <span className="current">0:00</span>
                                    <div className="p_progress p_depth2">
                                        <div className="bar">
                                            <span className="pin"></span>
                                            <audio src={audSrc} id="audio"></audio>
                                        </div>
                                    </div>
                                    <span className="duration">0:00</span>
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
                </div>
            </div>
        </div>
    );
}