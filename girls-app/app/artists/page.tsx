"use client";

import { useEffect } from "react";
// 더미데이터
import { artists } from "../../data/hcode.js";
/* 컴포넌트 */
import HeaderComp from "../../app/components/HeaderComp";
/* Jquery */
import $ from "jquery";
// 서브 CSS
import "../../css/sub.css";

export default function Profile() {
    const showPfbx = () => {
        // 멤버 프로필 리스트 클릭시 큰이미지박스 보이기
        const tgImg = $(".profile_img > li");
        tgImg.click(function () {
            // 1. 클릭된 이미지 경로 읽어오기
            let isrc = $(this).find("img").attr("src") as string;
            let mname = $(this).find("img").attr("data-name") as string;
            let mbirth = $(this).find("img").attr("data-birth") as string;

            // 2. 클릭된 이미지 경로를 큰 이미지에 src로 넣기
            $(".gimg > img").attr("src", isrc);

            // 3. 큰이미지박스 보이기
            $("#imbx").css({ display: "block" });

            // 4. 데이터 넣기
            $(".gimgDetail > dt").text(mname);
            $(".gimgDetail > dd").text(mbirth);
        });

        // 5. 닫기버튼 클릭시 큰이미지박스 숨기기
        $(".close_btn").click(function () {
            $("#imbx").css({ display: "none" });
        });
    };

    useEffect(() => {
        showPfbx();
    }, []);

    return (
        <>
            <HeaderComp />
            <main id="kv_wrap">
                {/* 1. 전체멤버 프로필 */}
                <section className="kv">
                    <div>
                        <img src={artists["misrc"]} alt="여자아이들 이미지" />
                    </div>
                </section>

                <section className="intro_profile">
                    {/* 2. 그룹 소개 */}
                    <div className="group_intro">
                        <h2>{artists["mtit"]}</h2>
                        <p>{artists["stit"]}</p>
                    </div>

                    {/* 3. 개별멤버 프로필 */}
                    <div className="members_intro">
                        <div className="members_inner">
                            <div className="intro_title">
                                <h2>MEMBER</h2>
                            </div>
                            <ul className="profile_img">
                                {artists["det"].map((x, i) => (
                                    <li key={i}>
                                        <div>
                                            <img data-name={x.name} data-birth={x.birth} src={x.isrc} alt={x.name + "의 프로필"} />
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* 4. 큰이미지 박스 */}
                            <section id="imbx">
                                <div className="imgbx">
                                    {/* 큰 이미지 */}
                                    <div className="gimg">
                                        <img src="" alt="큰이미지" />
                                    </div>
                                    <div>
                                        <button type="button" className="close_btn" title="팝업 닫기"></button>
                                        <dl className="gimgDetail">
                                            <dt></dt>
                                            <dd></dd>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
