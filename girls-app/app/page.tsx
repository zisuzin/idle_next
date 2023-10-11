import Link from "next/link"
import artists from "./data/hcode.js";
/* Material UI 컴포넌트 불러오기 */
import IconButton from '@mui/material/IconButton';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

export default function Home() {
  return (
    <div>
        <header>
            <div className="logowrap">
                <Link href="/">
                    <img src="./images/logo.jpg" alt="로고"/>
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
                <div className="headline">
                    <div className="img_area">
                        <img src="/images/headline-1.webp" alt="헤드라인 배너이미지" />
                    </div>
                    <div className="txt_area">
                        <div className="area_inner">
                            <img className="icon_header" src="/images/header_txt.png" alt="히트작 아이콘" />
                            <strong className="title">6th Mini Album : 퀸카(Queencard)</strong>
                            <div className="info">(여자)아이들의 유쾌한 자아도취 있는 그대로의 '나'를 사랑할 수 있는 퀸카(Queencard)는 자신의 생각과 감정에 따라 변화하는 자존감'에 대한 메시지를 (여자)아이들의 솔직하고 유쾌한 매력으로 풀어내며, 누구나 쉽게 공감하고 즐길 수 있는 (여자)아이들만의 또 다른 오리지널 시리즈를 제공한다.</div>
                            <div className="sub">
                                <span className="item">
                                    <em className="blind">아티스트</em>
                                    <span>(G)IDLe</span>
                                </span>
                                <span className="item">
                                    <em className="blind">발매일</em>
                                    <span>2023.05.15</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <a href="#" role="button" className="play_now_btn">
                        <em className="blind">재생하기</em>
                    </a>
                </div>
                <div className="artists_bx">
                    <h3>Artists</h3>
                    <span>See all</span>
                    <ul>
                        {/* 멤버프로필 출력 */}
                        { artists.map((v,i) => (
                        <li>
                            <figure className="imgbx">
                                <img src={v.isrc + '.jpeg'} alt={v.name} />
                                <figcaption className="member_name">{v.name}</figcaption>
                            </figure>
                        </li>
                        ))}
                    </ul>
                </div>
                {/* 뮤직 플레이어 */}
                <div className="player_bx">
                    <div className="player_inner">
                        <h3>Player</h3>
                        <div className="p_wrap1">
                            <div className="p_img">
                            </div>
                            <div className="p_info">
                                <p className="name">Queencard</p>
                                <p className="artist">(G)IDLe</p>
                            </div>
                        </div>
                        <div className="p_wrap2">
                            <div className="p_progress">
                                <div className="bar">
                                    <span className="pin"></span>
                                    <audio src="" id="audio"></audio>
                                </div>
                                <div className="timer">
                                    <span className="current">0:00</span>
                                    <span className="duration">0:00</span>
                                </div>
                            </div>
                            <div className="p_control">
                                <IconButton id="shuffle-btn">
                                    <RepeatIcon/>
                                    <em className="blind">곡 전체 랜덤 반복</em>
                                </IconButton>
                                {/* 이전 곡 재생버튼 */}
                                <IconButton id="prev-btn">
                                    <SkipPreviousIcon/>
                                    <em className="blind">이전 버튼</em>
                                </IconButton>
                                {/* 중지/재생 버튼 */}
                                <IconButton id="play-pause">
                                    <PlayCircleIcon/>
                                    <em className="blind">재생/중지 버튼</em>
                                </IconButton>
                                {/* 다음 곡 재생버튼 */}
                                <IconButton id="next-btn">
                                    <SkipNextIcon/>
                                    <em className="blind">다음 버튼</em>
                                </IconButton>
                                {/* 현재 곡 반복버튼 */}
                                <IconButton id="repeat-btn">
                                    <ShuffleIcon/>
                                    <em className="blind">현재 곡 반복</em>
                                </IconButton>
                            </div>
                            <div className="lyrics_info">
                                <ExpandLessRoundedIcon/>
                                <p>LYRICS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
