"use client";

/* React hooks */
import React, { useEffect, useState, useRef, ReactNode } from "react";
/* 컴포넌트 */
import HeaderComp from "../components/HeaderComp";
// 더미데이터
import { artists } from "../../data/hcode.js";
/* Material UI 컴포넌트 */
import SearchIcon from "@mui/icons-material/Search";
/* Jquery */
import $ from "jquery";
// 서브 CSS
import "../../css/sub.css";

export default function Video() {
    // 데이터 셋팅
    let vdata = artists.video;

    // 데이터 정렬 상태변수
    // -> 데이터 정렬을 반영하기 위해 정렬상태값을 아래같이 설정함!
    // 데이터구성 : [배열데이터,정렬상태값]
    // 정렬상태값 : 1 - 오름차순, 2 - 내림차순, 3 - 정렬전
    let [mvd, setMvd] = useState([vdata, 3]);

    // 데이터 건수 상태변수
    let [tot, setTot] = useState(vdata.length);

    // 자동완성 상태변수
    const [autocomplete, setAutocomplete] = useState<string[]>([]);

    // 사용자입력값 상태변수
    const [resultTit, setResultTit] = useState<ReactNode>(null);

    // 비디오리스트 타이틀 출력 상태변수
    const [vidTit, setVidTit] = useState<ReactNode>(<h3 className="mv_item_tit">Video Clip</h3>);

    // 디스플레이 상태변수(요소 보임/숨김)
    const [visible, setVisible] = useState(true);

    // 리스트 출력용 상태변수(검색결과 반영)
    const [initData, setInitData] = useState(vdata);

    // 데이터 검색 출력 함수
    const schList = () => {
        // 검색요소 대상 : #searchInput
        let input = document.querySelector("#searchInput") as HTMLInputElement;

        // 1. 검색어 읽기 - 소문자로 변환
        let keyword = input.value.toLowerCase();

        // 2. 검색어 입력확인분기
        if (keyword.trim() === "") {
            // 입력창으로 다시보내기
            input.focus();
            // 기존 정렬상태로 돌아가기
            setMvd([vdata, mvd[3]]);
            // 검색건수 초기화
            setTot(vdata.length);
            return;
        }

        // 3. 데이터 검색하기
        // 배열값 다중검색 메서드 -> filter()
        let searchList = vdata.filter(v => {
            if (v.txt.toLowerCase().indexOf(keyword) !== -1) return true;
        });

        // 4. 검색결과 리스트 업데이트하기
        // 검색결과 리스트 업데이트
        setMvd([searchList, 3]);
    }; // schList 함수

    // 검색어 자동완성 함수
    const searchAuto = () => {
        const inputEl = document.querySelector("#searchInput") as HTMLInputElement;
        let userInp = inputEl.value;
        // 입력창에서 텍스트 입력시 자동완성 데이터 업데이트
        // 검색어 입력시 관련 값이 있을 경우만 css 적용!
        $(".panels").css({ display: "block" });

        // 입력한 검색어와 관련된 데이터가 있을 경우에만 값을 출력
        let searchList = vdata.filter(v => {
            if (v.txt.toLowerCase().indexOf(userInp) !== -1) return true;
        });

        // 검색어가 비었을때 자동완성 데이터 초기화
        if (userInp.trim() === "" || searchList.length == 0) {
            setAutocomplete([]);
            $(".panels").css({ display: "none" });
            return;
        }
        setAutocomplete(searchList.map(item => item.txt));
    }; // searchAuto 함수

    // 입력창에서 엔터키 누르면 검색함수 호출!
    const enterKy = (e: any) => {
        // 엔터쳤을때 데이터 업데이트!
        if (e.key === "Enter") {
            schList();
            const userInp = e.target.value.toLowerCase();
            const completeList = vdata.filter(item => {
                if (item.txt.toLowerCase().indexOf(userInp) !== -1) return true;
            });

            // 검색결과 타이틀 출력 - 입력값이 있고, 데이터가 있는 경우에만!
            if (userInp.trim() !== "" && completeList.length !== 0) {
                setResultTit(
                    <>
                        <strong className="inputVal">{userInp}</strong>
                        <span>검색결과 ({completeList.length})</span>
                    </>
                );

                setInitData(completeList);
                $(".sortbx").css({ display: "block" });
                setVidTit(<h3 className="mv_item_tit">Video Clip</h3>);
                setVisible(true);

                // 검색 데이터가 하나만 있는 경우
                if (completeList.length === 1) {
                    $(".sortbx").css({ display: "none" });
                    setVisible(true);
                }
            }
            // 검색결과 없는 경우
            else if (completeList.length == 0) {
                setResultTit("검색 결과가 없습니다");
                $(".sortbx").css({ display: "none" });
                $(".listbx").css({ width: "100%" });
                setVisible(false);
                setVidTit(null);
            }
        } else {
            searchAuto();
        }
    }; // enterKy 함수

    // 체크박스 요소
    let chkele = document.querySelectorAll(".chkhdn");
    // 체크박스 검색함수
    const chkSearch = (e: any) => {
        // 1. 체크박스 아이디 : 검색항목의 값(sort)
        let chkid = e.target.id;
        // 2. 체크박스 체크여부 : checked (true/false)
        let chked = e.target.checked;
        console.log("아이디:", chkid, "\n체크여부:", chked);

        // 임시변수 : 기존입력된 데이터 가져옴
        let temp: any = mvd[0];

        // 결과집합변수
        let newList = [];

        // 3. 체크박스 체크갯수 세기 : 1개 초과시 배열 합쳐서 결과 출력!
        let num = 0;
        chkele.forEach(v => {
            const inputEl = v as HTMLInputElement;
            if (inputEl.checked) num++;
        });
        console.log("체크갯수:", num);

        // 4. 체크박스 체크여부에 따른 분기
        // (1) 체크여부가 true일때 해당 검색어로 검색!
        if (chked) {
            // 현재 데이터 변수에 담기
            let nowdt = vdata.filter(v => {
                if (v.sort === chkid) return true;
            }); // filter

            // 체크갯수가 1초과일때 배열합치기! (스프레드연산자 사용)
            if (num > 1) {
                // 기존데이터(temp) + 새데이터(noWdt)
                newList = [...temp, ...nowdt];
            }
            // 체크갯수 1일 때
            else {
                newList = nowdt;
            }
        } // if : 체크박스 true

        // (2) 체크박스가 false일때 데이터지우기
        else {
            console.log("지울 데이터:", chkid, temp.length);
            // splice삭제시 일반for문으로 --처리해야함
            for (let i = 0; i < temp.length; i++) {
                // console.log(temp[i].sort);
                // 조건은 체크박스 풀린 값
                if (temp[i].sort === chkid) {
                    // 배열지우기 메서드 : splice(순번,개수)
                    temp.splice(i, 1);
                    // splice로 지우면 배열항목자체가 삭제되므로 for문 돌때 개수가 줄어듦
                    // 따라서 다음번호를 지울때 ++을 --처리 필수!
                    i--;
                } /////// if ////////////
            }
            // 결과처리하기 : 삭제처리된 temp 결과에 넣기!
            newList = temp;
        }

        // 4. 검색결과 리스트 업데이트
        // Hook 데이터변수+데이터건수
        setMvd([newList, 2]);
        setTot(newList.length);
    }; // chkSearch 함수

    // 리스트 정렬 변경함수
    const sortList = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // 1. 선택옵션값 : 1 - 오름차순 / 2 - 내림차순
        let opt = parseInt(e.target.value);

        // 임시변수 : 배열데이터만 가져옴
        let temp: any = mvd[0];

        // 2. 옵션에 따른 정렬 반영하기
        temp.sort((x: { txt: string }, y: { txt: string }) => {
            if (opt == 1) {
                // 오름차순(1) - 최솟값부터 정렬
                return x.txt == y.txt ? 0 : x.txt > y.txt ? 1 : -1;
            } else if (opt == 2) {
                // 내림차순(2) - 최댓값부터 정렬
                return x.txt == y.txt ? 0 : x.txt > y.txt ? -1 : 1;
            }
        });
        // 3. 데이터 정렬변경 반영하기
        // setMvd([배열데이터,정렬상태값])
        setMvd([temp, Number(opt)]);
    }; // sortList 함수

    // 비디오 보이기 함수
    const showVid = (src: string, tit: string) => {
        let ifr = $(".vid_ifr_inner iframe");
        const ifrbx = $(".ifr_bg_bx");
        // 1. 아이프레임 src넣기
        ifr.attr("src", src + "?autoplay=1");
        // 2. 아이프레임 title넣기
        ifr.attr("title", tit);
        ifrbx.css("display", "block");

        // 닫기버튼 클릭시 동영상박스 없앰
        $(".vid_close_btn").click(function () {
            $(".ifr_bg_bx").css({ display: "none" });
        });
    }; // Showvid //

    const CatList = () => {
        return (
            <main className="video_wrap" style={{ display: visible ? "block" : "none" }}>
                <div className="contents_inner">
                    {vidTit}
                    <section id="sub_mv">
                        {initData.map((x, i) => (
                            <div className="mvbx" key={i} onClick={() => showVid(x.vsrc, x.txt)}>
                                <figure className="mv_img">
                                    <img src={x.isrc} alt={x.txt} />
                                </figure>
                                <figcaption className="mv_date">
                                    <p>{x.txt}</p>
                                    <p>{x.date}</p>
                                </figcaption>
                            </div>
                        ))}
                    </section>
                    <div className="ifr_bg_bx" style={{ display: "none", transition: "all 1s" }}>
                        <div className="vid_ifr_wrap">
                            <button type="button" className="vid_close_btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="page23-band1941-Card293262_video-modal-closeIcon"
                                    className="closeIcon"
                                    viewBox="0 0 30 30"
                                    fill="none"
                                    focusable="false"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M29.998 14.75C29.864 6.578 23.201 0 15 0l-.25.002C6.578.136 0 6.8 0 15c0 8.286 6.716 15 15 15l.25-.002C23.422 29.864 30 23.201 30 15l-.002-.25ZM14.766 1.001l.24-.002.237.002c7.534.129 13.631 6.211 13.755 13.764l.002.24-.002.243c-.129 7.528-6.211 13.625-13.764 13.75l-.24.001-.24-.002C7.136 28.869 1 22.653 1 15 1 7.355 7.132 1.127 14.766 1.002Z"
                                        fill="currentColor"
                                    ></path>
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15 14.396 10.605 10l-.605.603L14.397 15 10 19.396l.605.604L15 15.604 19.396 20l.604-.604L15.604 15 20 10.603 19.396 10 15 14.396Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </button>
                            <div className="vid_ifr_inner">
                                <iframe src="" title=""></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    };

    return (
        <>
            <HeaderComp />
            <main className="contents_wrap">
                {/* <h2>VIDEO</h2> */}
                <div className="contents_inner">
                    {/* 모듈코드 */}
                    <section className="schbx">
                        {/* 1. 옵션선택박스 */}
                        <div id="search_filter_bx">
                            <div className="schopt">
                                {/* 검색박스 */}
                                <div className="searching">
                                    {/* 검색버튼 돋보기아이콘 */}
                                    <SearchIcon className="schbtn" />
                                    {/* 입력창 */}
                                    <input id="searchInput" type="text" maxLength={14} placeholder="검색어를 입력해주세요" onKeyUp={enterKy} />
                                </div>
                                {/* 키워드 검색시 연관검색어 팝업 */}
                                <div id="keyword_collection">
                                    <div className="panels">
                                        <ul>
                                            {autocomplete.map((item, i) => (
                                                <li key={i}>
                                                    <span data-index={i}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* 체크박스구역 */}
                            <div className="chkbx">
                                <ul>
                                    <li>
                                        <h2>Category</h2>
                                        {/* 체크박스리스트 */}
                                        <ol>
                                            <li>
                                                Music Videos
                                                <input type="checkbox" id="mv" className="chkhdn" onChange={chkSearch} />
                                                <label htmlFor="mv" className="chklb"></label>
                                            </li>
                                            <li>
                                                V-logs
                                                <input type="checkbox" id="vlog" className="chkhdn" onChange={chkSearch} />
                                                <label htmlFor="vlog" className="chklb"></label>
                                            </li>
                                        </ol>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* 2. 결과리스트박스 */}
                        <div className="listbx">
                            {/* 검색결과 타이틀 */}
                            {resultTit && <div className="restit">{resultTit}</div>}
                            {/* 정렬선택박스 */}
                            <aside className="sortbx">
                                <select className="sel" name="sel" id="sel" onChange={sortList}>
                                    <option value="0">정렬선택</option>
                                    <option value="1">오름차순</option>
                                    <option value="2">내림차순</option>
                                </select>
                            </aside>
                            {/* 비디오 리스트 컴포넌트 
                            전달속성 dt - 리스트 데이터 */}
                            <CatList />
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
