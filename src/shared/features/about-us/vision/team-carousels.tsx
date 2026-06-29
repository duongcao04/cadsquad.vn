import React from 'react'

import { Carousel } from 'antd'

import { TEAMS } from '@/shared/constants/teams'

import MemberCard from './cards/member-card'

export default function TeamCarousels() {
    return (
        <Carousel
            arrows
            infinite={true}
            autoplay={{ dotDuration: true }}
            autoplaySpeed={5000}
            className="rounded-lg"
            rootClassName="rounded-lg"
            centerMode
            focusOnSelect
            slidesToShow={3}
            effect="scrollx"
        >
            {TEAMS.map((member, index) => {
                return <MemberCard key={index} data={member} />
            })}
        </Carousel>
    )
}
