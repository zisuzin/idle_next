"use client";

import Link from "next/link";
/* Styled-components 불러오기 */
import styled from "styled-components";

// const Header = styled.header`
//     background-color: lightblue;
// `

export default function HeaderComp(){
    
    return (
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
    )
}