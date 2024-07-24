"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
const trade = [
    { id: 1, link: "/trade/1.jpeg" },
    { id: 2, link: "/trade/2.jpeg" },
    { id: 3, link: "/trade/3.jpeg" },
    { id: 4, link: "/trade/4.jpeg" },
    { id: 5, link: "/trade/5.jpeg" },
    { id: 6, link: "/trade/6.jpeg" },
    { id: 7, link: "/trade/7.jpeg" },
    { id: 8, link: "/trade/8.jpeg" },
    { id: 9, link: "/trade/9.jpeg" },
    { id: 10, link: "/trade/10.jpeg" },
    { id: 11, link: "/trade/11.jpeg" },
    { id: 12, link: "/trade/12.jpeg" },
    { id: 13, link: "/trade/13.jpeg" },
    { id: 14, link: "/trade/14.jpeg" },
    { id: 15, link: "/trade/15.jpeg" },
    { id: 16, link: "/trade/16.jpeg" },
];
export const Trade = ({
   
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
   
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                );
            } else if (speed === "normal") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "60s"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "120s"
                );
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll ",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {trade.map((item, idx) => (
                    <li
                        className="w-[250px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700  md:w-[300px]"
                        style={{
                            background:
                                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                        }}
                        key={item.id}
                    >
                      <img className="h-60 w-full objet-cover bg-center" src={item.link} alt="zetrye" />
                    </li>
                ))}
            </ul>
        </div>
    );
};
