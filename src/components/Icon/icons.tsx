import React from 'react'
import { BiMicrochip, BiCheckSquare, BiSquare, BiChevronDownCircle, BiLinkExternal, BiSearch } from 'react-icons/bi'
import { BsArrowRepeat } from 'react-icons/bs'
import { VscDashboard, VscGithub } from 'react-icons/vsc'
import {
    MdSettings,
    MdLaunch,
    MdInfoOutline,
    MdDone,
    MdDoneAll,
    MdDeleteForever,
    MdClose,
    MdBugReport
} from 'react-icons/md'

export const icons = {
    microchip: <BiMicrochip />,
    arrowRepeat: <BsArrowRepeat />,
    github: <VscGithub />,
    settings: <MdSettings />,
    square: <BiSquare />,
    checkedSquare: <BiCheckSquare />,
    launch: <MdLaunch />,
    info: <MdInfoOutline />,
    done: <MdDone />,
    doneAll: <MdDoneAll />,
    delete: <MdDeleteForever />,
    close: <MdClose />,
    chevron: <BiChevronDownCircle />,
    external: <BiLinkExternal />,
    dashboard: <VscDashboard />,
    search: <BiSearch />,
    bug: <MdBugReport />
}
