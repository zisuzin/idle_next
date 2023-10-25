"use client";

import Link from "next/link";
// 더미데이터
import { artists } from "../../data/hcode.js";
/* 컴포넌트 */
import HeaderComp from "../components/HeaderComp.jsx";
// 서브 CSS
import "../../css/sub.css";

export default function Album() {
    return (
        <>
            <HeaderComp />
            <main className="contents_wrap">
                <h2 className="mttit">DISCOGRAPHY</h2>
                <div className="contents_inner">
                    <div className="album_list">
                        <ul>
                            {artists["alb"].map((x, i) => (
                                <li key={i}>
                                    <Link href={`/albums/${i}`} scroll={false}>
                                        <img src={x.isrc} alt={"여자아이들의 " + x.mtit + " 앨범"} />
                                        <div className="albumInfo_box">
                                            <div className="albumInfo_txt">
                                                <h5>{x.altop_txt.split("^")[1]}</h5>
                                                <h2>{x.mtit.replace(/-/g, "")}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}
