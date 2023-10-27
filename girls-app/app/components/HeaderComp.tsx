"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
/* Styled-components 불러오기 */
import styled from "styled-components";

const List = styled.li`
    border-bottom: 2px solid rgba(255, 255, 255, 0.24);
`;

export default function HeaderComp() {
    const showMenu = () => {
        const btn = document.querySelector(".gnb_btn");
        const nav = document.querySelector(".navMenu") as HTMLElement;
        const navInner = document.querySelector(".navInner") as HTMLElement;
        const body = document.querySelector("body") as HTMLElement;
        btn?.addEventListener("click", function (this: HTMLElement) {
            this.classList.toggle("on");

            if (this.classList.contains("on")) {
                nav.style.display = "table";
                navInner.style.cssText = "display: table-cell; width: 100%; height: 100%; vertical-align: middle;";
                body.style.position = "fixed";
            } else {
                nav.style.display = "none";
                body.style.position = "inherit";
            }
        });
    };

    useEffect(() => {
        const bodyElement = document.body;
        bodyElement.style.position = 'inherit';
        showMenu();
    }, []);

    return (
        <header>
            <h1 className="logo">
                <Link href="/" scroll={false}>
                    <img src="./images/logo.png" alt="로고" />
                </Link>
            </h1>
            <div className="gnb">
                <button type="button" className="gnb_btn"></button>
                <nav className="navMenu">
                    <div className="navInner">
                        <ul>
                            <List>
                                <Link href="/" scroll={false}>
                                    HOME
                                </Link>
                            </List>
                            <List>
                                <Link href="/artists" scroll={false}>
                                    PROFILE
                                </Link>
                            </List>
                            <List>
                                <Link href="/albums" scroll={false}>
                                    ALBUM
                                </Link>
                            </List>
                            <List>
                                <Link href="/videos" scroll={false}>
                                    VIDEO
                                </Link>
                            </List>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
